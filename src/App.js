import React, { useState } from 'react';
import SportSelectionScreen from './screens/SportSelectionScreen';
import FutbolScreen from './screens/FutbolScreen';

const App = () => {
  const [screen, setScreen] = useState('selection');

  const handleSelectSport = (sport) => {
    if (sport === 'FÚTBOL') {
      setScreen('futbol');
    } else {
      alert(`Deporte seleccionado: ${sport}`);
    }
  };

  const navigateTo = (targetScreen) => {
    setScreen(targetScreen);
  };

  return (
    <div>
      {screen === 'selection' && (
        <SportSelectionScreen onSelectSport={handleSelectSport} />
      )}
      {screen === 'futbol' && (
        <FutbolScreen onNavigateBack={() => navigateTo('selection')} />
      )}
    </div>
  );
};

export default App;