import React, { useState } from 'react';
import './AddMatchForm.css';

const AddMatchForm = ({ onAddMatch, onCancel }) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !description || !location) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    onAddMatch({
      id: Date.now(), // ID simple basado en el tiempo actual
      date,
      description,
      location,
    });
    setDate('');
    setDescription('');
    setLocation('');
  };

  return (
    <div className="add-match-form-overlay">
      <div className="add-match-form-container">
        <h2>Crear Nuevo Partido</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Fecha y Hora:</label>
            <input
              type="text"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Ej: Lunes, 10 Junio, 8:00 pm"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: Partido 7 vs 7 Amistoso"
            />
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
          <div className="form-actions">
            <button type="submit" className="submit-match-button">Agregar Partido</button>
            <button type="button" className="cancel-match-button" onClick={onCancel}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMatchForm;