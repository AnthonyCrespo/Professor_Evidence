import React, { useState, useEffect } from 'react';
import  Base_Dean  from './Base_Dean';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table';
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';


/* ------------- Import Functions from API ------------------ */
import { getDocuments, 
         getProfessors, 
         getCareers,
         updateProfessorRevisor} from '../api/task.api';

export function Assign_Reviewer() {

  const ci = useSelector(state => state.profile.ci);
  //console.log("el ci es "+ ci)

  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;




  /* -------------- Cargar profesores de la escuela del cual es decano ------ */
  const [deanCareerId, setDeanCareerId] = useState(null);
  //const [deanSchoolId, setDeanSchoolId] = useState(null);
  const [careersInDeanSchool, setCareersInDeanSchool] = useState([]);
  const [professorsInDeanSchool, setProfessorsInDeanSchool] = useState([]);


  /* ------ Carga del career_id del decano ------- */
  useEffect(() => {
    async function loadDeanCareerId() {
      if (!ci) {
        return; // Si ci no está definido, no se ejecuta la carga del career_id del decano
      }

      const res = await getProfessors();
      const deanProfessor = res.data.find((professor) => professor.professor_id === ci);
      if (deanProfessor) {
        setDeanCareerId(deanProfessor.career_id);
      }
    }
    loadDeanCareerId();
  }, [ci]); // Agrega ci como dependencia para que se ejecute cuando cambie su valor


  /* ------ Carga de las carreras de la escuela del decano ------- */
  useEffect(() => {
    async function loadCareersInDeanSchool() {
      if (!deanCareerId) {
        return; // Si deanCareerId no está definido, no se ejecuta la carga de carreras
      }
      const res = await getCareers();
      //console.log("Las carreras son ")
      //console.log(res.data)
      const school_id = res.data.filter((career) => career.id === deanCareerId)[0].school_id;

      //console.log("El ID de la escuela del decano es  ")
      //console.log(school_id)
      //setDeanSchoolId(school_id)

      const careers = res.data.filter((career) => career.school_id === school_id);
      setCareersInDeanSchool(careers);
      
      //console.log("Las carreras en la escuelad del decano son ")
      //console.log(careers)
    }
    loadCareersInDeanSchool();
  }, [deanCareerId]); // Agrega deanCareerId como dependencia para que se ejecute cuando cambie su valor

  /* ------ Carga de los profesores de las carreras de la escuela del decano ------- */
  useEffect(() => {
    async function loadProfessorsInDeanSchool() {
      if (careersInDeanSchool.length === 0) {
        return; // Si no hay carreras en la escuela del decano, no se ejecuta la carga de profesores
      }

      const res = await getProfessors();
      // Filtrar los registros cuyo campo career_id esté en la lista de carreras de la escuela del decano
      const filteredProfessors = res.data.filter((professor) => careersInDeanSchool.some((career) => professor.career_id === career.id));
      setProfessorsInDeanSchool(filteredProfessors);
      //console.log("Los profesores filtrados de las carreras de la escuela del decano son ")
      //console.log(filteredProfessors)
      // Create an object to store the default reviewers for each professor
      const defaultReviewers = {};
      // Iterate through the filteredProfessors to get their default reviewers
      filteredProfessors.forEach((professor) => {
        defaultReviewers[professor.professor_id] = professor.professor_revisor;
      });
      setProfessorReviewers(defaultReviewers);

    }
    loadProfessorsInDeanSchool();
  }, [careersInDeanSchool]);


  
  /* --------------- Validar las entradas de los formularios ---------------- */
  const {
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const onSubmit = handleSubmit(async () => {

    //console.log(professorReviewers)
  // Iterate through professorReviewers and call updateProfessorRevisor for each professor
    for (const professorId in professorReviewers) {
      if (professorReviewers.hasOwnProperty(professorId)) {
        const reviewerId = professorReviewers[professorId];
        // Call updateProfessorRevisor with professorId and reviewerId
        //console.log(professorReviewers[professorId])
        await updateProfessorRevisor(professorId, { professor_revisor: reviewerId });
        //console.log("Registro actualizado")
      }
    }

    toast.success('Registros actualizados con éxito!', {
      position: toast.POSITION.BOTTOM_RIGHT
  });
  });



  /* -------------------------------------------------------------------- */
  /* -------------------------------------------------------------------- */
  /* -------------------------------------------------------------------- */

  // New state variable to store selected reviewers for each professor
  const [professorReviewers, setProfessorReviewers] = useState({});

  // Function to handle the change of the reviewer for a specific professor
  const handleReviewerChange = (professorId, reviewerId) => {
    setProfessorReviewers((prevReviewers) => ({
      ...prevReviewers,
      [professorId]: reviewerId,
    }));
  };


  return (
    <Base_Dean>
      <h1>Asignar Revisores</h1>
      <Form className="w-50" onSubmit={onSubmit}>
        <Row>
          <Col sm="6">
            <h4>Profesor</h4>
          </Col>
          <Col sm="6">
            <h4>Revisor</h4>
          </Col>
        </Row>
        {professorsInDeanSchool.map((professor) => (
          <Form.Group className="mt-4" key={professor.professor_id} as={Row}>
            <Form.Label column sm="6">
              {professor.professor_names} {professor.professor_lastnames}
            </Form.Label>
            <Col sm="6">
              <Form.Select
                value={professorReviewers[professor.professor_id] || ''}
                onChange={(e) => handleReviewerChange(professor.professor_id, e.target.value)}
              >
                {professorsInDeanSchool.map((reviewer) => (
                  <option key={reviewer.professor_id} value={reviewer.professor_id}>
                    {reviewer.professor_names} {reviewer.professor_lastnames}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
        ))}

        <Button className="mt-4" variant="primary" type="submit">
          Guardar
        </Button>
      </Form>

      <br />
      <ToastContainer />
    </Base_Dean>
  );
}