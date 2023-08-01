/* import {TaskList} from '../components/TaskList' */
import React, { useState, useEffect } from 'react';
import './css/Login.css'; // Archivo CSS para estilos personalizados
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import CSRFToken from '../components/CSRFToken';
import { checkAuthenticated } from '../actions/auth';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import './css/Login.css'

const schema = yup.object().shape({
  username: yup.string().required('Este campo es obligatorio'),
  password: yup.string().required('Este campo es obligatorio'),
});

const LoginPage = ({ login, checkAuthenticated,  isAuthenticated}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues
  } = useForm({
    resolver: yupResolver(schema),
  });



  useEffect(() => {
    checkAuthenticated();
  }, []);

  const { username, password } = formData;


  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    //preventDefault();
    const result = await login(data.username, data.password);
    if (result === 'success') {
    }
    else
      setErrorMessage('Las credenciales ingresadas son incorrectas.');
  });
  
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
          <form onSubmit={onSubmit}>
            <CSRFToken />
            <div className='form-group'>
              <input
                className='form-control'
                type='text'
                placeholder='Usuario'
                name='username'
                onChange={(e) => {
                  setValue('username', e.target.value);
                  setFormData(prevForm => ({
                    ...prevForm,
                    username: e.target.value
                  }));
                }}
                {...register("username")}
              />
              {errors.username && (
                <span className="text-danger">{errors.username.message}</span>
              )}
            </div>
    
            <div className='form-group'>
              <input
                className='form-control'
                type='password'
                placeholder='Contraseña'
                name='password'
                onChange={(e) => {
                  setValue('password', e.target.value);
                  setFormData(prevForm => ({
                    ...prevForm,
                    password: e.target.value
                  }));
                }}
                {...register("password")}
              />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <button className='btn btn-primary mt-3' type='submit'>Ingresar</button>
          </form>
        </div>
{/*         <p className='mt-3'>
          No tienes una cuenta? <Link to='/register'>Regístrate</Link>
        </p> */}
      </div>
    );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {checkAuthenticated, login })(LoginPage);