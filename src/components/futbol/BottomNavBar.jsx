import React, { useState } from 'react';
import { FaBell, FaCalendarAlt, FaFutbol, FaCoins, FaUser, FaHome } from 'react-icons/fa';
import './BottomNavBar.css';

const BottomNavBar = ({ onNavigate }) => {
    const [activeItem, setActiveItem] = useState('futbol');

    const handleNavItemClick = (itemName, screenName) => {
        setActiveItem(itemName);
        if (onNavigate && screenName) {
            onNavigate(screenName);
        }
    };

    return (
        <nav className="bottom-nav-bar">
            <button
                className={`nav-item ${activeItem === 'home' ? 'active' : ''}`}
                onClick={() => handleNavItemClick('home', 'selection')}
                aria-label="Inicio/Deportes"
            >
                <FaHome />
            </button>
            <button
                className={`nav-item ${activeItem === 'notificaciones' ? 'active' : ''}`}
                onClick={() => handleNavItemClick('notificaciones', null)} // Sin pantalla aún
                aria-label="Notificaciones"
            >
                <FaBell />
            </button>
            <button
                className={`nav-item ${activeItem === 'calendario' ? 'active' : ''}`}
                onClick={() => handleNavItemClick('calendario', null)} // Sin pantalla aún
                aria-label="Calendario"
            >
                <FaCalendarAlt />
            </button>
            <button
                className={`nav-item ${activeItem === 'futbol' ? 'active' : ''}`}
                onClick={() => handleNavItemClick('futbol', 'futbol')}
                aria-label="Fútbol"
            >
                <FaFutbol />
            </button>
            <button
                className={`nav-item ${activeItem === 'monedas' ? 'active' : ''}`}
                onClick={() => handleNavItemClick('monedas', null)} // Sin pantalla aún
                aria-label="Monedas"
            >
                <FaCoins />
            </button>
            <button
                className={`nav-item ${activeItem === 'perfil' ? 'active' : ''}`}
                onClick={() => handleNavItemClick('perfil', 'perfil')}
                aria-label="Perfil"
            >
                <FaUser />
            </button>
        </nav>
    );
};

export default BottomNavBar;
