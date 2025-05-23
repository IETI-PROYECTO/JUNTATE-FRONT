import React from 'react';
import { FaArrowLeft, FaUserCircle } from 'react-icons/fa';
import './ProfileHeader.css';

const ProfileHeader = ({ title, onBack }) => {
  return (
    <header className="profile-screen-header">
      <button className="profile-back-button" onClick={onBack} aria-label="Volver">
        <FaArrowLeft />
      </button>
      <div className="profile-header-title-container">
        <div className="profile-header-icon-wrapper">
          <FaUserCircle className="profile-header-icon" />
        </div>
        <h1 className="profile-header-title-text">{title}</h1>
      </div>
    </header>
  );
};

export default ProfileHeader;