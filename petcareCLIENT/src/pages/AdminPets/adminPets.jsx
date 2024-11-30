import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './adminPets.css';

const DataTable = () => {

    const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/v1/pet/' : 'http://web:8000/api/v1/pet/';
    const [data, setData] = useState([]);

    console.log(API_URL);
    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleDelete = (id) => {
        fetch(`${API_URL}${id}/`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.ok) {
                // Filtrar el registro eliminado
                const updatedData = data.filter((item) => item.id !== id);
                setData(updatedData);
            } else {
                console.error('Error deleting data:', response.statusText);
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    };

    console.log(data);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Tabla de Mascotas</h2>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Especie</th>
                        <th>Raza</th>
                        <th>Edad</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>{item.especie}</td>
                            <td>{item.raza}</td>
                            <td>{item.edad}</td>
                            <td>{item.descripcion}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
