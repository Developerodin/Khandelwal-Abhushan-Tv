import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonIcon, IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
useIonRouter,IonButton} from '@ionic/react';
import { call } from 'ionicons/icons';
import './Home.css';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Base_url } from '../config/BaseUrl';


const Home = () => {
  const history = useIonRouter();
  const [goldRates, setGoldRates] = useState([]);
  const [oldGoldRates, setOldGoldRates] = useState([]);
  const [updateRates, setUpdateRates] = useState([]);
  const [dateTime, setDateTime] = useState(getISTDateTime());
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  const fetchPriceData = async () => {
    try {
      const response = await axios.get(`${Base_url}/get_price`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200 && response.data.status === 'success') {
        const data = response.data.post;
  
        
        const mcxGoldItem = data.find(item => item.id === '6');
        const mcxSilverItem = data.find(item => item.id === '7');

        const updateRates = [
          
          mcxGoldItem && {
            type: 'Gold MCX',
            rate: '10gm',
            makingCharges: 2.00, 
            amountAfterMaking: mcxGoldItem.price * 10 * 1.02,
            gst: 3.00,
            amount: mcxGoldItem.price * 10 ,
          },
          mcxSilverItem && {
            type: 'Silver MCX',
            rate: '1kg',
            makingCharges: 2.00,
            amountAfterMaking: mcxSilverItem.price * 10 * 1.02,
            gst: 3.00,
            amount: mcxSilverItem.price * 1000,
          },
          
        ].filter(Boolean);

  
        
        const updatedGoldRates = [
          
          {
            type: 'Gold 99.50 & 91.6 Hallmark',
            rate: data.find(item => item.name === '24k & 91.6 Gold').price * 10,
            makingCharges: 2.00,
            amountAfterMaking: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 1.02,
            gst: 3.00,
            amount: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 1.02 * 1.03,
          },
          {
            type: 'Gold 916 (KA Brand)',
            rate: data.find(item => item.name === '24k & 91.6 Gold').price * 10  * (1 - 0.084),
            makingCharges: 11.35,
            amountAfterMaking: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 1.1135371 * (1 - 0.084),
            gst: 3.00,
            amount: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 1.1135371 * 1.03 * (1 - 0.084),
          }
        ];
  
        const updatedOldGoldRates = [
          {
            type: 'Old Gold 99.50',
            rate: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 0.98,
            makingCharges: 2.00,
            amountAfterMaking: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 1.02,
            amount: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 0.98,
          },
          {
            type: 'Old Gold 916 Hallmark',
            rate: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 0.98 * (1 - 0.084),
            makingCharges: -8.40,
            amountAfterMaking: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 0.916 * (1 - 0.084),
            amount: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 0.98 * (1 - 0.084),
          },
          
        ];
  
        setGoldRates(updatedGoldRates);
        setOldGoldRates(updatedOldGoldRates);
        setUpdateRates(updateRates);
      } else {
        console.error('Error fetching price data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching price data:', error);
    }
  };

  useEffect(() => {
    fetchPriceData();

    const fetchIntervalId = setInterval(() => {
      fetchPriceData();
    }, 10000); 

    const timeIntervalId = setInterval(() => {
      setDateTime(getISTDateTime());
    }, 1000); 

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(fetchIntervalId);
      clearInterval(timeIntervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCoinClick = () => {
    history.push('/gold-coin');
  }

  const handleSilverCoinClick = () => {
    history.push('/silver-coin');
  }

  return (
    <IonPage>
      <Navbar />
      <IonContent className="custom-content" fullscreen style={{ "--ion-background-color": "#F8EBD8" }}>
        <h2 className="purchase-header">NEW GOLD PURCHASE</h2>
        <div className="container">
          <div className="header-info">
            <p>Date: {dateTime.date}</p>
            <p>Time: {dateTime.time}</p>
          </div>

          {!isMobile ? (
            <>
            <IonGrid className="second-table" style={{marginBottom:'20px'}}>
                <IonRow className="table-header">
                  <IonCol>Today's Price</IonCol>
                  <IonCol className='ion-text-center'>Rate Per</IonCol>
                  {/* <IonCol className='ion-text-center'>Amount After Making</IonCol> */}
                  <IonCol className='ion-text-center'>Amount</IonCol>
                </IonRow>
                {updateRates.length > 0 ? (
                  updateRates.map((item, index) => (
                    <IonRow key={index} className="table-row second-table-row">
                      <IonCol>{item.type}</IonCol>
                      <IonCol className='ion-text-center'>{item.rate}</IonCol>
                      {/* <IonCol className='ion-text-center'>{item.amountAfterMaking.toFixed(2)}</IonCol> */}
                      <IonCol className='ion-text-center'>{item.amount.toFixed(2)}</IonCol>
                    </IonRow>
                  ))
                ) : (
                  <IonRow className="table-row second-table-row">
                    <IonCol colSpan="4" className='ion-text-center'>Loading data...</IonCol>
                  </IonRow>
                )}
              </IonGrid>
              
              <IonGrid className="first-table">
                <IonRow className="table-header">
                  <IonCol>Today's Gold Price</IonCol>
                  <IonCol className='ion-text-center'>Rate Per 10 GM</IonCol>
                  <IonCol className='ion-text-center'>Making Charges</IonCol>
                  <IonCol className='ion-text-center'>Amount After Making</IonCol>
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
              <div className="purchase-header">OLD GOLD PURCHASE</div>
              <IonGrid className="second-table">
                <IonRow className="table-header">
                  <IonCol>Today's Gold Price</IonCol>
                  <IonCol className='ion-text-center'>Rate Per 10 GM</IonCol>
                  {/* <IonCol className='ion-text-center'>Amount After Making</IonCol> */}
                  <IonCol className='ion-text-center'>Amount</IonCol>
                </IonRow>
                {oldGoldRates.length > 0 ? (
                  oldGoldRates.map((item, index) => (
                    <IonRow key={index} className="table-row second-table-row">
                      <IonCol>{item.type}</IonCol>
                      <IonCol className='ion-text-center'>{item.rate.toFixed(2)}</IonCol>
                      {/* <IonCol className='ion-text-center'>{item.amountAfterMaking.toFixed(2)}</IonCol> */}
                      <IonCol className='ion-text-center'>{item.amount.toFixed(2)}</IonCol>
                    </IonRow>
                  ))
                ) : (
                  <IonRow className="table-row second-table-row">
                    <IonCol colSpan="4" className='ion-text-center'>Loading data...</IonCol>
                  </IonRow>
                )}
              </IonGrid>
            </>
          ) : (
            <>
            <div className="card-container">
              {updateRates.length > 0 ? (
                updateRates.map((item, index) => (
                  <IonCard className="custom-card" key={index}>
                    <IonCardHeader style={{ paddingBottom: "0" }}>
                      <div className="price-row">
                        <IonCardTitle
                          style={{
                            fontSize: "18px",
                            lineHeight: "22px",
                            color: "#B87115",
                            fontWeight: "700",
                            paddingBottom: "0",
                          }}
                        >
                          {item.type} 
                        </IonCardTitle>
                        <span style={{fontWeight:'bold'}}> ₹{item.amount.toFixed(2)}</span>
                      </div>
                    </IonCardHeader>
          
                    <IonCardContent className="custom-content">
                      {/* <div className="price-row">
                        <span>Amount: ₹{item.amount.toFixed(2)}</span>
                      </div> */}
                    </IonCardContent>
                  </IonCard>
                ))
              ) : (
                <p>Loading data...</p>
              )}
            </div>


            <div className="card-container">
              {goldRates.length > 0 ? (
                goldRates.map((item, index) => (
                  <IonCard className="custom-card" key={index}>
                    <IonCardHeader style={{ paddingBottom: "0" }}>
                      <div className="price-row">
                        <IonCardTitle
                          style={{
                            fontSize: "18px",
                            lineHeight: "22px",
                            color: "#B87115",
                            fontWeight: "700",
                            paddingBottom: "0",
                          }}
                        >
                          {item.type}
                        </IonCardTitle>
                        <span>₹{item.rate.toFixed(2)}</span>
                      </div>
                    </IonCardHeader>
          
                    <IonCardContent className="custom-content">
                      
                      <div className="price-row">
                        <span>Making: {item.makingCharges}%</span>
                        <span>₹{item.amountAfterMaking.toFixed(2)}</span>
                      </div>
                     
                      <div className="price-row">
                        <span>GST: 3%</span>
                        <span style={{fontWeight:'bold'}}>₹{item.amount.toFixed(2)}</span>
                      </div>
                     
                    </IonCardContent>
                  </IonCard>
                ))
              ) : (
                <p>Loading data...</p>
              )}
            </div>
            <div className="purchase-header">OLD GOLD PURCHASE</div>
            <div className="card-container">
              {oldGoldRates.length > 0 ? (
                oldGoldRates.map((item, index) => (
                  <IonCard className="custom-card" key={index}>
                    <IonCardHeader style={{ paddingBottom: "0",paddingInlineStart:'16px' }}>
                      <div className="price-row">
                        <IonCardTitle
                          style={{
                            fontSize: "18px",
                            lineHeight: "22px",
                            color: "#B87115",
                            fontWeight: "700",
                            paddingBottom: "0",
                            paddingLeft: "0",
                            
                          }}
                        >
                          {item.type}
                        </IonCardTitle>
                        <span style={{fontWeight:'bold'}}>₹{item.rate.toFixed(2)}</span>
                      </div>
                    </IonCardHeader>
          
                    <IonCardContent className="custom-content">
                      {/* <div className="price-row">
                        <span>Rate per 10 GM:</span>
                        <span>₹{item.rate.toFixed(2)}</span>
                      </div> */}
                      {/* <div className="price-row">
                        <span>Making: {item.makingCharges}%</span>
                        <span>₹{item.amountAfterMaking.toFixed(2)}</span>
                      </div>
                      <div className="price-row">
                        <span>GST: 3%</span>
                        <span>₹{item.amount.toFixed(2)}</span>
                      </div> */}
                    </IonCardContent>
                  </IonCard>
                ))
              ) : (
                <p>Loading data...</p>
              )}
            </div>
          </>
          )}
        </div>
        <div className="coins-section">
            <div className="coin-container" onClick={handleCoinClick}>
              <div className="coin gold">
                <img src="/assets/gold-coin.png" alt="Gold Coin" />
              </div>
              <p style={{fontSize:'22px',color: '#8E2927'}}>Gold</p>
            </div>
            <div className="coin-container" onClick={handleSilverCoinClick}>
              <div className="coin silver">
                <img src="/assets/silver-coin.png" alt="Silver Coin" />
              </div>
              <p style={{fontSize:'22px',color: '#8E2927'}}>Silver</p>
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
          <div className="qr-section">
            <img src="/assets/Khandelwal Abhushan.png" alt="QR Code" className="qr-image" />
            <div className="qr-text">Download The App Now <br /> <span style={{fontSize:30}} >Scan QR Code</span></div>
          </div>

      </IonContent>
    </IonPage>
  );
};

function getISTDateTime() {
  const options = { timeZone: 'Asia/Kolkata', hour12: true };
  const now = new Date();
  const date = now.toLocaleDateString('en-IN', options);
  const time = now.toLocaleTimeString('en-IN', options);
  return { date, time };
}

export default Home;
