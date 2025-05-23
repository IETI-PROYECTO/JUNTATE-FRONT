import React, { useState, useEffect } from 'react';
import SportSelectionScreen from './screens/SportSelectionScreen';
import FutbolScreen from './screens/FutbolScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import JoinEventScreen from './screens/JoinEventScreen';
import GroupChatScreen from './screens/GroupChatScreen';
import AuthModal from './screens/AuthModal';

const backendUrl = 'http://localhost:8080';

const App = () => {
  const [screen, setScreen] = useState('selection');
  const [selectedEventData, setSelectedEventData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Al montar, intentar cargar usuario si hay token guardado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${backendUrl}/api/auth/userinfo`, {
        headers: { Authorization: `Bearer ${token}` },
      })
          .then(res => {
            if (!res.ok) throw new Error('Token inválido');
            return res.json();
          })
          .then(userData => {
            setCurrentUser(userData);
            setShowAuthModal(false);
          })
          .catch(() => {
            localStorage.removeItem('token');
            setCurrentUser(null);
            setShowAuthModal(true);
          });
    } else {
      setShowAuthModal(true);
    }
  }, []);

  const navigateTo = (targetScreen, data = null) => {
    if (data) {
      setSelectedEventData(prevData => ({ ...prevData, ...data }));
    }
    setScreen(targetScreen);
  };

  const handleAuthSuccess = (data) => {
    const { token, ...user } = data;
    localStorage.setItem('token', token);
    setCurrentUser(user);
    setShowAuthModal(false);
    setScreen('selection'); // o a donde quieras después del login
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setShowAuthModal(true);
    setScreen('selection');
  };

  if (showAuthModal) {
    return <AuthModal onAuthSuccess={handleAuthSuccess} onClose={() => setShowAuthModal(false)} />;
  }
  if (screen === 'perfil' && !currentUser) {
    setScreen('selection');
  }

  switch(screen) {
    case 'selection':
      return <SportSelectionScreen
          onSelectSport={(sport) => {
            if (sport === 'FÚTBOL') {
              navigateTo('futbol');
            } else {
              alert(`Deporte seleccionado: ${sport}`);
            }
          }}
          onLogout={handleLogout}
          onNavigate={navigateTo}
      />;

    case 'futbol':
      return <FutbolScreen
          onNavigateBack={() => navigateTo('selection')}
          onNavigateToJoinEvent={(eventData) => navigateTo('joinEvent', eventData)}
          onNavigate={navigateTo}
      />;

    case 'perfil':
      return <UserProfileScreen
          user={currentUser}            
          onNavigateBack={() => navigateTo('selection')}
          onNavigate={navigateTo}
      />;

    case 'joinEvent':
      return <JoinEventScreen
          eventData={selectedEventData}
          onNavigateBack={() => navigateTo('futbol')}
          onJoinEvent={() => navigateTo('groupChat', selectedEventData)}
          onNavigate={navigateTo}
      />;

    case 'groupChat':
      return <GroupChatScreen
          eventData={selectedEventData}
          currentUser={currentUser}
          onNavigateBack={() => navigateTo('joinEvent')}
          onNavigate={navigateTo}
      />;

    default:
      return null;
  }
};

export default App;
