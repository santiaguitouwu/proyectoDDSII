import React, { useState, useEffect } from 'react';
import { getPets } from './../helpers/getPets'
import CardPet from './CardPet'
import FormEditar from './FormEditar'
import Modal from './Modal'

const EditPet = () => {
    const [pets, setPets] = useState([]);
    const [selectedMascota, setSelectedMascota] = useState(null);
    const [isModalPetSelected, setModalPetSelected] = useState(false);


    const handleEdit = (mascota) => {
        setModalPetSelected(true);

        setSelectedMascota(mascota); // Actualiza la mascota seleccionada
        console.log('Mascota seleccionada para editar:', mascota); // Acción o lógica adicional
    };


    const consult = async () => {
        try {
            const data = await getPets();
            setPets(data);
        } catch (error) {
            alert('Error getting pets', error);
        }
    }

    const closeModal = () => {
        setModalPetSelected(false);
    }


    useEffect(() => {
        consult();
    }, []);


    return (
        <div >
            <CardPet data={pets} onEdit={handleEdit} />

            <Modal titleModal={"MASCOTA SELECCIONADA"} isOpen={isModalPetSelected} onClose={closeModal}>
                <FormEditar mascota={selectedMascota} />
            </Modal>
        </div>
    );
};



export default EditPet;
