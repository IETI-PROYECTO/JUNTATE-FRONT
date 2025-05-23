import React from 'react';
import './MatchItem.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const MatchItem = ({ match, onJoin, onDeleteMatch, onEditMatch }) => {
  const formatDateTime = (iso) => (iso ? new Date(iso).toLocaleString() : '');

  return (
    <li className="match-item">
      <div className="match-info">
        <p><strong>Nombre del Partido:</strong> {match.name}</p>
        <p><strong>Tipo de Partido:</strong> {match.gameType}</p>
        <p><strong>Lugar:</strong> {match.location}</p>
        <p><strong>Fecha de Creación:</strong> {formatDateTime(match.creationDate)}</p>
        <p><strong>Fecha de Expiración:</strong> {formatDateTime(match.expirationDate)}</p>
        <p><strong>Número de Jugadores:</strong> {match.numberOfPlayers}</p>
      </div>
      <div className="match-item-actions">
        <button className="join-button" onClick={() => onJoin(match.id)} aria-label="Unirse">+</button>
        <button className="edit-match-button" onClick={() => onEditMatch(match)} aria-label="Editar"><FaEdit /></button>
        <button className="delete-match-button" onClick={() => onDeleteMatch(match.id)} aria-label="Eliminar"><FaTrash /></button>
      </div>
    </li>
  );
};

export default MatchItem;
