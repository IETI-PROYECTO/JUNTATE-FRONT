import React, { useState } from 'react';
import SportSelectionScreen from './screens/SportSelectionScreen';
import FutbolScreen from './screens/FutbolScreen';
import JoinEventScreen from './screens/JoinEventScreen';

const App = () => {
  const [screen, setScreen] = useState('selection');
  const [selectedEventData, setSelectedEventData] = useState(null);

  const navigateTo = (targetScreen, data = null) => {
    setSelectedEventData(data);
    setScreen(targetScreen);
  };

  const handleSelectSport = (sport) => {
    if (sport === 'FÚTBOL') {
      navigateTo('futbol');
    } else {
      alert(`Deporte seleccionado: ${sport}`);
    }
  };

  const handleJoinEventFlow = (eventDataFromMatchItem) => {
    navigateTo('joinEvent', eventDataFromMatchItem);
  };

  const handleConfirmJoinEvent = () => {
    console.log("Usuario se unió al evento:", selectedEventData);
    navigateTo('futbol');
  };


  if (screen === 'selection') {
    return <SportSelectionScreen onSelectSport={handleSelectSport} />;
  }

  if (screen === 'futbol') {
    return (
      <FutbolScreen
        onNavigateBack={() => navigateTo('selection')}
        onNavigateToJoinEvent={handleJoinEventFlow}
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

  return null;
};

export default App;