import React, { useState } from 'react';
import Header from '../components/futbol/Header';
import SearchBar from '../components/futbol/SearchBar';
import InfoBoxes from '../components/futbol/InfoBoxes';
import MatchList from '../components/futbol/MatchList';
import BottomNavBar from '../components/futbol/BottomNavBar';
import '../styles/FutbolScreen.css';

function FutbolScreen({ onNavigateBack, onNavigateToJoinEvent, onNavigate }) {
  const [matches, setMatches] = useState([
    { id: 1, date: 'Jueves, 1 Abril, 6:00 pm', description: 'Partido 8 vs 8', location: 'Av. Calle 72 # 112 a 01, Bogotá' },
    { id: 2, date: 'Jueves, 24 Junio, 7:30 pm', description: 'Partido 5 vs 5', location: 'Calle 40 #40' },
    { id: 3, date: 'Martes, 30 Julio, 7:00 pm', description: 'Partido 6 vs 6', location: 'Calle 80 #80' },
    { id: 4, date: 'Martes, 11 Agosto, 7:00 pm', description: 'Partido 6 vs 6', location: 'Calle 50 #50' },
    { id: 5, date: 'Miercoles, 11 Agosto, 7:00 pm', description: 'Partido 6 vs 6', location: 'Calle 50 #50' },
    { id: 6, date: 'Miercoles, 11 Agosto, 7:00 pm', description: 'Partido 6 vs 6', location: 'Calle 50 #50' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCreateMatch = () => {
    console.log('Botón "Crear Partidos" presionado');
  };

  const handleNavigateToJoin = (matchId) => {
    const eventData = matches.find(m => m.id === matchId);
    if (onNavigateToJoinEvent) {
      onNavigateToJoinEvent(eventData || { id: matchId, needsMoreData: true });
    }
  };

  const filteredMatches = matches.filter(match =>
      (match.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (match.location?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (match.date?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
      <div className="futbol-screen-container">
        <Header title="FÚTBOL" onBack={onNavigateBack} />
        <main className="main-content">
          <SearchBar onSearch={handleSearch} />
          <InfoBoxes jugadores={3} abandonados={1} />
          <div className="match-list-header">
            <h2>Partidos Disponibles</h2>
            <button className="create-match-button" onClick={handleCreateMatch}>
              Crear Partidos <span className="plus-icon">+</span>
            </button>
          </div>
          <MatchList
              matches={filteredMatches}
              onJoinMatch={handleNavigateToJoin}
          />
        </main>
        {/* Aquí pasamos la función onNavigate para que BottomNavBar pueda navegar a cualquier pantalla */}
        <BottomNavBar onNavigate={onNavigate} />
      </div>
  );
}

export default FutbolScreen;
