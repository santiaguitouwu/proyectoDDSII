import axios from 'axios';

export const getPets = async () => {
    const { data } = await axios.get('http://localhost:8000/api/v1/pet/');
    console.log(data); 
    return data;
}
