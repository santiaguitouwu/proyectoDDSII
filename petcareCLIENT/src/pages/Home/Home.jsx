import React from 'react';
import './Home.css';
import Imagen from '../../assets/img/img6.jpg'; 

const Home = () => {
  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <nav className="navbar-menu">
        
        </nav>
        <button className="login-button" onClick={handleLoginRedirect}>Iniciar Sesión</button>
      </header>

      <main>
        <div className="main-content">
          <div className="text-side">
            <h1>¡HOLA AMIGOS!</h1>
            <p>Es el Momento Perfecto para Tener un Compañero de 4 Patitas</p>
          </div>
          <div className="image-side">
            <img src={Imagen} alt="Mascotas" className="home-image" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
