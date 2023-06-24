/* import {TaskList} from '../components/TaskList' */

import React from 'react';
import './css/Home.css'; // Archivo CSS para estilos personalizados
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function HomePage(){
    return (
        <div>
        <Navbar className="SAED-navbar">
          <Container>
            <Navbar.Brand href="/home">
                <img
                src="/logo.png"
                alt="logo"
                width={250}


                />  
            </Navbar.Brand>
            <Nav className="ms-auto">
              <Nav.Link  className="navbar-text" href="#home"> USUARIO APELLIDO</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
  );
}
