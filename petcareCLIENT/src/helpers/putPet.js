import axios from 'axios';

export const putPet = async (idPet, dataEdit) => {
    const { data } = await axios.put(`http://localhost:8000/api/v1/pet/${idPet}/`, dataEdit); 
    return data;
}
