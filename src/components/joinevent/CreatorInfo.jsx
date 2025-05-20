import React from 'react';
import './CreatorInfo.css';

const CreatorInfo = ({ name, age, players, abandoned, imageUrl }) => {
  return (
    <div className="creator-info-card">
      <div className="creator-image-container">
        <img src={imageUrl} alt={name} className="creator-image" />
      </div>
      <div className="creator-details">
        <p className="creator-section-title">CREADOR DEL PARTIDO</p>
        <p>NOMBRE: {name}</p>
        <p>EDAD: {age}</p>
        <p>JUGADORES: {players}</p>
        <p>ABANDONADOS: {abandoned}</p>
      </div>
    </div>
  );
};

export default CreatorInfo;