import { putPet } from './../helpers/putPet';

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';

vi.mock('axios'); // Mockear axios

describe('putPet', () => {

    const mockResponse = {
        id: 4,
        nombre: "Nuevo nombre",
        especie: "nueva especie",
        raza: "nueva raza.",
        edad: 2,
        descripcion: "Descripcion de la mascota",
        estado_adopcion: false,
    };

    beforeEach(() => {
        // Set axios reponse to test
        axios.put.mockResolvedValue({ data: mockResponse });
    });

    afterEach(() => {
        vi.restoreAllMocks(); // Clean mocks after tests
    });

    it('Response update pet succesfull', async () => {
        const idPet = 4;
        const dataEdit = { nombre: "Nuevo nombre" };

        const response = await putPet(idPet, dataEdit);

        //Check url push to update
        expect(axios.put).toHaveBeenCalledWith(`http://localhost:8000/api/v1/pet/${idPet}/`, dataEdit);

        //Check response mock axios with 
        expect(response).toEqual(mockResponse);
    });
});
