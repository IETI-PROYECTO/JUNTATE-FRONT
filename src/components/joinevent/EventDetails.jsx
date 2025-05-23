import React from 'react';
import './EventDetails.css';

const EventDetails = ({
  name,
  gameType,
  location,
  creationDate,
  expirationDate,
  numberOfPlayers,
  mapImage
}) => {
  return (
    <div className="event-details-card">
      <div className="event-detail-section">
        <p className="event-detail-label">Nombre:</p>
        <p className="event-detail-text">{name}</p>
      </div>
      <div className="event-detail-section">
        <p className="event-detail-label">Tipo de Partido:</p>
        <p className="event-detail-text">{gameType}</p>
      </div>
      <div className="event-detail-section">
        <p className="event-detail-label">Lugar:</p>
        <p className="event-detail-text">{location}</p>
      </div>
      <div className="event-detail-section">
        <p className="event-detail-label">Fecha de Creación:</p>
        <p className="event-detail-text">
          {creationDate ? new Date(creationDate).toLocaleString() : 'No especificado'}
        </p>
      </div>
      <div className="event-detail-section">
        <p className="event-detail-label">Fecha de Expiración:</p>
        <p className="event-detail-text">
          {expirationDate ? new Date(expirationDate).toLocaleString() : 'No especificado'}
        </p>
      </div>
      <div className="event-detail-section">
        <p className="event-detail-label">Número de Jugadores:</p>
        <p className="event-detail-text">{numberOfPlayers}</p>
      </div>
      <div className="event-map-container">
        <img
          src={mapImage || 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Map_placeholder.png'}
          alt="Mapa del evento"
          className="event-map-image"
        />
      </div>
    </div>
  );
};

export default EventDetails;
