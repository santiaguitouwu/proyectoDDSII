import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, describe, test } from 'vitest'
import FormCreatePet from '../components/FormCreatePet'

/*
    Información mascota sobre la cual se va realizar el test
*/
const infoPet = {
    nombre: "Happy",
    especie: "Gato",
    raza: "Criollo",
    edad: 2,
    descripcion: "Descripcion mascota"
}

describe('FormCreatePet Component', () => {

    test('Validate fields form', () => {

        /*
            Componente sobre el cual se va realizar el test
        */
        render(<FormCreatePet />);
        
        /*
            Obtienen los inputs del formulario, esto se realiza por el, -
            place holder definido en cada input.
        */
        const nombreInput = screen.getByPlaceholderText(/nombre/i);
        const especieInput = screen.getByPlaceholderText(/especie/i);
        const razaInput = screen.getByPlaceholderText(/raza/i);
        const edadInput = screen.getByPlaceholderText(/edad/i);
        const descripcionInput = screen.getByPlaceholderText(/descripcion/i);

        /*
            Simula eventos para agregar información a cada input del formulario.
        */
        fireEvent.change(nombreInput, {target: {value: infoPet.nombre}})
        fireEvent.change(especieInput, {target: {value: infoPet.especie}})
        fireEvent.change(razaInput, {target: {value: infoPet.raza}})
        fireEvent.change(edadInput, {target: {value: infoPet.edad}})
        fireEvent.change(descripcionInput, {target: {value: infoPet.descripcion}})
       
        /*
            Se construye información de la mascota, pero con valores obtenidos, -
            del formulario.
        */
        const infoPetForm = {
            nombre: nombreInput.value,
            especie: especieInput.value,
            raza: razaInput.value,
            edad: +edadInput.value,
            descripcion: descripcionInput.value,
        }
        
        /*
            Se valida información obtenida por el formulario "infoPetForm" con -
            infoPet(objeto con valores definidos globalmente para la prueba).
        */
        expect(infoPetForm).toEqual(infoPet);
    });

});