import React, { useState } from 'react';
import Header from '../components/futbol/Header';
import SearchBar from '../components/futbol/SearchBar';
import InfoBoxes from '../components/futbol/InfoBoxes';
import MatchList from '../components/futbol/MatchList';
import BottomNavBar from '../components/futbol/BottomNavBar';
import AddMatchForm from '../components/futbol/AddMatchForm'; // Importar el formulario
import '../styles/FutbolScreen.css';

function FutbolScreen({ onNavigateBack, onNavigateToJoinEvent, onNavigate }) {
  const [matches, setMatches] = useState([
    { id: 1, date: 'Jueves, 1 Abril, 6:00 pm', description: 'Partido 8 vs 8', location: 'Av. Calle 72 # 112 a 01, Bogotá' },
    { id: 2, date: 'Jueves, 24 Junio, 7:30 pm', description: 'Partido 5 vs 5', location: 'Calle 40 #40' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMatchForm, setShowAddMatchForm] = useState(false); // Estado para mostrar/ocultar formulario

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const toggleAddMatchForm = () => { // Cambiado de handleCreateMatch
    setShowAddMatchForm(!showAddMatchForm);
  };

  const handleAddMatch = (newMatch) => {
    setMatches(prevMatches => [newMatch, ...prevMatches]); // Añadir al inicio de la lista
    setShowAddMatchForm(false); // Ocultar formulario después de agregar
  };

  const handleDeleteMatch = (matchIdToDelete) => {
    setMatches(prevMatches => prevMatches.filter(match => match.id !== matchIdToDelete));
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
          <button className="create-match-button" onClick={toggleAddMatchForm}>
            {showAddMatchForm ? 'Cancelar' : 'Crear Partidos'} <span className="plus-icon">{showAddMatchForm ? '' : '+'}</span>
          </button>
        </div>
        <MatchList
          matches={filteredMatches}
          onJoinMatch={handleNavigateToJoin}
          onDeleteMatch={handleDeleteMatch} // Pasar la función de borrar
        />
      </main>
      <BottomNavBar onNavigate={onNavigate} />

      {showAddMatchForm && (
        <AddMatchForm
          onAddMatch={handleAddMatch}
          onCancel={toggleAddMatchForm}
        />
      )}
    </div>
  );
}

export default FutbolScreen;