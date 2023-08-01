import React, { useState, useEffect } from 'react';
import './css/Base.css';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { connect } from 'react-redux';
import { checkAuthenticated } from '../actions/auth';
import { load_user } from '../actions/profile';
import { logout } from '../actions/auth';
import { useSelector } from 'react-redux';
import { getProfessors } from '../api/task.api';

import logo from '../resources/logo.png'

const Base_Revisor = ({ children, checkAuthenticated, logout, load_user}) => {
  const ci = useSelector(state => state.profile.ci);
  const name = useSelector(state => state.profile.first_name);
  const lastname = useSelector(state => state.profile.last_name);
  const [isRevisor, setIsRevisor] = useState(true);
  const [isDean, setIsDean] = useState(null);
  const navigate = useNavigate();

  /* ------------ Load professor revisor state ------------------------ */
  useEffect(() => {
    // Verificar que 'ci' tenga un valor válido antes de llamar a 'loadProfessorRole()'
    if (ci) {
      async function loadProfessorRole() {
        const res = await getProfessors();
        const professor = res.data.find(professor => professor.professor_id === ci);
        if (professor) {
          setIsDean(professor.isDean);  // Cambiar 'profesorEspecifico.isRevisor' a 'profesor.isRevisor'
          //console.log(professor.isRevisor);
        } else {
          console.log('Profesor no encontrado');
        }
      }
      loadProfessorRole();
    }
  }, [ci]); // Agregar 'ci' como dependencia

  // Función para cambiar entre el modo revisor y el modo normal
  const toggleProfessorMode = () => {
    navigate('/home');
  };

  const toggleDeanMode = () => {
    setIsDean((prevState) => !prevState);
    navigate('/home_decano');
  };

  useEffect(() => {
    checkAuthenticated();
    load_user();
}, []);


  return (
    <Container fluid>
      {/* ------------  navbar -------------  */}
      <Navbar className="SAED-navbar">
        <Container className="d-flex justify-content-between align-items-center">
        <Link to="/home_revisor">
              <Navbar.Brand>
                <img src={logo} alt="logo" width={230} />
              </Navbar.Brand>
            </Link>
          <Nav>
          <NavDropdown title={name+" "+lastname} id="evidencias-dropdown">
              <NavDropdown.Item onClick={toggleProfessorMode}>
                  Cambiar a Docente
              </NavDropdown.Item>
              
              {isDean && (
              <NavDropdown.Item onClick={toggleDeanMode}>
                    Cambiar a Decano
                  </NavDropdown.Item>
              )}

              <NavDropdown.Item onClick={logout} href="/login">Cerrar Sesion</NavDropdown.Item>
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
                          <Link to="/revisar_evidencias" className="nav-link" style={{ color: 'white' }}>
                          Revisar Evidencia
                          </Link>
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
                        <li className="nav-item">
                          <Link to="/revisar_reportes" className="nav-link" style={{ color: 'white' }}>
                          Revisar Informe
                          </Link>
                        </li>

                        </ul>
                    </li>
                    </ul>
                </div>
                {/*------------- sidebar ends -------------*/}
        <div className="col d-flex flex-column align-items-center mt-3" style={{ overflowX: "auto" }}>{children}</div>
      </div>
    </Container>
  );
}



export default connect(null, { logout, checkAuthenticated, load_user})(Base_Revisor);
