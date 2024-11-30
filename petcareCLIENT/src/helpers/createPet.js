import axios from 'axios';

export const createPet = async (params) => {
    const { data } = await axios.post('http://localhost:8000/api/v1/pet/', params); 
    return data;
}
