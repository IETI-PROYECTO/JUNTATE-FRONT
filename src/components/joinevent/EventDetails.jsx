import React from 'react';
import './EventDetails.css';

const EventDetails = ({ description, location, mapImage }) => {
  return (
    <div className="event-details-card">
      <div className="event-description-section">
        <p className="event-detail-label">Descripción:</p>
        <p className="event-detail-text">{description}</p>
      </div>
      <div className="event-location-section">
        <p className="event-detail-label">Lugar:</p>
        <p className="event-detail-text">{location}</p>
      </div>
      <div className="event-map-container">
        <img src="" alt="Mapa del evento" className="event-map-image" />
      </div>
    </div>
  );
};

export default EventDetails;