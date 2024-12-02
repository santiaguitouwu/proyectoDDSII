import axios from 'axios';

export const createPet = async (params) => {
    const newData = {estado_adopcion: true, ...params};
    const { data } = await axios.post('http://localhost:8000/api/v1/pet/', newData); 
    return data;
}
