import React from 'react';
import './InfoBoxes.css'; // Archivo CSS para estilos de InfoBoxes

function InfoBoxes({ jugadores, abandonados }) {
  return (
    <div className="info-boxes-container">
      <div className="info-box jugadores">
        JUGADOS: {jugadores}
      </div>
      <div className="info-box abandonados">
        ABANDONADOS: {abandonados}
      </div>
    </div>
  );
}

export default InfoBoxes;