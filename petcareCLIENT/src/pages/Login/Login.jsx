import { useState } from 'react';
import './Login.css';
import dogImage from '../../assets/img/Perrito.jpg';

const Login = ({ onLogin, onNavigateToRegister }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isTypingPassword, setIsTypingPassword] = useState(false);
    const [error, setError] = useState(null);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        // Redirigir al dashboard
        if (onLogin) {
            onLogin('/Dashboard'); // Llama a la función onLogin
        } else {
            window.location.href = '/Dashboard';
        }
    };

    const handleNavigateToRegister = () => {
        // Redirigir al registro
        if (onNavigateToRegister) {
            onNavigateToRegister('/Register'); // Llama a la función para ir a Register
        } else {
            window.location.href = '/Register';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email  = form.elements.email?.value;
        const password = form.elements.password?.value;

        if (!email || !password) {
            setError("Por favor, complete todos los campos.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/v1/auth/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              console.log("Error Response:", errorData); // Imprime los detalles del error
              throw new Error(errorData.detail || "Credenciales incorrectas.");
            }

            const data = await response.json();
            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);
            localStorage.setItem("user", JSON.stringify(data.user));

            handleLogin();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <h2>¡BIENVENIDO!</h2>
            <img
                src={dogImage}
                alt="perrito"
                className={`dog-image ${isTypingPassword ? 'dog-hide-eyes' : ''}`}
            />
            <form onSubmit={handleSubmit}>
                <label>
                    Correo electrónico::
                    <input
                        type="email"
                        name="email" // Asegúrate de que 'name' esté correctamente definido
                        placeholder="Ingrese su correo"
                    />
                </label>

                <label>
                    Contraseña:
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password" // Asegúrate de que 'name' esté correctamente definido
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

                {error && <p className="error">{error}</p>}

                <button type="submit">Ingresar</button>
                <button type="button" onClick={handleNavigateToRegister}>
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default Login;
