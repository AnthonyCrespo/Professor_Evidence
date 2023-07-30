import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions/auth';
import CSRFToken from '../components/CSRFToken';
import { checkAuthenticated } from '../actions/auth';

const Register = ({ register, checkAuthenticated, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    re_password: '',
    first_name: '',
    last_name: '',
    ci: ''
  });

  const [accountCreated, setAccountCreated] = useState(false);
  const { username, password, re_password, first_name, last_name, ci } = formData;

  useEffect(() => {
    checkAuthenticated();
  }, []);

  
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value.toString() });

  const onSubmit = e => {
      e.preventDefault();

      if (password === re_password) {
          register(username, password, re_password, first_name, last_name, ci);
          setAccountCreated(true);
      }
  };
  if (isAuthenticated)
      return <Navigate to='/home' />;

  else if (accountCreated)
    return <Navigate to='/login' />;

  return (
    <div className='container mt-5'>
      <h1>Registrar una nueva cuenta</h1>
      <form onSubmit={e => onSubmit(e)}>
        <CSRFToken/>
        <div className='form-group'>
          <label className='form-label'>Nombre: </label>
          <input
            className='form-control'
            type='text'
            placeholder='Nombre*'
            name='first_name'
            onChange={e => onChange(e)}
            value={first_name}
            required
          />
        </div>

        <div className='form-group'>
          <label className='form-label'>Apellido: </label>
          <input
            className='form-control'
            type='text'
            placeholder='Apellido*'
            name='last_name'
            onChange={e => onChange(e)}
            value={last_name}
            required
          />
        </div>

        
        <div className='form-group'>
          <label className='form-label'>Cédula de Identidad/Pasaporte: </label>
          <input
            className='form-control'
            type='text'
            placeholder='Cédula de Identidad/Pasaporte*'
            name='ci'
            onChange={e => onChange(e)}
            value={ci}
            required
          />
        </div>

        <div className='form-group'>
          <label className='form-label'>Nombre de Usuario: </label>
          <input
            className='form-control'
            type='text'
            placeholder='Nombre de Usuario*'
            name='username'
            onChange={e => onChange(e)}
            value={username}
            required
          />
        </div>
        <div className='form-group'>
          <label className='form-label mt-3'>Contraseña: </label>
          <input
            className='form-control'
            type='password'
            placeholder='Contraseña*'
            name='password'
            onChange={e => onChange(e)}
            value={password}
            minLength='6'
            required
          />
        </div>
        <div className='form-group'>
          <label className='form-label mt-3'>Confirmar Contraseña: </label>
          <input
            className='form-control'
            type='password'
            placeholder='Confirmar Contraseña*'
            name='re_password'
            onChange={e => onChange(e)}
            value={re_password}
            minLength='6'
            required
          />
        </div>
        <button className='btn btn-primary mt-3' type='submit'>Registrarse</button>
      </form>
      <p className='mt-3'>
        Ya tienes una cuenta? <Link to='/login'>Iniciar Sesión</Link>
      </p>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { checkAuthenticated, register })(Register);