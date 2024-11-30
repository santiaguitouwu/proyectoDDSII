import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <form onSubmit={handleSubmit}>
            <label>
                Usuario:
                <input type="text" name="username" placeholder="Ingrese su usuario" />
            </label>
            <label>
                Correo:
                <input type="email" name="email" placeholder="Ingrese su correo" />
            </label>
            <label>
                Contraseña:
                <input type="password" name="password" placeholder="Ingrese su contraseña" />
            </label>
            {error && <p className="error">{error}</p>}
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default Register;
