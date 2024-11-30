import React, { useState } from 'react';
import './Login.css';
import dogImage from '../../assets/img/Perrito.jpg';

const Login = ({ onLogin }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isTypingPassword, setIsTypingPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        if (onLogin) {
            onLogin('/Dashboard');
        } else {
            window.location.href = '/Dashboard';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.elements.username?.value;
        const password = form.elements.password?.value;

        if (username && password) {
            handleLogin();
            form.reset();
        } else {
            alert('Por favor, complete todos los campos.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>¡BIENVENIDO!</h2>
                <img
                    src={dogImage}
                    alt="perrito"
                    className={`dog-image ${isTypingPassword ? 'dog-hide-eyes' : ''}`}
                />
                <form onSubmit={handleSubmit}>
                    <label>
                        Usuario:
                        <input
                            type="text"
                            name="username"
                            placeholder="Ingrese su usuario"
                        />
                    </label>

                    <label>
                        Contraseña:
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Ingrese su contraseña"
                            onFocus={() => setIsTypingPassword(true)}
                            onBlur={() => setIsTypingPassword(false)}
                        />
                    </label>

                    <label className="password-toggle">
                        <input
                            type="checkbox"
                            onClick={togglePasswordVisibility}
                        />
                        {showPassword ? 'Ocultar Contraseña' : 'Mostrar Contraseña'}
                    </label>

                    <div className="button-container">
                        <button type="submit" style={{ borderRadius: '5px' }}>Ingresar</button>
                        <button type="button" style={{ borderRadius: '5px' }}>Registrarse</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
