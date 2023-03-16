import { IonButton,IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar, 
          IonList, IonItem, IonLabel, IonCol, IonGrid, IonRow, IonCard, IonImg } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Home.css';
import useApi from '../hooks/useAPI';
import HeaderSection from '../components/Head/HeaderSection';


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
  const [hijriDate, setHijriDate] = useState([]);
  const [hijriDayEn, setHijriDayEn] = useState([]);
  const [hijriDayUrdu, setHijriDayUrdu] = useState([]);
  const [hijriMonthEn, setHijriMonthEn] = useState([]);
  const [hijriMonthUrdu, setHijriMonthUrdu] = useState([]);

 
  // useEffect(() => {
  //   async function fetchPrayerTimings() {

  //     const data = await getNemazTimes();
      
  //     return data;      
  //   }
  //   const data = fetchPrayerTimings();
  //   setPrayerTimings(data.timings); //Nemaz Timings

  // },[]); //[] prevents continious infinite api firing. 

  useEffect(() => {
    async function fetchPrayerTimings() {
      try {
        const data = await getNemazTimes();

        setPrayerTimings(data.timings);

        setHijriDate(data.date.hijri.date);
        
        setHijriDayEn(data.date.hijri.weekday.en);
        setHijriDayUrdu(data.date.hijri.weekday.ar);

        setHijriMonthEn(data.date.hijri.month.en);
        setHijriMonthUrdu(data.date.hijri.month.ar);

      } catch (error) {
        console.error(error);
      }
    }
    fetchPrayerTimings();
  }, []);

  const nemazNamesInUrdu = ['فجر','طلوع آفتاب','ظہر','عصر','غروب آفتاب','مغرب','عشاء','امساک','آدھی رات','',''];
  let i=0;
  console.log('Hijri-Data:',hijriDate)
  return (
    <IonPage >
      <IonContent >
        
      <div className="headImage">  
        <center>
          <h5>{hijriDate}</h5>
          <h5>{hijriDayEn}/{hijriDayUrdu}</h5>
          <h5>{hijriMonthEn}/{hijriMonthUrdu}</h5>
        </center>
      </div>



      <IonCard className="designImplementation">   
        <IonGrid className="rowSize">
          
          {Object.keys(prayerTimings).map((key) => (

            <IonRow className='designImplementation-row' key={key}>
              <IonCol size='4' className="align-left">{key}</IonCol>         
              <IonCol size='4' className="align-center">
                    {
                      parseInt(prayerTimings[key as keyof PrayerTimings].split(':')[0]) >= 12 
                      ? (parseInt(prayerTimings[key as keyof PrayerTimings].split(':')[0]) - 12) ===0 ? '12:'+ prayerTimings[key as keyof PrayerTimings].split(':')[1] + " PM"
                       : (parseInt(prayerTimings[key as keyof PrayerTimings].split(':')[0]) - 12) + ':'
                      + prayerTimings[key as keyof PrayerTimings].split(':')[1] + " PM" 
                      : prayerTimings[key as keyof PrayerTimings] + " AM"
                    }
              </IonCol>
              <IonCol size='4' className="align-left">{nemazNamesInUrdu[i++]}</IonCol>
            </IonRow>
          ))}
          
        </IonGrid>
      </IonCard>



      </IonContent>

      <IonFooter>
        <div className="footerDesign">
          <IonToolbar>
            <center>
              <p style={{margin:"10px"}}>
                Donate here:
              </p>
              <a href="https://rzp.io/l/hmBe4L5"><IonButton size="small">Donate</IonButton></a>            
            </center>
          </IonToolbar>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Home;