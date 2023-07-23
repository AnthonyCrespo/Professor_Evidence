import Cookies from 'js-cookie';
import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import { useState } from 'react';

/* const accountsAPI = axios.create({
  baseURL: 'http://localhost:8000/accounts/'
}); */

export const register = (username, password, re_password) => async dispatch => {

    const csrfToken = Cookies.get('csrftoken');
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        }
    };

    const body = JSON.stringify({ username, password, re_password });
    try {
      console.log(csrfToken)
      const res = await axios.post('http://localhost:8000/accounts/register', body, config);
      
      if (res.data.error) {
        dispatch({
          type: REGISTER_FAIL
        });
        console.log(res.data.error)
      } else {
        dispatch({
          type: REGISTER_SUCCESS
        });
        console.log("EXITO1")
      }
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL
       
      })
      console.log(err);
    }
  };

