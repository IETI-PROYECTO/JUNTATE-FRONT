import React from 'react';
import { FaArrowLeft, FaFutbol } from 'react-icons/fa';
import './Header.css';

const Header = ({ title, onBack }) => {
  return (
    <header className="header">
      <button className="back-button" onClick={onBack} aria-label="Volver">
        <FaArrowLeft />
      </button>
      <div className="logo-container">
        <FaFutbol className="soccer-icon" />
      </div>
      <h1 className="header-title">{title}</h1>
    </header>
  );
};

export default Header;