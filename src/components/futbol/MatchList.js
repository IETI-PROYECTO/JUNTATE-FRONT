import React from 'react';
import MatchItem from './MatchItem';
import './MatchList.css'; // Archivo CSS para estilos de MatchList

function MatchList({ matches, onJoinMatch }) {
  if (!matches || matches.length === 0) {
    return <p className="no-matches-message">No hay partidos disponibles.</p>;
  }

  return (
    <ul className="match-list">
      {matches.map(match => (
        <MatchItem
          key={match.id}
          date={match.date}
          description={match.description}
          location={match.location}
          onJoin={() => onJoinMatch(match.id)}
        />
      ))}
    </ul>
  );
}

export default MatchList;