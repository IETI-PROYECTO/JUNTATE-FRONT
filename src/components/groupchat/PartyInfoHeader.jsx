import React from 'react';
import './PartyInfoHeader.css';

const PartyInfoHeader = ({ partyName, participants }) => {
  return (
    <div className="party-info-header">
      <h2 className="party-name">{partyName}</h2>
      <p className="party-participants">
        {participants.join(', ')}
      </p>
    </div>
  );
};

export default PartyInfoHeader;