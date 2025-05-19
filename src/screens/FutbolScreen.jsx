import React, { useState } from 'react';

import Header from '../components/futbol/Header';
import SearchBar from '../components/futbol/SearchBar';
import InfoBoxes from '../components/futbol/InfoBoxes';
import MatchList from '../components/futbol/MatchList';
import BottomNavBar from '../components/futbol/BottomNavBar';

import '../styles/FutbolScreen.css';


const DummyHeader = ({ title, onBack }) => (
  <header 
    onClick={onBack} 
    style={{
      cursor: 'pointer', 
      backgroundColor: '#004D40', // Color de fondo similar al de la imagen
      color: 'white', 
      padding: '15px 20px', 
      display: 'flex', 
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}
  >
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      style={{marginRight: '15px'}}
    >
      <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="white"/>
    </svg>
    <div style={{ // Contenedor del logo de fútbol
      width: '40px', 
      height: '40px', 
      borderRadius: '50%', 
      backgroundColor: 'white', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      marginRight: '15px'
    }}>
      {/* Puedes usar un <img> o un ícono de react-icons aquí */}
      <span style={{fontSize: '20px', color: 'black'}}>⚽</span> 
    </div>
    <h1 style={{fontSize: '20px', margin: '0', fontWeight: 'bold'}}>{title}</h1>
  </header>
);

const DummySearchBar = ({ onSearch }) => (
  <div style={{padding: '10px 15px', backgroundColor: '#f0f2f5'}}>
    <input 
      type="text" 
      placeholder="Buscar" 
      onChange={e => onSearch(e.target.value)} 
      style={{width: 'calc(100% - 30px)', padding: '12px 15px', border: '1px solid #ccc', borderRadius: '20px'}} 
    />
    {/* En tu implementación real, el ícono de búsqueda estaría dentro o junto al input */}
  </div>
);

const DummyInfoBoxes = ({ jugadores, abandonados }) => (
  <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px 15px', gap: '10px'}}>
    <div style={{flex: 1, background: '#28a745', color: 'white', padding: '10px', borderRadius: '5px', textAlign: 'center', fontWeight: 'bold'}}>
      JUGADORES: {jugadores}
    </div>
    <div style={{flex: 1, background: '#dc3545', color: 'white', padding: '10px', borderRadius: '5px', textAlign: 'center', fontWeight: 'bold'}}>
      ABANDONADOS: {abandonados}
    </div>
  </div>
);

const DummyMatchList = ({ matches, onJoinMatch }) => (
  <ul style={{listStyle: 'none', padding: '0 15px', margin: '0'}}>
    {matches.map(m => (
      <li 
        key={m.id} 
        style={{
          border: '1px solid #eee', 
          padding: '15px', 
          margin: '10px 0', 
          borderRadius: '5px', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white'
        }}
      >
        <div>
          <p style={{margin: '0 0 5px 0', fontWeight: 'bold', color: '#333'}}>{m.date}</p>
          <p style={{margin: '0 0 5px 0', color: '#555'}}>{m.description}</p>
          <p style={{margin: '0', fontSize: '0.9em', color: '#777'}}>{m.location}</p>
        </div>
        <button 
          onClick={() => onJoinMatch(m.id)} 
          style={{
            background: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '50%', 
            width: '30px', 
            height: '30px', 
            fontSize: '20px',
            cursor: 'pointer'
          }}
        >+</button>
      </li>
    ))}
  </ul>
);

const DummyBottomNavBar = ({ onNavigate }) => (
    <nav style={{
      display: 'flex', 
      justifyContent: 'space-around', 
      padding: '10px 0', 
      backgroundColor: '#ffffff', 
      borderTop: '1px solid #e0e0e0', 
      position: 'fixed', 
      bottom: '0', 
      left: '0',
      width: '100%',
      boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'
    }}>
        {/* Ejemplo de cómo un botón de la navbar podría navegar */}
        {/* <button onClick={() => onNavigate('selection')} style={{fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer'}}>🏠</button> */}
        <button style={{fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer'}}>🔔</button>
        <button style={{fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer'}}>📅</button>
        <button style={{fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer', color: '#007bff'}}>⚽</button> {/* Icono activo */}
        <button style={{fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer'}}>💰</button>
        <button style={{fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer'}}>👤</button>
    </nav>
);
// --- FIN COMPONENTES DUMMY ---

function FutbolScreen({ onNavigateBack }) { // Prop para manejar la navegación hacia atrás
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
    // Lógica de filtrado se aplicará en `filteredMatches`
  };

  const handleCreateMatch = () => {
    console.log('Crear nuevo partido');
    // Aquí iría la lógica para mostrar un modal o navegar a otra pantalla de creación
  };

  const handleJoinMatch = (matchId) => {
    console.log(`Unirse al partido con ID: ${matchId}`);
  };

  const filteredMatches = matches.filter(match =>
    match.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // Agrega un padding inferior para que el BottomNavBar no oculte contenido
    <div className="futbol-screen-container" style={{paddingBottom: '70px', backgroundColor: '#f0f2f5', minHeight: '100vh'}}>
      {/* REEMPLAZA ESTOS DUMMIES con tus componentes reales */}
      <DummyHeader title="FÚTBOL" onBack={onNavigateBack} /> {/* Pasa la función onNavigateBack */}
      
      <main className="main-content">
        <DummySearchBar onSearch={handleSearch} />
        <DummyInfoBoxes jugadores={3} abandonados={1} />
        
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 15px', marginTop: '10px'}}>
          <h2 style={{fontSize: '16px', margin: '0', color: '#333'}}>Partidos Disponibles</h2>
          <button 
            onClick={handleCreateMatch} 
            style={{
              backgroundColor: '#6c757d', 
              color: 'white', 
              border: 'none', 
              padding: '8px 12px', 
              borderRadius: '5px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            Crear Partidos <span style={{fontSize: '18px', fontWeight: 'bold'}}>+</span>
          </button>
        </div>
        <DummyMatchList matches={filteredMatches} onJoinMatch={handleJoinMatch} />
      </main>
      
      {/* El BottomNavBar podría también tener una prop para navegar, ej. onNavigate={onNavigateBack} si un ítem es 'home' */}
      <DummyBottomNavBar onNavigate={onNavigateBack} />
    </div>
  );
}

export default FutbolScreen;