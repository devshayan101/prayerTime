import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Home.css';
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
  },[]);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nemaz Time</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >

      
      <IonList>
          {Object.keys(prayerTimings).map((key) => (
            <IonItem key={key}>
              <IonLabel>{key}</IonLabel>
              <IonLabel>{prayerTimings[key as keyof PrayerTimings]}</IonLabel>
            </IonItem>
          ))}
      </IonList>
    

      </IonContent>
    </IonPage>
  );
};

export default Home;
