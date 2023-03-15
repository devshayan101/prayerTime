import { IonButton,IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar, 
          IonList, IonItem, IonLabel, IonCol, IonGrid, IonRow, IonCard } from '@ionic/react';
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
      <IonContent >
     
      {/* <IonCard className="designImplementation">   
          <IonGrid className='rowSize'>
            {Object.keys(prayerTimings).map((key) => (
              <IonRow className='designImplementation-row' key={key}>
                <IonCol size='6' className="align-left">{key}</IonCol>         
                <IonCol size='6' className="align-right">{prayerTimings[key as keyof PrayerTimings]}</IonCol>
              </IonRow>
              ))}
          </IonGrid>
      </IonCard> */}

      <IonCard className="designImplementation">   
        <IonGrid className="rowSize">
          {Object.keys(prayerTimings).map((key) => (
            <IonRow className='designImplementation-row' key={key}>
              <IonCol size='6' className="align-left">{key}</IonCol>         
              <IonCol size='6' className="align-right">
                    {
                      parseInt(prayerTimings[key as keyof PrayerTimings].split(':')[0]) >= 12 
                      ? (parseInt(prayerTimings[key as keyof PrayerTimings].split(':')[0]) - 12) ===0 ? '12:'+ prayerTimings[key as keyof PrayerTimings].split(':')[1] + " PM"
                       : (parseInt(prayerTimings[key as keyof PrayerTimings].split(':')[0]) - 12) + ':'
                      + prayerTimings[key as keyof PrayerTimings].split(':')[1] + " PM" 
                      : prayerTimings[key as keyof PrayerTimings] + " AM"
                    }
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonCard>



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