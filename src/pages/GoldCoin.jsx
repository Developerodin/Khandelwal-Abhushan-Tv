import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonFooter, IonGrid, IonRow, IonCol, IonButtons, IonBackButton } from '@ionic/react';
import './GoldCoin.css';
import Navbar from '../components/Navbar';
// import CustomTabBar from '../components/CustomTabBar';
import axios from 'axios';
import { Base_url } from "../config/BaseUrl.jsx";
import { arrowBackSharp } from 'ionicons/icons';

const gstPercentage = 0.03;

const initialGoldRates = [
  { grams: '1 gm', rate: 0 },
  { grams: '2 gm', rate: 0 },
  { grams: '5 gm', rate: 0 },
  { grams: '10 gm', rate: 0 },
  { grams: '25 gm', rate: 0 },
  { grams: '50 gm', rate: 0 },
  { grams: '75 gm', rate: 0 },
  { grams: '100 gm', rate: 0 },
];

const calculateFinalRates = (baseRate, gstPercentage) => {
  return initialGoldRates.map((item) => {
    const weight = parseFloat(item.grams);
    const rateWithoutGst = baseRate * weight;
    const gstAmount = rateWithoutGst * gstPercentage;
    const finalRate = rateWithoutGst + gstAmount;
    return { grams: item.grams, rate: finalRate.toFixed(2) };
  });
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN").format(price);
};

const GoldCoin = () => {
  const [goldRates, setGoldRates] = useState(initialGoldRates);

  useEffect(() => {
    axios.get(`${Base_url}get_price`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        const priceData = response.data.post.find(price => price.name === "24k & 91.6 Gold");
        if (priceData) {
          const baseRate = parseFloat(priceData.price);
          const updatedRates = calculateFinalRates(baseRate, gstPercentage);
          setGoldRates(updatedRates);
        }
      })
      .catch(error => {
        console.error('Error fetching gold price:', error);
      });
  }, []);

  return (
    <IonPage>
      <Navbar />
      <IonHeader />
      <IonContent className="custom-contentt" fullscreen style={{ '--ion-background-color': '#F8EBD8' }}>
      <IonButtons slot="" className="centered-buttons">
  <IonBackButton
    defaultHref="/"
    text=""
    className="back-button"
    icon={arrowBackSharp}
    style={{ color: '#8E2927' }}
  />
</IonButtons>
        <div style={{ padding: '16px', marginBottom: '90px' }}>
          <div className="image-container">
            <img src="/assets/gold-coin.png" alt="Gold Coin" className="gold-image" />
          </div>
          <div className="gold-table-container">
            <IonGrid className="gold-table">
              <IonRow className="table-headerr">
                <IonCol>Gms</IonCol>
                <IonCol className='ion-text-end'>Current rate with GST</IonCol>
              </IonRow>
              {goldRates.map((item, index) => (
                <IonRow key={index} className="table-roww">
                  <IonCol>{item.grams}</IonCol>
                  <IonCol className="ion-text-end"> ₹ {formatPrice(item.rate)}</IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </div>
        </div>
      </IonContent>
      <IonFooter />
    </IonPage>
  );
};

export default GoldCoin;
