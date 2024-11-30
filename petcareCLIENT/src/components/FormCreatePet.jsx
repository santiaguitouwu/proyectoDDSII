import React, { useState } from 'react';
import './FormCreatePet.css'
import { createPet } from '../helpers/createPet';

const PetForm = () => {
    // Estados para cada campo del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        especie: '',
        raza: '',
        edad: '',
        descripcion: ''
    });

    // Se guarda informacion ingresada en el input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Obtienes valores formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos del formulario:', formData);
        await createPet(formData)
    };

    return (
        <form className='form-create-pet' onSubmit={handleSubmit}>
            <div className='box-input'>
                <label htmlFor="nombre">Nombre:</label>
                <input
                    className='input-create-pet'
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder='nombre'
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='box-input'>
                <label htmlFor="especie">Especie:</label>
                <input
                    className='input-create-pet'
                    type="text"
                    id="especie"
                    name="especie"
                    placeholder='especie'
                    value={formData.especie}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='box-input'>
                <label htmlFor="raza">Raza:</label>
                <input
                    className='input-create-pet'
                    type="text"
                    id="raza"
                    name="raza"
                    placeholder='raza'
                    value={formData.raza}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='box-input'>
                <label htmlFor="edad">Edad:</label>
                <input
                    className='input-create-pet'
                    type="number"
                    id="edad"
                    name="edad"
                    placeholder='edad'
                    value={formData.edad}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='box-input'>
                <label htmlFor="descripcion">Descripción:</label>
                <textarea
                    className='input-create-pet'
                    id="descripcion"
                    name="descripcion"
                    placeholder='descripcion'
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                />
            </div>
            <button className='btn-submit' type="submit">Enviar</button>
        </form>
    );
};

export default PetForm;
