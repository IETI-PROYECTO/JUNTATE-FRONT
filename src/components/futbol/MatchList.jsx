import React from 'react';
import MatchItem from './MatchItem';
import './MatchList.css';

const MatchList = ({ matches, onJoinMatch, onDeleteMatch }) => {
  if (!matches || matches.length === 0) {
    return <p className="no-matches-message">No hay partidos disponibles.</p>;
  }

  return (
    <ul className="match-list">
      {matches.map(match => (
        <MatchItem
          key={match.id}
          match={match}
          onJoin={onJoinMatch}
          onDeleteMatch={onDeleteMatch}
        />
      ))}
    </ul>
  );
};

export default MatchList;