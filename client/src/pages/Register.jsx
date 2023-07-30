import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register as register_user} from '../actions/auth';
import CSRFToken from '../components/CSRFToken';
import { checkAuthenticated } from '../actions/auth';
import './css/Register.css'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  first_name: yup.string().required('Este campo es obligatorio'),
  last_name: yup.string().required('Este campo es obligatorio'),
  ci: yup.string().required('Este campo es obligatorio'),
  username: yup.string().required('Este campo es obligatorio'),
  password: yup
    .string()
    .required('Por favor ingresa una constraseñ.')
    .min(6, 'Tu contraseña es muy corta'),
  re_password: yup
    .string()
    .required('Por favor, ingresa nuevamente tu contraseña.')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden.')
});



const Register = ({ register_user, checkAuthenticated, isAuthenticated}) => {
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

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    if (data.password === data.re_password) {
      register_user(data.username, data.password, data.re_password, data.first_name, data.last_name, data.ci);
        setAccountCreated(true);
      }
    });

  if (isAuthenticated)
      return <Navigate to='/home' />;

  else if (accountCreated)
    return <Navigate to='/login' />;

    return (
      <div className='register-container'>
        <div className="login-box">
        <h2>Registrar una nueva cuenta</h2>
        <form onSubmit={onSubmit}>
          <CSRFToken/>
          <div className='form-group'>
           {/*  <label className='form-label'>Nombre: </label> */}
            <input
              className='form-control'
              type='text'
              placeholder='Nombre'
              name='first_name'
              onChange={(e) => {
                setValue('first_name', e.target.value);
                setFormData(prevForm => ({
                  ...prevForm,
                  first_name: e.target.value
                }));
              }}
              //value={first_name}
              //required
              {...register("first_name")}
            />
              {errors.first_name && (
                <span className="text-danger">{errors.first_name.message}</span>
              )}
          </div>
    
          <div className='form-group'>
           {/*  <label className='form-label'>Nombre: </label> */}
            <input
              className='form-control'
              type='text'
              placeholder='Apellido'
              name='last_name'
              onChange={(e) => {
                setValue('last_name', e.target.value);
                setFormData(prevForm => ({
                  ...prevForm,
                  last_name: e.target.value
                }));
              }}
              //value={last_name}
              //required
              {...register("last_name")}
            />
              {errors.last_name && (
                <span className="text-danger">{errors.last_name.message}</span>
              )}
          </div>
    
          <div className='form-group'>
           {/*  <label className='form-label'>Nombre: </label> */}
            <input
              className='form-control'
              type='text'
              placeholder='Cédula de Identidad/Pasaporte'
              name='ci'
              onChange={(e) => {
                setValue('ci', e.target.value);
                setFormData(prevForm => ({
                  ...prevForm,
                  ci: e.target.value
                }));
              }}
              //value={ci}
              //required
              {...register("ci")}
            />
              {errors.ci && (
                <span className="text-danger">{errors.ci.message}</span>
              )}
          </div>
    
          <div className='form-group'>
            <input
              className='form-control'
              type='text'
              placeholder='Nombre de Usuario'
              name='username'
              onChange={(e) => {
                setValue('username', e.target.value);
                setFormData(prevForm => ({
                  ...prevForm,
                  username: e.target.value
                }));
              }}
              //value={username}
              //required
              {...register("username")}
            />
              {errors.username && (
                <span className="text-danger">{errors.username.message}</span>
              )}
          </div>
          <div className='form-group'>
           {/*  <label className='form-label'>Nombre: </label> */}
            <input
              className='form-control'
              type="password"
              placeholder='Contraseña'
              name='password'
              
              onChange={(e) => {
                setValue('password', e.target.value);
                setFormData(prevForm => ({
                  ...prevForm,
                  password: e.target.value
                }));
              }}
              //value={password}
              //required
              {...register("password")}
            />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
          </div>
    
          <div className='form-group'>
           {/*  <label className='form-label'>Nombre: </label> */}
            <input
              className='form-control'
              type="password"
              placeholder='Confirmar Contraseña'
              name='re_password'
              onChange={(e) => {
                setValue('re_password', e.target.value);
                setFormData(prevForm => ({
                  ...prevForm,
                  re_password: e.target.value
                }));
              }}
              //value={re_password}
              //required
              {...register("re_password")}
            />
              {errors.re_password && (
                <span className="text-danger">{errors.re_password.message}</span>
              )}
          </div>
    
          <button className='btn btn-primary mt-3' type='submit'>Registrarse</button>
        </form>
        </div>
        <p className='mt-3'>
          Ya tienes una cuenta? <Link to='/login'>Iniciar Sesión</Link>
        </p>
      </div>
    );
    
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { checkAuthenticated, register_user })(Register);