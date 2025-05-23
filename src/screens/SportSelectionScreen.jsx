import React from 'react';
import '../styles/SportSelectionScreen.css';
import SportButton from '../components/SportButton'; // ✅ Esta línea importa el botón

const SportSelectionScreen = ({ onSelectSport, onLogout }) => {
    const sports = [
        { name: 'FÚTBOL', icon: '⚽' },
        { name: 'CICLISMO', icon: '🚴' },
        { name: 'ATLETISMO', icon: '🏃' },
        { name: 'BALONCESTO', icon: '🏀' },
        { name: 'SKATE', icon: '🛹' },
        { name: 'TENIS', icon: '🎾' },
    ];

    return (
        <div className="sport-selection-container">
            <h1 className="title">ELIGE TU/S DEPORTE/S</h1>

            <div className="sports-grid">
                {sports.map((sport) => (
                    <SportButton
                        key={sport.name}
                        icon={sport.icon}
                        name={sport.name}
                        onClick={() => onSelectSport(sport.name)}
                    />
                ))}
            </div>

            <button className="logout-button" onClick={onLogout}>
                Cerrar Sesión
            </button>
        </div>
    );
};

export default SportSelectionScreen; // ✅ Muy importante
