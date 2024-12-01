import React, { useState } from 'react';
import './CardPet.css'; // Importa los estilos

const TarjetasMascotas = ({ data, onEdit }) => {
    return (
        <div className="scroll-container">
            <div className="grid-container">
                {data.map((mascota) => (
                    <div key={mascota.id} className="card">
                        <h3 className="card-title">
                            {mascota.nombre}
                        </h3>
                        <p><b>Especie:</b> {mascota.especie}</p>
                        <p><b>Raza:</b> {mascota.raza}</p>
                        <p><b>Edad:</b> {mascota.edad} año(s)</p>
                        <p><b>Descripción:</b> {mascota.descripcion}</p>
                        <p>
                            <b>Estado de adopción:</b>{' '}
                            <span className={mascota.estado_adopcion ? 'adopted' : 'available'}>
                                {mascota.estado_adopcion ? 'Adoptado' : 'Disponible'}
                            </span>
                        </p>

                        <button className="edit-button" onClick={() => onEdit(mascota)}>
                            Editar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TarjetasMascotas;
