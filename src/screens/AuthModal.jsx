import React, { useState } from 'react';
import '../styles/AuthModal.css';

const backendUrl = 'https://ieti.duckdns.org:8080';

const AuthModal = ({ onClose, onAuthSuccess }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isRegistering
            ? `${backendUrl}/api/auth/register`
            : `${backendUrl}/api/auth/authenticate`;

        const body = isRegistering
            ? formData
            : { email: formData.email, password: formData.password };

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('token', data.token);
                onAuthSuccess(data);
                onClose();
            } else {
                alert("Error al autenticar o registrar");
            }
        } catch (error) {
            console.error(error);
            alert("Error al conectar con el servidor");
        }
    };

    return (
        <div className="auth-modal-overlay">
            <div className="auth-modal">
                <h2>{isRegistering ? 'Registro' : 'Inicio de Sesión'}</h2>
                <form onSubmit={handleSubmit}>
                    {isRegistering && (
                        <>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Nombre"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Apellido"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </>
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</button>
                </form>
                <p>
                    {isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
                    <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? 'Iniciar Sesión' : 'Registrarse'}
                    </button>
                </p>
                <button className="close-btn" onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default AuthModal;
