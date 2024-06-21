import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import { call } from 'ionicons/icons';
import './Home.css';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Base_url } from '../config/BaseUrl';

const Home = () => {
  const [goldRates, setGoldRates] = useState([]);
  const [oldGoldRates, setOldGoldRates] = useState([]);
  const [dateTime, setDateTime] = useState(getISTDateTime());




  const fetchPriceData = async () => {
    try {
      const response = await axios.get(`${Base_url}/get_price`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 && response.data.status === 'success') {
        const data = response.data.post;

        const updatedGoldRates = [
          {
            type: 'Gold 99.50 & 91.6',
            rate: data.find(item => item.name === '24k & 91.6 Gold').price * 10,
            makingCharges: 2.00,
            amountAfterMaking: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 1.02,
            gst: 3.00,
            amount: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 1.02 * 1.03,
          },
          {
            type: 'Gold 916 Hallmark',
            rate: data.find(item => item.name === '916 Hallmark').price * 10,
            makingCharges: 11.35,
            amountAfterMaking: data.find(item => item.name === '916 Hallmark').price * 10 * 1.1135,
            gst: 3.00,
            amount: data.find(item => item.name === '916 Hallmark').price * 10 * 1.1135 * 1.03,
          }
        ];

        const updatedOldGoldRates = [
          {
            type: 'Old Gold 99.50',
            rate: data.find(item => item.name === 'Old Gold 24k').price * 10,
            amountAfterMaking: data.find(item => item.name === 'Old Gold 24k').price * 10 * 1.02,
            amount: data.find(item => item.name === 'Old Gold 24k').price * 10 * 1.02 * 1.03,
          },
          {
            type: 'Old Gold 916 (-8.40%)',
            rate: data.find(item => item.name === 'Old Gold 916').price * 10,
            amountAfterMaking: data.find(item => item.name === 'Old Gold 916').price * 10 * 0.916 * (1 - 0.084),
            amount: data.find(item => item.name === 'Old Gold 916').price * 10 * 0.916 * (1 - 0.084) * 1.03,
          },
          {
            type: 'Old Gold 916 (KA)',
            rate: data.find(item => item.name === 'Old Gold 916 Branded').price * 10,
            amountAfterMaking: data.find(item => item.name === 'Old Gold 916 Branded').price * 10 * 1.02,
            amount: data.find(item => item.name === 'Old Gold 916 Branded').price * 10 * 1.02 * 1.03,
          }
        ];

        setGoldRates(updatedGoldRates);
        setOldGoldRates(updatedOldGoldRates);
      } else {
        console.error('Error fetching price data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching price data:', error);
    }
  };


  

  useEffect(() => {
    fetchPriceData();

    const intervalId = setInterval(() => {
      setDateTime(getISTDateTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <IonPage>
      <Navbar />
      <IonContent className="custom-content" fullscreen style={{ "--ion-background-color": "#F8EBD8" }}>
        <h2 className="jewellery-heading">Jewellery</h2>
        <div className="container">
        <div className="header-info">
            <p>Date: {dateTime.date}</p>
            <p>Time: {dateTime.time}</p>
          </div>
          <IonGrid className="first-table">
            <IonRow className="table-header">
              <IonCol>Today's Gold Price</IonCol>
              <IonCol className='ion-text-center'>Rate per 10 GM</IonCol>
              <IonCol className='ion-text-center'>Making Charges</IonCol>
              <IonCol className='ion-text-center'>Amount after making</IonCol>
              <IonCol className='ion-text-center'>GST</IonCol>
              <IonCol className='ion-text-center'>Amount</IonCol>
            </IonRow>
            {goldRates.length > 0 ? (
              goldRates.map((item, index) => (
                <IonRow key={index} className="table-row">
                  <IonCol>{item.type}</IonCol>
                  <IonCol className='ion-text-center'>{item.rate.toFixed(2)}</IonCol>
                  <IonCol className='ion-text-center'>{item.makingCharges.toFixed(2)}%</IonCol>
                  <IonCol className='ion-text-center'>{item.amountAfterMaking.toFixed(2)}</IonCol>
                  <IonCol className='ion-text-center'>{item.gst.toFixed(2)}%</IonCol>
                  <IonCol className='ion-text-center'>{item.amount.toFixed(2)}</IonCol>
                </IonRow>
              ))
            ) : (
              <IonRow className="table-row">
                <IonCol colSpan="6" className='ion-text-center'>Loading data...</IonCol>
              </IonRow>
            )}
          </IonGrid>
          <div className="purchase-header">YOUR GOLD PURCHASE</div>
          <IonGrid className="second-table">
            <IonRow className="table-header">
              <IonCol>Today's Gold Price</IonCol>
              <IonCol className='ion-text-center'>Rate per 10 GM</IonCol>
              <IonCol className='ion-text-center'>Amount after making</IonCol>
              <IonCol className='ion-text-center'>Amount</IonCol>
            </IonRow>
            {oldGoldRates.length > 0 ? (
              oldGoldRates.map((item, index) => (
                <IonRow key={index} className="table-row second-table-row">
                  <IonCol>{item.type}</IonCol>
                  <IonCol className='ion-text-center'>{item.rate.toFixed(2)}</IonCol>
                  <IonCol className='ion-text-center'>{item.amountAfterMaking.toFixed(2)}</IonCol>
                  <IonCol className='ion-text-center'>{item.amount.toFixed(2)}</IonCol>
                </IonRow>
              ))
            ) : (
              <IonRow className="table-row second-table-row">
                <IonCol colSpan="4" className='ion-text-center'>Loading data...</IonCol>
              </IonRow>
            )}
          </IonGrid>
          <div className="coins-section">
            <div className="coin-container">
              <div className="coin gold">
                <img src="/assets/gold-coin.png" alt="Gold Coin" />
              </div>
              <p style={{fontSize:'22px'}}>Gold</p>
            </div>
            <div className="coin-container">
              <div className="coin silver">
                <img src="/assets/silver-coin.png" alt="Silver Coin" />
              </div>
              <p style={{fontSize:'22px'}}>Silver</p>
            </div>
          </div>
          <div className="sip-header">Start SIP / Buy Precious Metal</div>
          <div className="contact-section">
            <div className="contact">
              <p><IonIcon icon={call} /> Kushal Khandelwal</p>
              <p>+91 8087994444</p>
            </div>
            <div className="contact">
              <p><IonIcon icon={call} /> Santosh Khandelwal</p>
              <p>+91 9823045584</p>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

const getISTDateTime = () => {
  const options = { timeZone: 'Asia/Kolkata', hour12: true };
  const now = new Date();
  const date = now.toLocaleDateString('en-IN', options);
  const time = now.toLocaleTimeString('en-IN', options);
  return { date, time };
}

export default Home;
