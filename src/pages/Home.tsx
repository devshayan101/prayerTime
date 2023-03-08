import { IonButton,IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonCol, IonGrid, IonRow } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Home.css';
import logo from '../assets/icon/logo.png';
import useApi from '../hooks/useAPI';


interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}


const Home: React.FC =  () => {

  const {getNemazTimes} = useApi()

  const [prayerTimings, setPrayerTimings] = useState<PrayerTimings>({
    Fajr: '',
    Sunrise: '',
    Dhuhr: '',
    Asr: '',
    Sunset: '',
    Maghrib: '',
    Isha: '',
    Imsak: '',
    Midnight: '',
  });

  useEffect(() => {
    async function fetchPrayerTimings() {
      const timings = await getNemazTimes();
      setPrayerTimings(timings);
    }
    fetchPrayerTimings();
  },[]); //[] prevents continious infinite api firing. 


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle >
          {/* <h4>Nemaz Time</h4>
          <img src={logo} alt="Logo" style={{ width: '80px', height: 'auto', marginLeft: '10px' }}/> */}

          <IonGrid>
            <IonRow>
              <IonCol size='9' className="align-left"><h4>Nemaz Time</h4></IonCol>
              <IonCol size='3' className="align-right"><img src={logo} alt="Logo" style={{ width: '80px', height: 'auto' }}/></IonCol>              
            </IonRow>
          </IonGrid>
        </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >

      
      {/* <IonList>
          {Object.keys(prayerTimings).map((key) => (
            <IonItem key={key}>
              <IonLabel style={{ marginLeft: '10px', paddingLeft:'10px' }}>{key}</IonLabel>
              <IonLabel style={{ marginLeft: '150px' }}>{prayerTimings[key as keyof PrayerTimings]}</IonLabel>
            </IonItem>
          ))}
      </IonList> */}
    
      <IonGrid>
        {Object.keys(prayerTimings).map((key) => (
          <IonRow  key={key}>
            <IonCol size='6' className="align-left">{key}</IonCol>         
            <IonCol size='6' className="align-right">{prayerTimings[key as keyof PrayerTimings]}</IonCol>
          </IonRow>
          ))}
      </IonGrid>

      </IonContent>

      <IonFooter>
        <IonToolbar>
      
          <IonGrid>
            <IonRow>
              <IonCol size='8' className="align-left"><h4>Donate here:</h4></IonCol>
              <IonCol size='4' className="align-right" style={{marginTop:'0em'}}><a href="https://rzp.io/l/hmBe4L5"><IonButton>Donate</IonButton></a></IonCol>              
            </IonRow>
          </IonGrid>
      
         
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;