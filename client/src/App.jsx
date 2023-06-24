import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { TasksPage } from './pages/TaskPage'
import { TaskFormPage } from './pages/TaskFormPage'
import {Navigation} from './components/Navigation'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {


  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
      <Route path="/" element={<Navigate to="/tasks"/>}/>
        <Route path="/tasks" element={<TasksPage/>}/>
        <Route path="/tasks-create" element={<TaskFormPage/>}/>
        <Route path="/tasks/:id" element={<TaskFormPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
