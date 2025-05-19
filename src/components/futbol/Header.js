import React from 'react';
import './Header.css'; 
import { FaArrowLeft, FaFutbol } from 'react-icons/fa';

function Header({ title }) {
  return (
    <header className="header">
      <button className="back-button" aria-label="Volver">
        <FaArrowLeft />
      </button>
      <div className="logo-container">
        <FaFutbol className="soccer-icon" />
      </div>
      <h1 className="header-title">{title}</h1>
    </header>
  );
}

export default Header;