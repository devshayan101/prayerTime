import {useState} from 'react';
import { Geolocation } from '@capacitor/geolocation';


const useApi = () =>{
const url = 'http://api.aladhan.com/v1/timings';
const [error, setError] = useState<string | null>(null);

const school = 1; //
const getNemazTimes = async () =>{

    
    const position = await Geolocation.getCurrentPosition();
    
    console.log(position);

    try{
        const result = await fetch(`${url}/${new Date()}?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&school=${school}`);
        console.log(result);


        const data = await result.json();
        
        console.log("fetchData:",data);

        return data.data
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