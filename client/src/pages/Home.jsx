/* import {TaskList} from '../components/TaskList' */

import React from 'react';
import './css/Home.css'; // Archivo CSS para estilos personalizados
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'



export function HomePage(){
    return (

        <div>
            {/* ------------  navbar -------------  */}
            <Navbar className="SAED-navbar">
                <Container className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand className="me-auto">
                        <img src="/logo.png" alt="logo" width={230} />
                    </Navbar.Brand>

                    <Nav>
                    <NavDropdown title="NOMBRE APELLIDO" id="evidencias-dropdown">
                        <NavDropdown.Item href="/login">Cerrar Sesion</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>


            {/* -----------  navbar end -------------  */}



            {/*------------- sidebar -------------*/}
            <div className='row'>
                <div className="col-auto min-vh-100" style={{backgroundColor:"RGB(39, 39, 39)"}}>
                    <ul className="nav flex-column mt-3">

                    {/* -------Home option ------- */}
                    <li className="nav-item mt-2">
                        <a className="nav-link px-2" href="/home">
                        <i className='bi bi-house side-bar-icon'></i>
                        <span className='ms-1 d-none d-sm-inline  side-bar-text'>
                            Home
                        </span>
                        </a>
                    </li>
                    
                    {/* -------Evidencias option ------- */}

                    <li className="nav-item mt-2">
                        <a className="nav-link px-2">
                        <i className='bi bi-file-text side-bar-icon '></i>
                        <span className='ms-1 d-none d-sm-inline side-bar-text'>
                            Evidencias
                        </span>
                        </a>
                        <ul className="nav flex-column ml-3">
                        <li className="nav-item">
                            <a className="nav-link" href="/evidencia1" style={{color:"white"}}>
                            Registrar Evidencia
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="/evidencia2" style={{color:"white"}}>
                            Evidencia Registrada
                            </a>
                        </li>
                        </ul>
                    </li>

                    {/* -------Informes option ------- */}
                    <li className="nav-item mt-2">
                        <a className="nav-link px-2" href="/">
                        <i className='bi bi-file-richtext side-bar-icon'></i>
                        <span className='ms-1 d-none d-sm-inline  side-bar-text'>
                            Informes
                        </span>
                        </a>
                        <ul className="nav flex-column ml-3">
                        <li className="nav-item  side-bar-text">
                            <a className="nav-link" href="/informe1" style={{color:"white"}}>
                            Crear Informe
                            </a>
                        </li>
                        <li className="nav-item  side-bar-text">
                            <a className="nav-link" href="/informe2" style={{color:"white"}}>
                            Observar Informe
                            </a>
                        </li>
                        </ul>
                    </li>
                    </ul>
                </div>
                {/*------------- sidebar ends -------------*/}
                <div className="col d-flex flex-column align-items-center mt-3">
                    <h3 className="text-center mb-3" style={{ marginTop: '30px' }}>
                        Universidad de Tecnología Experimental Yachay Tech
                    </h3>
                    <img src="/logo_saed.png" className="img-fluid" alt="Imagen centrada"
                    style={{ width: '550px', height: 'auto' }} />
                </div>
            </div>
            
        </div>

  );
}



