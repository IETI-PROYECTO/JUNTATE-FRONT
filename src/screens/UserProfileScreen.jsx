import React, { useState, useEffect } from 'react';
import Header from '../components/futbol/Header';
import BottomNavBar from '../components/futbol/BottomNavBar';
import '../styles/FutbolScreen.css';
import '../styles/UserProfileScreen.css';

const backendUrl = 'http://localhost:8080';

function UserProfileScreen({ onNavigateBack, onNavigate }) {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        phone: '',
        city: '',
        photo: '',
        role: '',
    });

    const [editMode, setEditMode] = useState(false);
    const [tempFormData, setTempFormData] = useState(formData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if (!token || !userId) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`${backendUrl}/users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    console.error('Error al obtener el perfil');
                    setLoading(false);
                    return;
                }

                const data = await res.json();
                console.log('Datos recibidos del backend:', data);

                const safeData = {
                    id: data.id || '',
                    name: data.name || '',
                    email: data.email || '',
                    password: '',
                    phone: data.phone !== null ? String(data.phone) : '',
                    city: data.city || '',
                    photo: data.photo || '',
                    role: data.role || '',
                };

                setFormData(safeData);
                setTempFormData(safeData);
            } catch (err) {
                console.error('Error al obtener usuario:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${backendUrl}/users/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(tempFormData),
            });

            if (res.ok) {
                alert('Perfil actualizado correctamente.');
                setFormData(tempFormData);
                setEditMode(false);
            } else {
                const error = await res.json();
                alert(`Error al guardar: ${error.message || 'desconocido'}`);
            }
        } catch (error) {
            console.error('Error al guardar:', error);
            alert('Ocurrió un error al intentar guardar los cambios.');
        }
    };

    const handleCancel = () => {
        setTempFormData(formData);
        setEditMode(false);
    };

    if (loading) {
        return <p className="loading-message">Cargando perfil...</p>;
    }

    if (!formData.id) {
        return (
            <div className="futbol-screen-container">
                <Header title="PERFIL" onBack={onNavigateBack} />
                <main className="main-content user-profile-content no-user">
                    <p className="login-message">Por favor inicia sesión para ver tu perfil.</p>
                </main>
                <BottomNavBar onNavigate={onNavigate} />
            </div>
        );
    }

    return (
        <div className="futbol-screen-container">
            <Header title="PERFIL" onBack={onNavigateBack} />
            <main className="main-content user-profile-content">
                <img
                    src={formData.photo || '/default-profile.png'}
                    alt="Foto de perfil"
                    className="profile-photo"
                />
                <form className="user-profile-form" onSubmit={e => e.preventDefault()}>
                    <input
                        name="name"
                        value={editMode ? tempFormData.name : (formData.name || 'No definido')}
                        onChange={handleChange}
                        placeholder="Nombre completo"
                        disabled={!editMode}
                    />
                    <input
                        name="email"
                        value={editMode ? tempFormData.email : (formData.email || 'No definido')}
                        onChange={handleChange}
                        placeholder="Email"
                        disabled={!editMode}
                    />
                    <input
                        name="password"
                        type="password"
                        value={editMode ? tempFormData.password : ''}
                        onChange={handleChange}
                        placeholder="Contraseña"
                        disabled={!editMode}
                    />
                    <input
                        name="phone"
                        value={editMode ? tempFormData.phone : (formData.phone || 'No definido')}
                        onChange={handleChange}
                        placeholder="Teléfono"
                        disabled={!editMode}
                    />
                    <input
                        name="city"
                        value={editMode ? tempFormData.city : (formData.city || 'No definido')}
                        onChange={handleChange}
                        placeholder="Ciudad"
                        disabled={!editMode}
                    />
                    <input
                        name="photo"
                        value={editMode ? tempFormData.photo : (formData.photo || '')}
                        onChange={handleChange}
                        placeholder="URL Foto"
                        disabled={!editMode}
                    />
                    <input
                        name="role"
                        value={editMode ? tempFormData.role : (formData.role || 'No definido')}
                        onChange={handleChange}
                        placeholder="Rol"
                        disabled={!editMode}
                    />

                    {!editMode ? (
                        <button type="button" className="edit-button" onClick={() => setEditMode(true)}>
                            Editar Perfil
                        </button>
                    ) : (
                        <>
                            <button type="button" className="save-button" onClick={handleSave}>
                                Guardar Cambios
                            </button>
                            <button type="button" className="cancel-button" onClick={handleCancel}>
                                Cancelar
                            </button>
                        </>
                    )}
                </form>
            </main>
            <BottomNavBar onNavigate={onNavigate} />
        </div>
    );
}

export default UserProfileScreen;
