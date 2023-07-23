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

import {Provider} from 'react-redux';
import store from './store';
//import PrivateRoute from './hocs/privateRoute'
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";



function App() {
  return (
    <Provider store={store}>
        <BrowserRouter>
          {/* <Navigation/> */}
          <Routes>
          <Route exact path="/login" element={<LoginPage/>}/>
          <Route exact path="/register" element={<Register/>}/>

          <Route exact path="/" element={<Navigate to="/login"/>}/>
          <Route exact path="/home" element={<HomePage/>} />
          <Route exact path="/home_revisor" element={<HomeRevisor/>}/>
          <Route exact path="/registrar_evidencia" element={<Register_evidence/>}/>
          <Route exact path="/crear_informe" element={<Create_report/>}/>
          <Route exact path="/informes_registrados" element={<Registered_reports/>}/>
          <Route exact path="/revisar_informes" element={<Revisar_Evidence/>}/>
          <Route exact path="/revisar_reportes" element={<Revisar_Report/>}/>
          </Routes>
        </BrowserRouter>
    </Provider>
  )
}

export default App
