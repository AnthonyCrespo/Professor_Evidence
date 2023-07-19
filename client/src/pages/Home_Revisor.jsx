import React from 'react';
import {Link} from 'react-router-dom';
import { Base_Revisor } from './Base_Revisor';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'



export function HomeRevisor(){
    return (
        <Base_Revisor >
            <h3 className="text-center mb-3" style={{ marginTop: '30px' }}>
                Universidad de Tecnología Experimental Yachay Tech
            </h3>
            <img src="/logo_saed.png" className="img-fluid" alt="Imagen centrada"
            style={{ width: '550px', height: 'auto' }} />
        </Base_Revisor >       
    );
}


