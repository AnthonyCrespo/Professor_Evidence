import React, { useState } from 'react';
import './css/Base.css';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export function Base_Revisor({ children }) {
  const [isRevisor, setIsRevisor] = useState(true);
  const navigate = useNavigate();

  // Función para cambiar entre el modo revisor y el modo normal
  const toggleRevisorMode = () => {
    setIsRevisor((prevState) => !prevState);
    navigate('/home');
  };

  return (
    <Container fluid>
      {/* ------------  navbar -------------  */}
      <Navbar className="SAED-navbar">
        <Container className="d-flex justify-content-between align-items-center">
          <a href="/home">
            {/* Agregar el href deseado */}
            <Navbar.Brand>
              <img src="/logo.png" alt="logo" width={230} />
            </Navbar.Brand>
          </a>
          <Nav>
            <NavDropdown title="NOMBRE APELLIDO" id="evidencias-dropdown">
              <NavDropdown.Item onClick={toggleRevisorMode}>
                  Cambiar a Docente
              </NavDropdown.Item>
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

                    <li className="nav-item mt-2">
                        <a className="nav-link px-2">
                        <i className='bi bi-file-text side-bar-icon '></i>
                        <span className='ms-1 d-none d-sm-inline side-bar-text'>
                            Evidencias
                        </span>
                        </a>
                        <ul className="nav flex-column ml-3">
                        <li className="nav-item">
                            <a className="nav-link" href="/registrar_evidencia" style={{color:"white"}}>
                            Revisar Evidencia
                            </a>
                        </li>
                        </ul>
                    </li>

                    {/* -------Informes option ------- */}
                    <li className="nav-item mt-2">
                        <a className="nav-link px-2">
                        <i className='bi bi-file-richtext side-bar-icon'></i>
                        <span className='ms-1 d-none d-sm-inline  side-bar-text'>
                            Informes
                        </span>
                        </a>
                        <ul className="nav flex-column ml-3">
                        <li className="nav-item  side-bar-text">
                            <a className="nav-link" href="/crear_informe" style={{color:"white"}}>
                            Revisar Informe
                            </a>
                        </li>
                        </ul>
                    </li>
                    </ul>
                </div>
                {/*------------- sidebar ends -------------*/}
        <div className="col d-flex flex-column align-items-center mt-3">{children}</div>
      </div>
    </Container>
  );
}