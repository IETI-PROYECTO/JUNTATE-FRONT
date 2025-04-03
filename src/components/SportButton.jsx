import React from 'react';
import './SportButton.css';

const SportButton = ({ icon, name, onClick }) => {
  return (
    <button className="sport-button" onClick={onClick}>
      <div className="sport-icon">{icon}</div>
      <div className="sport-name">{name}</div>
    </button>
  );
};

export default SportButton;
