import {IonContent, IonPage,
           IonCol, IonGrid, IonRow, IonCard, IonImg } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Home.css';
import useApi from '../hooks/useAPI';
import Footer from '../components/Footer/Footer';
import { App } from '@capacitor/app';



interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  AwwalPaher: string;
  NisfShab: string;
  AkhiriPaher: string;
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
    AwwalPaher: '',
    NisfShab:'',
    AkhiriPaher:'',
  });
  const [engDate, setEngDate] = useState();
  const [hijriDate, setHijriDate] = useState([]);
  const [hijriDayEn, setHijriDayEn] = useState([]);
  const [hijriDayUrdu, setHijriDayUrdu] = useState([]);
  const [hijriMonthEn, setHijriMonthEn] = useState([]);
  const [hijriMonthUrdu, setHijriMonthUrdu] = useState([]);
  const [hijriYear, setHijriYear] = useState([]);
  const [hijriDayNumber, setHijriDayNumber] = useState([]);

  useEffect(() => {
    async function fetchPrayerTimings() {
      try {
        const data = await getNemazTimes();

        if(data==null){
          throw Error(`Fetch Failed`)
        }
        setPrayerTimings(data.timings);
        setEngDate(data.date.readable);
        setHijriDayNumber(data.date.hijri.day)
        setHijriDate(data.date.hijri.date);
        setHijriYear(data.date.hijri.year);
        setHijriDayEn(data.date.hijri.weekday.en);
        setHijriDayUrdu(data.date.hijri.weekday.ar);
        
        setHijriMonthEn(data.date.hijri.month.en);
        setHijriMonthUrdu(data.date.hijri.month.ar);

      } catch (error) {
        console.error(error);
        //App.exitApp();
        // window.location.reload();
        //Hard-Reload the app
      }
    }
    fetchPrayerTimings();
  }, []);

  const nemazNamesInUrdu = ['فجر','طلوع آفتاب','ظہر','عصر','غروب آفتاب','مغرب','عشاء','امساک','اوّل پہر','نصف شب','آخری پہر'];
  let i=0;
  console.log('Hijri-Data:',hijriDate)
  return (
    <IonPage >
      <IonContent>

      {/* <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
      </IonRefresher> */}


      <div className="headImage">
        <center>
          <h5>{engDate}</h5>
          {/* <h5>{hijriDate}</h5> */}
          <h5>{hijriDayNumber}-{hijriMonthUrdu}/{hijriMonthEn}-{hijriYear}</h5>
          <h5>{hijriDayEn}/{hijriDayUrdu}</h5>
        </center>
      </div>






      <IonCard className="designImplementation">



      <div className="container-marquee">
         <div className="marquee marqueeUrdu">
                    ہمارا مقصد
          خالق کی عبادت اور مخلوق کی خدمت کرنا ہے
          </div>

        <div className="marquee marqueeEnglish">
          Hamara maqsad: Khaliq ki Ibadat Makhlook ki Khidmat.
        </div>

      </div>


        <IonGrid className="rowSize">

          <div className="specialRow">

            <IonRow className='designImplementation-specialRow-SehriEnd'>

                <IonCol size='4' className="align-left"><p>Sehri End</p></IonCol>

                <IonCol size='4' className="align-center"><p>{prayerTimings.Imsak} AM</p></IonCol>

                <IonCol size='4' className="align-right"><p>سحری ختم</p></IonCol>
            </IonRow>

            <IonRow className='designImplementation-specialRow-IftarTime'>

                <IonCol size='4' className="align-left"><p>Iftar Time</p></IonCol>

                <IonCol size='4' className="align-center"><p>{prayerTimings.Maghrib} AM</p></IonCol>

                <IonCol size='4' className="align-right"><p>افطار</p></IonCol>
            </IonRow>

          </div>

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
              <IonCol size='4' className="align-right">{nemazNamesInUrdu[i++]}</IonCol>
            </IonRow>
          ))}


        </IonGrid>

        <IonImg src="../assets/img/donationDetails.jpg" alt=""></IonImg>
        
        <IonRow className='invisible' >
              <IonCol style={{height:"3.5rem"}}></IonCol>
        </IonRow>

      </IonCard>

      </IonContent>
      <Footer/>

    </IonPage>
  );
};

export default Home;