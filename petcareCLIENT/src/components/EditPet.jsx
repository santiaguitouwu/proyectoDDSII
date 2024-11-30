import React, { useState, useEffect } from 'react';
import { getPets } from './../helpers/getPets'
import CardPet from './CardPet'

const EditPet = () => {
    const [pets, setPets] = useState([]);

    const consult = async () => {
        try {
            const data = await getPets();
            setPets(data);
        } catch (error) {
            alert('Error getting pets', error);
        }
    }

    useEffect(() => {
       consult();
    }, []);


    return (
        <div >
            <CardPet data={pets} />
        </div>
    );
};



export default EditPet;
