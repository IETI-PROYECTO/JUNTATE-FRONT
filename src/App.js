import React, { useState } from 'react';
import SportSelectionScreen from './screens/SportSelectionScreen';

const App = () => {
  const [screen, setScreen] = useState('selection');

  const handleSelectSport = (sport) => {
    alert(`Deporte seleccionado: ${sport}`);
  };

  return (
    <div>
      {screen === 'selection' && <SportSelectionScreen onSelectSport={handleSelectSport} />}
    </div>
  );
};

export default App;
