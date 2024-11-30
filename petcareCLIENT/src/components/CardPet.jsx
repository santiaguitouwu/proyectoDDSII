import React from 'react';
import './CardPet.css'; // Importa los estilos

const TarjetasMascotas = ({ data }) => {
  return (
    <div className="scroll-container">
      <div className="grid-container">
        {data.map((mascota) => (
          <div key={mascota.id} className="card">
            <h3 className="card-title">{mascota.nombre}</h3>
            <p><strong>Especie:</strong> {mascota.especie}</p>
            <p><strong>Raza:</strong> {mascota.raza}</p>
            <p><strong>Edad:</strong> {mascota.edad} año(s)</p>
            <p><strong>Descripción:</strong> {mascota.descripcion}</p>
            <p>
              <strong>Estado de adopción:</strong>{' '}
              <span className={mascota.estado_adopcion ? 'adopted' : 'available'}>
                {mascota.estado_adopcion ? 'Adoptado' : 'Disponible'}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TarjetasMascotas;
