import React from 'react';
import './MatchItem.css';
import { FaTrash } from 'react-icons/fa';

const MatchItem = ({ match, onJoin, onDeleteMatch }) => {
  return (
    <li className="match-item">
      <div className="match-info">
        <p className="match-date">{match.date}</p>
        <p className="match-description">{match.description}</p>
        <p className="match-location">{match.location}</p>
      </div>
      <div className="match-item-actions">
        <button
          className="join-button"
          onClick={() => onJoin(match.id)}
          aria-label="Unirse al partido"
        >
          +
        </button>
        <button
          className="delete-match-button"
          onClick={() => onDeleteMatch(match.id)}
          aria-label="Borrar partido"
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default MatchItem;