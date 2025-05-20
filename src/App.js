import React, { useState } from 'react';
import SportSelectionScreen from './screens/SportSelectionScreen';
import FutbolScreen from './screens/FutbolScreen';
import JoinEventScreen from './screens/JoinEventScreen';
import GroupChatScreen from './screens/GroupChatScreen';

const App = () => {
  const [screen, setScreen] = useState('selection');
  const [selectedEventData, setSelectedEventData] = useState(null);
  const [currentUser, setCurrentUser] = useState({ id: 'user1', name: 'Tú Mismo', avatar: 'https://via.placeholder.com/40?text=ME' }); // Datos del usuario actual

  const navigateTo = (targetScreen, data = null) => {
    if (data) {
      setSelectedEventData(prevData => ({ ...prevData, ...data }));
    }
    setScreen(targetScreen);
  };

  const handleSelectSport = (sport) => {
    if (sport === 'FÚTBOL') {
      navigateTo('futbol');
    } else {
      alert(`Deporte seleccionado: ${sport}`);
    }
  };

  const handleNavigateToJoinEvent = (eventDataFromMatchItem) => {
    navigateTo('joinEvent', eventDataFromMatchItem);
  };

  const handleConfirmJoinEvent = () => {
    console.log("Usuario se unió al evento:", selectedEventData);
    navigateTo('groupChat', selectedEventData);
  };

  if (screen === 'selection') {
    return <SportSelectionScreen onSelectSport={handleSelectSport} />;
  }

  if (screen === 'futbol') {
    return (
      <FutbolScreen
        onNavigateBack={() => navigateTo('selection')}
        onNavigateToJoinEvent={handleNavigateToJoinEvent}
      />
    );
  }

  if (screen === 'joinEvent') {
    return (
      <JoinEventScreen
        eventData={selectedEventData}
        onNavigateBack={() => navigateTo('futbol')}
        onJoinEvent={handleConfirmJoinEvent}
      />
    );
  }

  if (screen === 'groupChat') {
    return (
      <GroupChatScreen
        eventData={selectedEventData}
        currentUser={currentUser}
        onNavigateBack={() => navigateTo('joinEvent')} // O a 'futbol' si prefieres
      />
    );
  }

  return null;
};

export default App;