import React, { useState, useEffect } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import BottomNavBar from '../components/futbol/BottomNavBar';
import '../styles/UserProfileScreen.css';
import defaultProfileImage from '../components/profile/image.png';

const userSpecificEndpoint = 'http://localhost:8080/3f77eecb-17aa-43f5-af59-925f754f0e5d';

function UserProfileScreen({ onNavigateBack, onNavigate }) {
  const [userData, setUserData] = useState({
    name: 'Cargando nombre...',
    age: '21', // Placeholder
    sex: 'Masculino', // Placeholder
    playedMatches: '23', // Placeholder
    abandonedMatches: '0', // Placeholder
    nickname: 'Tito el Mago', // Placeholder
    photo: defaultProfileImage, // Placeholder
    references: [ // Placeholder
      { id: 1, author: 'David Restrepo', text: 'Un jugador excelente, muy pocas faltas comete, compañerista y humilde. En cuanto los pagos de la cancha es muy cumplido, recomendado para cualquier partido.' },
      { id: 2, author: 'Carlos el Goles', text: 'Buen jugador, lo recomiendo mas para delantero o central si juegan futbol 11, en cuanto a futbol 8 es mejor en punta, define muy bien, compañerista y un buen lider.' },
    ],
    role: 'Cargando rol...'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');

      // Datos de fallback por si la petición falla o no hay token
      const fallbackStaticData = {
        age: '21',
        sex: 'Masculino',
        playedMatches: '23',
        abandonedMatches: '0',
        nickname: 'Tito el Mago',
        photo: defaultProfileImage,
        references: [
          { id: 1, author: 'David Restrepo', text: 'Un jugador excelente, muy pocas faltas comete, compañerista y humilde. En cuanto los pagos de la cancha es muy cumplido, recomendado para cualquier partido.' },
          { id: 2, author: 'Carlos el Goles', text: 'Buen jugador, lo recomiendo mas para delantero o central si juegan futbol 11, en cuanto a futbol 8 es mejor en punta, define muy bien, compañerista y un buen lider.' },
        ]
      };

      if (!token) {
        console.log('No hay token, usando datos de demostración completos.');
        setUserData({
            name: 'Tito Rodriguez (Demo)',
            role: 'Admin (Demo)',
            ...fallbackStaticData
        });
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(userSpecificEndpoint, { // Usar el endpoint específico
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) {
          console.error('Error al obtener el perfil del backend, usando datos de demostración.');
          setUserData({
            name: 'Usuario (Error de Carga)',
            role: 'Rol (Error de Carga)',
            ...fallbackStaticData
          });
          setLoading(false);
          return;
        }

        const data = await res.json();
        setUserData(prevData => ({
          ...prevData, // Mantiene los placeholders para age, sex, etc.
          name: data.name || 'Nombre no disponible',
          role: data.role || 'Rol no disponible',
          // El resto de los campos (age, sex, photo, etc.) conservan sus valores iniciales/placeholders
          // a menos que también quieras actualizarlos con data si vienen en el JSON.
          // Por ejemplo, si data.photo existe, podrías hacer:
          // photo: data.photo || defaultProfileImage,
        }));
      } catch (err) {
        console.error('Error en el fetch al obtener usuario:', err);
        setUserData({
            name: 'Usuario (Error de Red)',
            role: 'Rol (Error de Red)',
            ...fallbackStaticData
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p className="loading-message-profile">Cargando perfil...</p>;
  }

  return (
    <div className="profile-screen-page-container">
      <ProfileHeader title="PERFIL DEL JUGADOR" onBack={onNavigateBack} />
      <main className="profile-main-content">
        <div className="player-card">
          <section className="player-info-header">
            <img
              src={userData.photo}
              alt="Foto de perfil"
              className="player-profile-photo"
              onError={(e) => { e.target.onerror = null; e.target.src = defaultProfileImage; }}
            />
            <div className="player-details">
              <p><strong>NOMBRE:</strong> {userData.name}</p>
              <p><strong>EDAD:</strong> {userData.age}</p>
              <p><strong>SEXO:</strong> {userData.sex}</p>
              <p><strong>JUGADOS:</strong> {userData.playedMatches}</p>
              <p><strong>ABANDONADOS:</strong> {userData.abandonedMatches}</p>
              <p><strong>APODO:</strong> {userData.nickname}</p>
              <p><strong>ROL:</strong> {userData.role}</p>
            </div>
          </section>
          <section className="player-references">
            <h3>REFERENCIAS:</h3>
            {userData.references.map(ref => (
              <div key={ref.id} className="reference-item">
                <p className="reference-author">{ref.author}</p>
                <p className="reference-text">{ref.text}</p>
              </div>
            ))}
            {userData.references.length === 0 && <p>No hay referencias aún.</p>}
          </section>
        </div>
        <button type="button" className="add-reference-button">
          Agregar una referencia
        </button>
      </main>
      <BottomNavBar onNavigate={onNavigate} />
    </div>
  );
}

export default UserProfileScreen;