import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { TasksPage } from './pages/TaskPage'
import { TaskFormPage } from './pages/TaskFormPage'
import { LoginPage } from './pages/Login'
import { HomePage} from './pages/Home'
import { Register_evidence } from './pages/Register_evidence'
import {Navigation} from './components/Navigation'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Registered_evidences } from './pages/Registered_evidences'
import {Create_report} from './pages/Create_report'
import {Registered_reports} from './pages/Registered_reports'
function App() {


  return (
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
      <Route path="/login" element={<LoginPage/>}/>

      <Route path="/" element={<Navigate to="/login"/>}/>
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/registrar_evidencia" element={<Register_evidence/>}/>
      <Route path="/evidencias_registradas" element={<Registered_evidences/>}/>
      <Route path="/crear_informe" element={<Create_report/>}/>
      <Route path="/informes_registrados" element={<Registered_reports/>}/>
{/*       <Route path="/" element={<Navigate to="/tasks"/>}/>
        <Route path="/tasks" element={<TasksPage/>}/>
        <Route path="/tasks-create" element={<TaskFormPage/>}/>
        <Route path="/tasks/:id" element={<TaskFormPage/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
