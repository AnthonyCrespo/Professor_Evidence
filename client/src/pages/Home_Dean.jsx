import React from 'react';
import Base_Dean from './Base_Dean';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import logo_saed from '../resources/logo_saed.png'
import { Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';



export function HomeDean(){

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (!isAuthenticated){
        console.log("El usuario no está autenticado.")
        return <Navigate to='/login' />;
      }
      
    return (
        <Base_Dean >
            <h3 className="text-center mb-3" style={{ marginTop: '30px' }}>
                Universidad de Tecnología Experimental Yachay Tech
            </h3>
            <img src={logo_saed} className="img-fluid" alt="Imagen centrada"
            style={{ width: '550px', height: 'auto' }} />
        </Base_Dean >       
    );
}


