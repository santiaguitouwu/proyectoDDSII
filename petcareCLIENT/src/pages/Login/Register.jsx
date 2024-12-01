import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dogImage from '../../assets/img/Perrito.jpg';

const Register = () => {
    const [error, setError] = useState(null);
	const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.elements.username?.value;
        const email = form.elements.email?.value;
        const password = form.elements.password?.value;

        if (!username || !email || !password) {
            setError("Por favor, complete todos los campos.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/v1/auth/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
				const errorData = await response.json(); // Captura el error detallado
            	console.log("Error:", errorData);
                throw new Error("Error al registrar el usuario.");
            }

            // Redirige al Dashboard o Login después del registro exitoso
            navigate('/Dashboard'); 
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>¡REGÍSTRATE!</h2>
                <img src={dogImage} alt="perrito" className="dog-image" />
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
                        Correo:
                        <input
                            type="email"
                            name="email"
                            placeholder="Ingrese su correo"
                        />
                    </label>
                    <label>
                        Contraseña:
                        <input
                            type="password"
                            name="password"
                            placeholder="Ingrese su contraseña"
                        />
                    </label>
                    {error && <p className="error">{error}</p>}
                    <div className="button-container">
                        <button type="submit" style={{ borderRadius: '5px' }}>
                            Registrarse
                        </button>
                        <button
                            type="button"
                            style={{ borderRadius: '5px' }}
                            onClick={() => navigate('/Login')}
                        >
                            Volver a Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
