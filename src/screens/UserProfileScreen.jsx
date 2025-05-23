import React, { useState, useEffect } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader'; // Nuevo Header
import BottomNavBar from '../components/futbol/BottomNavBar';
import '../styles/UserProfileScreen.css'; // CSS específico para esta pantalla

const backendUrl = 'http://localhost:8080';

function UserProfileScreen({ onNavigateBack, onNavigate }) {
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    sex: '',
    playedMatches: '',
    abandonedMatches: '',
    nickname: '',
    photo: '',
    references: [],
    tipo: 'admin'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${backendUrl}/users/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) {
          console.error('Error al obtener el perfil del backend');
          setUserData({
            name: 'Tito Rodriguez (Ejemplo)',
            age: '21',
            sex: 'Masculino',
            playedMatches: '23',
            abandonedMatches: '0',
            nickname: 'Tito el Mago',
            photo: 'src/components/profile/image.png', // Placeholder
            references: [
              { id: 1, author: 'David Restrepo', text: 'Un jugador excelente, muy pocas faltas comete, compañerista y humilde. En cuanto los pagos de la cancha es muy cumplido, recomendado para cualquier partido.' },
              { id: 2, author: 'Carlos el Goles', text: 'Buen jugador, lo recomiendo mas para delantero o central si juegan futbol 11, en cuanto a futbol 8 es mejor en punta, define muy bien, compañerista y un buen lider.' },
            ]
          });
          setLoading(false);
          return;
        }

        const data = await res.json();
        setUserData({
          name: data.name || 'N/A',
          age: data.age || '21', 
          sex: data.sex || 'Masculino', 
          playedMatches: data.playedMatches || '23',
          abandonedMatches: data.abandonedMatches || '0', 
          nickname: data.nickname || 'Tito el Mago', 
          photo: data.photo || 'src/components/profile/image.png',
          references: data.references || [
            { id: 1, author: 'David Restrepo', text: 'Un jugador excelente, muy pocas faltas comete, compañerista y humilde. En cuanto los pagos de la cancha es muy cumplido, recomendado para cualquier partido.' },
            { id: 2, author: 'Carlos el Goles', text: 'Buen jugador, lo recomiendo mas para delantero o central si juegan futbol 11, en cuanto a futbol 8 es mejor en punta, define muy bien, compañerista y un buen lider.' },
          ]
        });
      } catch (err) {
        console.error('Error al obtener usuario:', err);
         setUserData({
            name: 'Tito Rodriguez (Error)',
            age: '21',
            sex: 'Masculino',
            playedMatches: '23',
            abandonedMatches: '0',
            nickname: 'Tito el Mago',
            photo: 'src/components/profile/image.png',
            references: [
              { id: 1, author: 'David Restrepo', text: 'Un jugador excelente, muy pocas faltas comete, compañerista y humilde. En cuanto los pagos de la cancha es muy cumplido, recomendado para cualquier partido.' },
              { id: 2, author: 'Carlos el Goles', text: 'Buen jugador, lo recomiendo mas para delantero o central si juegan futbol 11, en cuanto a futbol 8 es mejor en punta, define muy bien, compañerista y un buen lider.' },
            ]
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
              src={userData.photo || 'src/components/profile/image.png'}
              alt="Foto de perfil"
              className="player-profile-photo"
            />
            <div className="player-details">
              <p><strong>NOMBRE: Jhon Sosa</strong> {userData.name}</p>
              <p><strong>EDAD: 23</strong> {userData.age}</p>
              <p><strong>SEXO: Masculino </strong> {userData.sex}</p>
              <p><strong>JUGADOS: 10</strong> {userData.playedMatches}</p>
              <p><strong>ABANDONADOS: 0</strong> {userData.abandonedMatches}</p>
              <p><strong>APODO: El señor del sexo</strong> {userData.nickname}</p>
              <p><strong>ROL: Administrador</strong> {userData.nickname}</p>
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