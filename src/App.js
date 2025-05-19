// src/App.js
import React, { useState } from 'react';
import SportSelectionScreen from './screens/SportSelectionScreen'; //
import FutbolScreen from './screens/FutbolScreen'; 
// Si tienes estilos globales para App.js o el layout general:
// import './App.css';

const App = () => {
  const [screen, setScreen] = useState('selection'); 

  const handleSelectSport = (sport) => {
    // setSelectedSport(sport); 
    if (sport === 'FÚTBOL') {
      setScreen('futbol');
    } else {
      alert(`Deporte seleccionado: ${sport}`);
    }
  };

  // Función para navegar entre pantallas, la pasarás como prop
  const navigateTo = (targetScreen) => {
    setScreen(targetScreen);
  };

  return (
    <div>
      {screen === 'selection' && (
        <SportSelectionScreen onSelectSport={handleSelectSport} /> //
      )}
      {screen === 'futbol' && (
        // Pasa la función para que FutbolScreen pueda volver a 'selection'
        <FutbolScreen onNavigateBack={() => navigateTo('selection')} /> 
      )}
    </div>
  );
};

export default App;