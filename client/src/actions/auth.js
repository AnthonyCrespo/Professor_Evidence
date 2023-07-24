import Cookies from 'js-cookie';
import axios from 'axios';
import { load_user } from './profile';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL
} from './types';


/* const accountsAPI = axios.create({
  baseURL: 'http://localhost:8000/accounts/'
}); */


export const login = (username, password) => async dispatch => {
  const config = {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken')
      }
  };

  const body = JSON.stringify({ username, password });

  try {
      const res = await axios.post('http://localhost:8000/accounts/login', body, config);

      if (res.data.success) {
          dispatch({
              type: LOGIN_SUCCESS
          });

          dispatch(load_user());
      } else {
          dispatch({
              type: LOGIN_FAIL
          });
      }
  } catch(err) {
      dispatch({
          type: LOGIN_FAIL
      });
  }
};


export const register = (username, password, re_password, first_name, last_name, ci) => async dispatch => {

    const csrfToken = Cookies.get('csrftoken');
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        }
    };

    const body = JSON.stringify({ username, password, re_password, first_name, last_name, ci });
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



  export const logout = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        'withCredentials': true
    });

    try {
        const res = await axios.post('http://localhost:8000/accounts/logout', body, config);

        if (res.data.success) {
            dispatch({
                type: LOGOUT_SUCCESS
            });
            console.log("LOGOUT CORRECTOOO!!")
        } else {
            dispatch({
                type: LOGOUT_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: LOGOUT_FAIL
        });
    }
};



export const checkAuthenticated = () => async dispatch => {
  const config = {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
  };

  try {
      const res = await axios.get('http://localhost:8000/accounts/authenticated', config);

      if (res.data.error || res.data.isAuthenticated === 'error') {
          dispatch({
              type: AUTHENTICATED_FAIL,
              payload: false
          });
      }
      else if (res.data.isAuthenticated === 'success') {
          dispatch({
              type: AUTHENTICATED_SUCCESS,
              payload: true
          });
      }
      else {
          dispatch({
              type: AUTHENTICATED_FAIL,
              payload: false
          });
      }
  } catch(err) {
      dispatch({
          type: AUTHENTICATED_FAIL,
          payload: false
      });
  }
};
