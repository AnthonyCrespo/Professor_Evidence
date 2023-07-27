/* import {TaskList} from '../components/TaskList' */
import React, { useState, useEffect } from 'react';
import './css/Login.css'; // Archivo CSS para estilos personalizados
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import CSRFToken from '../components/CSRFToken';
import { checkAuthenticated } from '../actions/auth';
import './css/Login.css'


const LoginPage = ({ login, checkAuthenticated,  isAuthenticated}) => {
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const { username, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result === 'success') {
    }
    else
      setErrorMessage('Credenciales incorrectas');
  };
  
    if (isAuthenticated){
      console.log("Ya cambio a isAuthenticated")
      return <Navigate to='/home' />;
    }
    return (
    <div className="login-container">
    <header>
      <title>Iniciar Sesión</title>
    </header>
      <div className="login-box">
        <h2>Iniciar sesión</h2>
          <form onSubmit={e => onSubmit(e)}>
          <CSRFToken />
            <div className='form-group'>
              <input
                          className='form-control'
                          type='text'
                          placeholder='Usuario'
                          name='username'
                          onChange={e => onChange(e)}
                          value={username}
                          required
                      />
            </div>

            <div className='form-group'>
              <input
                        className='form-control'
                        type='password'
                        placeholder='Contraseña'
                        name='password'
                        onChange={e => onChange(e)}
                        value={password}
                        minLength='6'
                        required
                      />
               {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </div>
            <button className='btn btn-primary mt-3' type='submit'> Ingresar </button>
          </form>

      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {checkAuthenticated, login })(LoginPage);