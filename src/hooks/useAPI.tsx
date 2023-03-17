import {useState} from 'react';
import { Geolocation } from '@capacitor/geolocation';
import axios from "axios";

const useApi = () =>{
const url = 'http://api.aladhan.com/v1/timings';
const [error, setError] = useState<string | null>(null);

const school = 1; //
const getNemazTimes = async () =>{

    
    const position = await Geolocation.getCurrentPosition();
    
    console.log(position);

    try{
        const data = await axios.get(`${url}/${new Date()}?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&school=${school}`,{
            headers: {
                'Content-Type': 'application/json',
              }
            // mode: "no-cors", // no-cors, *cors, same-origin
            
        });
        // console.log("fetchResult:",result);


        // const data = await result.json();
        
        console.log("axiosData:",data.data);

        return data.data.data
    }
    catch(e){
        console.log(e);
        // setError(e.message as string);
        // alert(e.message as string);
        if (typeof e === 'object' && e !== null && 'message' in e) {
            setError(e.message as string);
          } else {
            setError('An unknown error occurred.');
          }
        console.log(error);
        return error
    }

}


return {
    getNemazTimes
    }

}

export default useApi