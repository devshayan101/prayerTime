import {useState} from 'react';
import { Geolocation } from '@capacitor/geolocation';
import axios from 'axios';
import { useIonAlert } from '@ionic/react';
import { App } from '@capacitor/app';



const useApi = () =>{
const url = 'https://api.aladhan.com/v1/timings';
const [error, setError] = useState<string | null>(null);
const [presentAlert] = useIonAlert();

const school = 1; //
// const position ={coords:{ latitude:3434, longitude:989789}}
const getNemazTimes = async () =>{
    
    try{

        const position = await Geolocation.getCurrentPosition();
        console.log('pos:',position);
        console.log('school:',school);

        const result = await axios(`${url}/${new Date()}?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&school=${school}`,{
            
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            // mode: "no-cors", // no-cors, *cors, same-origin
            
        });

        if(result==null){
           
        }
        
        
        console.log("fetchJson:",result);

        return result.data.data
    }
    catch(e){
        console.error(e);
        if (typeof e === 'object' && e !== null && 'message' in e) {

            
            if(e.message === 'User denied Geolocation' || 'location disabled')
                {
            
                presentAlert({
                    header: 'Alert!',
                    subHeader: 'Important message',
                    message: 'Location service/ GPS disabled, kindly enable and reopen the app.',
                    buttons: [
                      {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            App.exitApp();

                        },
                      },
                      {
                        text: 'OK',
                        role: 'confirm',
                        handler: () => {
                            App.exitApp();

                        },
                      },
                    ],
                  })

            }
            if(e.message === 'Network Error')
                {
            
                presentAlert({
                    header: 'Alert!',
                    subHeader: 'Important message',
                    message: 'Internet not available, kindly connect to internet then try again.',
                    buttons: [
                      {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            App.exitApp();

                        },
                      },
                      {
                        text: 'OK',
                        role: 'confirm',
                        handler: () => {
                            App.exitApp();

                        },
                      },
                    ],
                  })

            }
            
            
        setError(e.message as string);
        } else {
                setError('An unknown error occurred.');
              }
        return error
    }

}


return {
    getNemazTimes
    }

}

export default useApi