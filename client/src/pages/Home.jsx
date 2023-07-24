import React from 'react';
import {Link} from 'react-router-dom';
import  Base  from './Base';
import { useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'



export function HomePage(){
    const ci = useSelector(state => state.profile.ci);
    console.log("El CI en Home es "+ ci)
    return (
        <Base>
            <h3 className="text-center mb-3" style={{ marginTop: '30px' }}>
                Universidad de Tecnología Experimental Yachay Tech
            </h3>
            <img src="/logo_saed.png" className="img-fluid" alt="Imagen centrada"
            style={{ width: '550px', height: 'auto' }} />
        </Base>       
    );
}



