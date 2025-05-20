import React from 'react';
import { FaArrowLeft, FaPlusCircle } from 'react-icons/fa';
import './HeaderJoin.css';

const HeaderJoin = ({ title, onBack }) => {
  return (
    <header className="header-join">
      <button className="back-button-join" onClick={onBack} aria-label="Volver">
        <FaArrowLeft />
      </button>
      <div className="header-join-title-container">
        <FaPlusCircle className="header-join-icon" />
        <h1 className="header-join-title-text">{title}</h1>
      </div>
    </header>
  );
};

export default HeaderJoin;