import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function NotFound() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">¡Ups! La página que buscas no existe.</p>
      <Link to="/" className="notfound-link">Volver al inicio</Link>
    </div>
  );
}

export default NotFound;
