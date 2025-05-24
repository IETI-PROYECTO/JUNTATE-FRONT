import React, { useState, useEffect } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import BottomNavBar from '../components/futbol/BottomNavBar';
import '../styles/UserProfileScreen.css';
import defaultProfileImage from '../components/profile/image.png';

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

function UserProfileScreen({ onNavigateBack, onNavigate }) {
  const [userData, setUserData] = useState({
    name: '',
    age: '23',
    sex: 'Masculino',
    playedMatches: '10',
    abandonedMatches: '0',
    nickname: 'El señor del sexo',
    photo: defaultProfileImage,
    references: [
      {
        id: 1,
        author: 'David Restrepo',
        text: 'Un jugador excelente, muy pocas faltas comete...',
      },
      {
        id: 2,
        author: 'Carlos el Goles',
        text: 'Buen jugador, lo recomiendo más para delantero...',
      },
    ],
    role: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No hay token en localStorage');
        setLoading(false);
        return;
      }

      const payload = parseJwt(token);
      const email = payload?.sub;
      if (!email) {
        console.error('No se pudo obtener el email del token');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://ieti.duckdns.org:8080/users/user/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(prev => ({
            ...prev,
            name: data.name,
            role: data.role,
            email: data.email,
          }));
        } else {
          console.error('Error al obtener los datos del usuario');
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
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
            {userData.references.length > 0 ? (
              userData.references.map(ref => (
                <div key={ref.id} className="reference-item">
                  <p className="reference-author">{ref.author}</p>
                  <p className="reference-text">{ref.text}</p>
                </div>
              ))
            ) : (
              <p>No hay referencias aún.</p>
            )}
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
