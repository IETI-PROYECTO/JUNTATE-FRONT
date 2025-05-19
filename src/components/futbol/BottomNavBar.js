import React, { useState } from 'react';
import './BottomNavBar.css'; // Archivo CSS para estilos de BottomNavBar
// Asume que tienes íconos para cada item (puedes usar react-icons)
import { FaBell, FaCalendarAlt, FaFutbol, FaCoins, FaUser } from 'react-icons/fa';

function BottomNavBar() {
  const [activeItem, setActiveItem] = useState('futbol'); // 'futbol' como item activo por defecto

  const handleNavItemClick = (itemName) => {
    setActiveItem(itemName);
    // Aquí puedes agregar lógica de navegación si usas React Router
    console.log(`${itemName} clickeado`);
  };

  return (
    <nav className="bottom-nav-bar">
      <NavItem
        icon={<FaBell />}
        label="Notificaciones"
        isActive={activeItem === 'notificaciones'}
        onClick={() => handleNavItemClick('notificaciones')}
      />
      <NavItem
        icon={<FaCalendarAlt />}
        label="Calendario"
        isActive={activeItem === 'calendario'}
        onClick={() => handleNavItemClick('calendario')}
      />
      <NavItem
        icon={<FaFutbol />}
        label="Fútbol"
        isActive={activeItem === 'futbol'}
        onClick={() => handleNavItemClick('futbol')}
      />
      <NavItem
        icon={<FaCoins />} // Ícono de ejemplo, ajusta según necesidad
        label="Monedas" // Texto de ejemplo
        isActive={activeItem === 'monedas'}
        onClick={() => handleNavItemClick('monedas')}
      />
      <NavItem
        icon={<FaUser />}
        label="Perfil"
        isActive={activeItem === 'perfil'}
        onClick={() => handleNavItemClick('perfil')}
      />
    </nav>
  );
}

// Sub-componente para los ítems de navegación
function NavItem({ icon, label, isActive, onClick }) {
  return (
    <button
      className={`nav-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
      aria-label={label}
    >
      <div className="nav-item-icon">{icon}</div>
      {/* Opcionalmente, podrías mostrar el label si el diseño lo requiere */}
      {/* <span className="nav-item-label">{label}</span> */}
    </button>
  );
}

export default BottomNavBar;