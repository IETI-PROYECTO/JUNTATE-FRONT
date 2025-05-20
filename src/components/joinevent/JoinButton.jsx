import React from 'react';
import './JoinButton.css';

const JoinButton = ({ onPress }) => {
  return (
    <div className="join-button-container">
      <button className="join-event-button" onClick={onPress}>
        UNIRSE
      </button>
    </div>
  );
};

export default JoinButton;