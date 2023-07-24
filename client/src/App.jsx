import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import  {HomePage} from './pages/Home'
import { HomeRevisor} from './pages/Home_Revisor'
import { Register_evidence } from './pages/Register_evidence'
import {Navigation} from './components/Navigation'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Registered_evidences } from './pages/Registered_evidences'
import {Create_report} from './pages/Create_report'
import {Registered_reports} from './pages/Registered_reports'

import {Revisar_Evidence} from './pages/Revisar_Evidence'
import {Revisar_Report} from './pages/Revisar_Report'
import Register from './pages/Register';
import  LoginPage from './pages/Login'

import store from './store';
import ProtectedRoute from './hocs/privateRoute'
import axios from 'axios';
import {Provider} from 'react-redux';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";



function App() {
  return (
    <Provider store={store}>
        <BrowserRouter>
          <Routes>
          <Route exact path="/login" element={<LoginPage/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/" element={<Navigate to="/login"/>}/>

          <Route exact path="/home" element={<HomePage/>} />
          <Route exact path="/home_revisor" element={<HomeRevisor/>}/>
          <Route exact path="/registrar_evidencia" element={<Register_evidence/>}/>
          <Route exact path="/evidencias_registradas" element={<Registered_evidences/>}/>
          <Route exact path="/crear_informe" element={<Create_report/>}/>
          <Route exact path="/informes_registrados" element={<Registered_reports/>}/>
          <Route exact path="/revisar_informes" element={<Revisar_Evidence/>}/>
          <Route exact path="/revisar_reportes" element={<Revisar_Report/>}/>

{/*           <Route
            exact path="/home"
            element={
              <ProtectedRoute >
                {<HomePage/>}
              </ProtectedRoute>
            }
          />

          <Route 
          exact path="/home_revisor" 
          element={
            <ProtectedRoute >
              {<HomeRevisor/>}
            </ProtectedRoute>
          }
          />
          
          <Route 
        exact path="/registrar_evidencia" 
        element={
          <ProtectedRoute>
            {<Register_evidence />}
          </ProtectedRoute>
        }
          />

        <Route 
          exact path="/evidencias_registradas" 
          element={
            <ProtectedRoute>
              {<Registered_evidences />}
            </ProtectedRoute>
          }
        />

        <Route 
          exact path="/crear_informe" 
          element={
            <ProtectedRoute>
              {<Create_report />}
            </ProtectedRoute>
          }
        />

        <Route 
          exact path="/informes_registrados" 
          element={
            <ProtectedRoute>
              {<Registered_reports />}
            </ProtectedRoute>
          }
        />

        <Route 
          exact path="/revisar_informes" 
          element={
            <ProtectedRoute>
              {<Revisar_Evidence />}
            </ProtectedRoute>
          }
        />

        <Route 
          exact path="/revisar_reportes" 
          element={
            <ProtectedRoute>
              {<Revisar_Report />}
            </ProtectedRoute>
          }
        />*/}
          </Routes> 
        </BrowserRouter> 
    </Provider>
  )
}

export default App