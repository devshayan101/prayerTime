import { Geolocation } from '@capacitor/geolocation';


const useApi = () =>{
const url = 'http://api.aladhan.com/v1/timings';

const school = 1; //
  
const getNemazTimes = async () =>{

    const position = await Geolocation.getCurrentPosition();
    
    console.log(position);

    const result = await fetch(`${url}/${new Date()}?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&school=${school}`);

    const data = await result.json();
    console.log(data);

    return data.data.timings

}


return {
    getNemazTimes
    }

}

export default useApi