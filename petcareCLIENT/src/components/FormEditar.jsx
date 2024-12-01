import React, { useState } from 'react';
import './FormEdit.css'; // Importa los estilos
import { putPet } from './../helpers/putPet';

const FormularioEdicion = ({ mascota, onGuardar, onCancelar }) => {
    // Estado local para almacenar los valores editables
    const [formValues, setFormValues] = useState(mascota);

    // Maneja los cambios en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: name === 'edad' ? Number(value) : value, // Convierte "edad" a número
        });
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataEdit = {
                nombre: formValues.nombre,
                especie: formValues.especie,
                raza: formValues.raza,
                edad: formValues.edad,
                estado_adopcion: formValues.estado_adopcion,
                descripcion: formValues.descripcion,
            }

            const data = await putPet(formValues.id, dataEdit)
            alert('Update successfull' + data);
        } catch (error) {
            alert('Error ' + error)
        }
        console.log(formValues);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="nombre"
                        value={formValues.nombre}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Especie:
                    <input
                        type="text"
                        name="especie"
                        value={formValues.especie}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Raza:
                    <input
                        type="text"
                        name="raza"
                        value={formValues.raza}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Edad:
                    <input
                        type="number"
                        name="edad"
                        value={formValues.edad}
                        onChange={handleInputChange}
                        required
                        min="0"
                    />
                </label>
                <label>
                    Descripción:
                    <input
                        name="descripcion"
                        value={formValues.descripcion}
                        onChange={handleInputChange}
                        required
                        min="0"
                    />
                </label>
                <label>
                    Estado de Adopción:
                    <select
                        name="estado_adopcion"
                        value={formValues.estado_adopcion}
                        onChange={(e) =>
                            setFormValues({
                                ...formValues,
                                estado_adopcion: e.target.value === 'true',
                            })
                        }
                        required
                    >
                        <option value="true">Adoptado</option>
                        <option value="false">Disponible</option>
                    </select>
                </label>
                <div className="form-buttons">
                    <button type="submit" className="save-button" >Guardar</button>
                    <button type="button" className="cancel-button" onClick={onCancelar}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormularioEdicion;
