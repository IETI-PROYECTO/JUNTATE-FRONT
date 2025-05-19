import React from 'react';
import './MatchItem.css';

function MatchItem({ date, description, location, onJoin }) {
  return (
    <li className="match-item">
      <div className="match-info">
        <p className="match-date">{date}</p>
        <p className="match-description">{description}</p>
        <p className="match-location">{location}</p>
      </div>
      <button className="join-button" onClick={onJoin} aria-label="Unirse al partido">
        +
      </button>
    </li>
  );
}

export default MatchItem;