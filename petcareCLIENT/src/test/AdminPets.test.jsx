import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, describe, test, vi, beforeEach, afterEach } from 'vitest';
import DataTable from '../pages/AdminPets/adminPets';
import '@testing-library/jest-dom'; // Importa las aserciones adicionales

// Datos de prueba para simular la respuesta de la API
const mockData = [
    { id: 1, nombre: 'Happy', especie: 'Gato', raza: 'Criollo', edad: 2, descripcion: 'Descripcion mascota 1' },
    { id: 2, nombre: 'Max', especie: 'Perro', raza: 'Labrador', edad: 3, descripcion: 'Descripcion mascota 2' },
];

describe('DataTable Component', () => {
    beforeEach(() => {
        // Mock de la API para que devuelva mockData
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockData),
            })
        );
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('Renderiza correctamente los datos en la tabla', async () => {
        render(<DataTable />);

        expect(await screen.findByText(/id/i)).toBeInTheDocument();
        expect(await screen.findByText(/nombre/i)).toBeInTheDocument();
        expect(await screen.findByText(/especie/i)).toBeInTheDocument();
        expect(await screen.findByText(/raza/i)).toBeInTheDocument();
        expect(await screen.findByText(/edad/i)).toBeInTheDocument();
        expect(await screen.findByText(/descripción/i)).toBeInTheDocument();
        expect(await screen.findByText(/acciones/i)).toBeInTheDocument();

        // Verifica que los datos de la mascota se rendericen correctamente
        for (const pet of mockData) {
            expect(await screen.findByText(pet.nombre)).toBeInTheDocument();
            expect(await screen.findByText(pet.especie)).toBeInTheDocument();
            expect(await screen.findByText(pet.raza)).toBeInTheDocument();
            expect(await screen.findByText(pet.descripcion)).toBeInTheDocument();
        }
    });
});
