import React from 'react';
import  Base  from './Base';
import { useSelector } from 'react-redux';
import { Navigate} from 'react-router-dom';
import logo_saed from '../resources/logo_saed.png'
import 'bootstrap-icons/font/bootstrap-icons.css'
export function HomePage(){
    
    const ci = useSelector(state => state.profile.ci);
    //console.log("El CI en Home es "+ ci)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    //console.log("El valor de isAuthenticated es "+ isAuthenticated)
    if (!isAuthenticated){
        console.log("El usuario no está autenticado.")
        return <Navigate to='/login' />;
      }
    return  (
        <Base>
            <h3 className="text-center mb-3" style={{ marginTop: '30px' }}>
                Universidad de Tecnología Experimental Yachay Tech
            </h3>
            <img src={ logo_saed } className="img-fluid" alt="Imagen centrada"
            style={{ width: '550px', height: 'auto' }} />
        </Base>       
    );
}



