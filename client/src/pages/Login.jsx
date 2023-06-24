/* import {TaskList} from '../components/TaskList' */

import React from 'react';
import './css/Login.css'; // Archivo CSS para estilos personalizados
import {Link} from 'react-router-dom';

export function LoginPage(){


  
    return (
    <div className="login-container">
    <header>
      <title>Iniciar Sesión</title>
    </header>
      <div className="login-box">
        <h2>Iniciar sesión</h2>
        <input type="text" placeholder="Usuario" />
        <input type="password" placeholder="Contraseña" />
        <Link to="/home">
          <button>Ingresar</button>
        </Link>
      </div>
    </div>
  );
}
