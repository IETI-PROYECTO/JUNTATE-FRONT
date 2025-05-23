import React, { useState, useEffect } from 'react';
import './AddMatchForm.css';

const AddMatchForm = ({ onAddMatch, onCancel, existingMatch }) => {
  const [name, setName] = useState('');
  const [gameType, setGameType] = useState('');
  const [location, setLocation] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [numberOfPlayers, setNumberOfPlayers] = useState('');

  const toInputDateTimeLocal = (isoString) => {
    if (!isoString) return '';
    return isoString.substring(0, 16);
  };

  useEffect(() => {
    if (existingMatch) {
      setName(existingMatch.name || '');
      setGameType(existingMatch.gameType || '');
      setLocation(existingMatch.location || '');
      setCreationDate(toInputDateTimeLocal(existingMatch.creationDate) || '');
      setExpirationDate(toInputDateTimeLocal(existingMatch.expirationDate) || '');
      setNumberOfPlayers(existingMatch.numberOfPlayers || '');
    }
  }, [existingMatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !gameType || !location || !expirationDate || !numberOfPlayers) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (numberOfPlayers < 5 || numberOfPlayers > 22) {
      alert('El número de jugadores debe estar entre 5 y 22.');
      return;
    }

    if (new Date(expirationDate) <= new Date(creationDate)) {
      alert('La fecha de expiración debe ser posterior a la de creación.');
      return;
    }

    onAddMatch({
      id: existingMatch?.id,
      name,
      gameType,
      location,
      creationDate: new Date().toISOString(),
      expirationDate: new Date(expirationDate).toISOString(),
      numberOfPlayers: Number(numberOfPlayers),
    });

    setName('');
    setGameType('');
    setLocation('');
    setCreationDate('');
    setExpirationDate('');
    setNumberOfPlayers('');
  };

  return (
      <div className="add-match-form-overlay">
        <div className="add-match-form-container">
          <h2>{existingMatch ? 'Editar Partido' : 'Crear Nuevo Partido'}</h2>
          <form onSubmit={handleSubmit} data-testid="add-match-form">
            <div className="form-group">
              <label htmlFor="name">Nombre del Partido:</label>
              <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Partido Amistoso"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gameType">Tipo de Partido:</label>
              <select
                  id="gameType"
                  value={gameType}
                  onChange={(e) => setGameType(e.target.value)}
              >
                <option value="">Selecciona un tipo</option>
                <option value="Futbol 5">Futbol 5</option>
                <option value="Futbol 7">Futbol 7</option>
                <option value="Futbol 8">Futbol 8</option>
                <option value="Futbol 11">Futbol 11</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">Lugar:</label>
              <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ej: Cancha Sintética El Campín"
              />
            </div>

            <div className="form-group">
              <label htmlFor="expirationDate">Fecha de Expiración:</label>
              <input
                  type="datetime-local"
                  id="expirationDate"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="numberOfPlayers">Número de Jugadores:</label>
              <input
                  type="number"
                  id="numberOfPlayers"
                  value={numberOfPlayers}
                  onChange={(e) => setNumberOfPlayers(e.target.value)}
                  min={5}
                  max={22}
                  placeholder="Ej: 14"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-match-button">
                {existingMatch ? 'Guardar Cambios' : 'Agregar Partido'}
              </button>
              <button type="button" className="cancel-match-button" onClick={onCancel}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default AddMatchForm;
