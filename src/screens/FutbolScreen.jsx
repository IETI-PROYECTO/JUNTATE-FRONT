import React, { useState, useEffect } from 'react';
import Header from '../components/futbol/Header';
import SearchBar from '../components/futbol/SearchBar';
import InfoBoxes from '../components/futbol/InfoBoxes';
import MatchList from '../components/futbol/MatchList';
import BottomNavBar from '../components/futbol/BottomNavBar';
import AddMatchForm from '../components/futbol/AddMatchForm';
import '../styles/FutbolScreen.css';

const backendUrl = 'http://localhost:8080';

function FutbolScreen({ onNavigateBack, onNavigateToJoinEvent, onNavigate }) {
  const [matches, setMatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMatchForm, setShowAddMatchForm] = useState(false);
  const [matchToEdit, setMatchToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar eventos desde backend al montar el componente
  useEffect(() => {
    fetchMatchesFromBackend();
  }, []);

  const getToken = () => localStorage.getItem('token');

  const fetchMatchesFromBackend = async () => {
    setLoading(true);
    setError('');
    try {
      const token = getToken();
      const response = await fetch(`${backendUrl}/api/event`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Error al obtener los eventos');
      const data = await response.json();
      // Filtrar solo partidos de fútbol (ajusta según el valor exacto de gameType)
      const futbolMatches = data.filter(event =>
        event.gameType.toLowerCase().includes('futbol')
      );
      setMatches(futbolMatches);
    } catch (err) {
      setError('No se pudieron cargar los eventos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAddMatchForm = () => {
    setShowAddMatchForm(!showAddMatchForm);
    if (showAddMatchForm) setMatchToEdit(null);
  };

  // Agregar o editar partido en backend y luego actualizar estado
  const handleAddMatch = async (newMatch) => {
    const token = getToken();

    try {
      let response, savedMatch;
      if (matchToEdit) {
        // Edición
        response = await fetch(`${backendUrl}/api/event/${matchToEdit.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newMatch),
        });
        if (!response.ok) throw new Error('Error al actualizar el partido');
        savedMatch = await response.json();
        setMatches(prev =>
          prev.map(m => (m.id === matchToEdit.id ? savedMatch : m))
        );
        setMatchToEdit(null);
      } else {
        // Creación
        response = await fetch(`${backendUrl}/api/event`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newMatch),
        });
        if (!response.ok) throw new Error('Error al crear el partido');
        savedMatch = await response.json();
        setMatches(prev => [savedMatch, ...prev]);
      }
      setShowAddMatchForm(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteMatch = async (id) => {
    if (!window.confirm('¿Seguro quieres eliminar este partido?')) return;
    const token = getToken();

    try {
      const response = await fetch(`${backendUrl}/api/event/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Error al eliminar el partido');
      setMatches(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleNavigateToJoin = (id) => {
    const eventData = matches.find(m => m.id === id);
    if (onNavigateToJoinEvent) {
      onNavigateToJoinEvent(eventData || { id, needsMoreData: true });
    }
  };

  const handleEditMatch = (match) => {
    setMatchToEdit(match);
    setShowAddMatchForm(true);
  };

  const filteredMatches = matches.filter(match =>
    match.gameType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (match.creationDate ? match.creationDate.toLowerCase().includes(searchTerm.toLowerCase()) : false)
  );

  return (
    <div className="futbol-screen-container">
      <Header title="FÚTBOL" onBack={onNavigateBack} />
      <main className="main-content">
        <SearchBar onSearch={setSearchTerm} />
        <InfoBoxes jugadores={3} abandonados={1} />
        <div className="match-list-header">
          <h2>Partidos Disponibles</h2>
          <button className="create-match-button" onClick={toggleAddMatchForm}>
            {showAddMatchForm ? 'Cancelar' : 'Crear Partidos'}{' '}
            <span className="plus-icon">{showAddMatchForm ? '' : '+'}</span>
          </button>
        </div>

        {loading && <p>Cargando partidos...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && !error && (
          <MatchList
            matches={filteredMatches}
            onJoinMatch={handleNavigateToJoin}
            onDeleteMatch={handleDeleteMatch}
            onEditMatch={handleEditMatch}
          />
        )}
      </main>
      <BottomNavBar onNavigate={onNavigate} />
      {showAddMatchForm && (
        <AddMatchForm
          onAddMatch={handleAddMatch}
          onCancel={toggleAddMatchForm}
          existingMatch={matchToEdit}
        />
      )}
    </div>
  );
}

export default FutbolScreen;
