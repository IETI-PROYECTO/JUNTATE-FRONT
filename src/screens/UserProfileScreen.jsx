import React, { useState, useEffect } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import BottomNavBar from '../components/futbol/BottomNavBar';
import '../styles/UserProfileScreen.css';
import defaultProfileImage from '../components/profile/image.png';

function UserProfileScreen({ onNavigateBack, onNavigate }) {
  const [userData, setUserData] = useState({
    name: 'Jhon Sosa (Quemado)', // Dato quemado
    age: '23', // Placeholder o dato quemado
    sex: 'Masculino', // Placeholder o dato quemado
    playedMatches: '10', // Placeholder o dato quemado
    abandonedMatches: '0', // Placeholder o dato quemado
    nickname: 'El señor del sexo (Quemado)', // Placeholder o dato quemado
    photo: defaultProfileImage, // Imagen por defecto
    references: [
      { id: 1, author: 'David Restrepo', text: 'Un jugador excelente, muy pocas faltas comete, compañerista y humilde. En cuanto los pagos de la cancha es muy cumplido, recomendado para cualquier partido.' },
      { id: 2, author: 'Carlos el Goles', text: 'Buen jugador, lo recomiendo mas para delantero o central si juegan futbol 11, en cuanto a futbol 8 es mejor en punta, define muy bien, compañerista y un buen lider.' },
    ],
    role: 'Administrador (Quemado)' // Dato quemado
  });
  const [loading, setLoading] = useState(false); // No hay carga real, se puede quitar si no hay otras lógicas asíncronas

  // El useEffect para fetch ya no es necesario si todos los datos son quemados.
  // Si necesitas que 'loading' cambie o alguna lógica al montar, puedes mantener un useEffect simple.
  // useEffect(() => {
  //   // Simular una carga mínima si es necesario para la UX, o quitar si es instantáneo
  //   const timer = setTimeout(() => setLoading(false), 100); // Opcional
  //   return () => clearTimeout(timer);
  // }, []);

  if (loading) { // Aunque ahora 'loading' se establece en false, se mantiene la estructura por si acaso
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