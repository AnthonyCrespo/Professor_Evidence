import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
  const notFoundStyle = {
    textAlign: 'center',
    marginTop: '100px',
    fontSize: '48px',
    fontWeight: 'bold',
  };

  const buttonStyle = {
    display: 'inline-block',
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  return (
    <div style={notFoundStyle}>
      <h1>Error 404 - Página no encontrada</h1>
      <p>La página que estás buscando no se encontró.</p>
      <Link to="/" style={buttonStyle}>
        Back to Home
      </Link>
    </div>
  );
}
