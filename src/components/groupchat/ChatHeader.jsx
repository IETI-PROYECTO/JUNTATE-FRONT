import React from 'react';
import { FaArrowLeft, FaUsers } from 'react-icons/fa';
import './ChatHeader.css';

const ChatHeader = ({ title, onBack }) => {
  return (
    <header className="chat-header">
      <button className="chat-back-button" onClick={onBack} aria-label="Volver">
        <FaArrowLeft />
      </button>
      <div className="chat-header-title-container">
        <div className="chat-group-icon-wrapper">
          <FaUsers className="chat-group-icon" />
        </div>
        <h1 className="chat-header-title-text">{title}</h1>
      </div>
    </header>
  );
};

export default ChatHeader;