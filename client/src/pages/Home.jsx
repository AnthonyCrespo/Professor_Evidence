/* import {TaskList} from '../components/TaskList' */

import React from 'react';
import './css/Home.css'; // Archivo CSS para estilos personalizados
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'



export function HomePage(){
    return (

        <div>

        {/* navbar  */}
        <Navbar className="SAED-navbar">
          <Container>
            <Navbar.Brand href="/home">
                <img
                src="/logo.png"
                alt="logo"
                width={230}
                />  
            </Navbar.Brand>
            <Nav className="ms-auto">
              <Nav.Link  className="navbar-text" href="#home"> USUARIO APELLIDO</Nav.Link>
            </Nav>
          </Container>
        </Navbar>



        {/* sidebar */}
{/*         <div className="sidebar">
          <Nav.Link href="#opcion1">Opción 1</Nav.Link>
          <Nav.Link href="#opcion2">Opción 2</Nav.Link>
          <Nav.Link href="#opcion3">Opción 3</Nav.Link>
          <Nav.Link href="#opcion4">Opción 4</Nav.Link>
        </div> */}

        <div className='row'>
                <div className="col-auto min-vh-100" style={{backgroundColor:"RGB(59, 59, 59)"}}>
                    <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link px-2" href="/home">
                        {/* <i className='bi bi-house'></i> */}
                        <span className='ms-1 d-none d-sm-inline side-bar-text '>
                            Evidencias
                        </span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link px-2" href="/home">
                        {/* <i className='bi bi-house'></i> */}
                        <span className='ms-1 d-none d-sm-inline side-bar-text '>
                            Informes
                        </span>
                        </a>
                    </li>
                    </ul>
                </div>
        </div>
    </div>

  );
}



