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
import { getActivitiesType, 
         getEvidencesType, 
         getSemesters, 
         getDocuments, 
         getProfessors, 
         getCareers,
         getSchools,
         deleteDocumentByID,
         updateDocument } from '../api/task.api';

export function Assign_Reviewer() {

  const ci = useSelector(state => state.profile.ci);
  console.log("el ci es "+ ci)


  const [selectedProfessor, setSelectedProfessor] = useState(0);

  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(0);
  const [evidences, setEvidences] = useState([]);
  const [selectedEvidence, setSelectedEvidence] = useState(0);

  const [selectedSemester, setSelectedSemester] = useState(1);
  const [documents, setDocuments] = useState([]);
  const [evidence_document,  setEvidenceDocument] = useState([]);

  const [activities_modal, setActivities_modal] = useState([]);
  const [selectedActivity_modal, setSelectedActivity_modal] = useState(1);
  const [evidences_modal, setEvidences_modal] = useState([]);
  const [selectedEvidence_modal, setSelectedEvidence_modal] = useState(1);


  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;




  /* -------------- Cargar profesores de la escuela del cual es decano ------ */
  const [deanCareerId, setDeanCareerId] = useState(null);
  const [deanSchoolId, setDeanSchoolId] = useState(null);
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
      console.log("Las carreras son ")
      console.log(res.data)
      const school_id = res.data.filter((career) => career.id === deanCareerId)[0].school_id;

      console.log("El ID de la escuela del decano es  ")
      console.log(school_id)
      setDeanSchoolId(school_id)

      const careers = res.data.filter((career) => career.school_id === school_id);
      setCareersInDeanSchool(careers);
      
      console.log("Las carreras en la escuelad del decano son ")
      console.log(careers)
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
      console.log("Los profesores filtrados de las carreras de la escuela del decano son ")
      console.log(filteredProfessors)
      setSelectedProfessor(filteredProfessors[0]?.professor_id || 0);
    }
    loadProfessorsInDeanSchool();
  }, [careersInDeanSchool]);


  

  /* ------ Carga de los tipos de actividades + 'TODOS' --------- */
  useEffect(() => {
    async function loadActivitiesType() {
      const res = await getActivitiesType();
      const allOption = { id: 0, activity_type: "Todos" };
      const activitiesWithAllOption = [allOption, ...res.data];
      setActivities(activitiesWithAllOption);
      setActivities_modal(res.data)
/*       console.log(activitiesWithAllOption)  |||| VERIFICADO. */
    }
    loadActivitiesType();
  }, []);

  /* ------ Carga de los tipos de evidencias + 'TODOS' --------- */
  useEffect(() => {
    async function loadEvidencesType() {
      const res = await getEvidencesType();
      const allOption = { id: 0, evidence_type: 'Todos', activity_type: 0 };
      let evidencesWithAllOption = [];
      /* Si tipo de actividad = TODOS */
      if (parseInt(selectedActivity) === 0) {
        evidencesWithAllOption = [allOption, ...res.data];
      /* En caso contrario */
      } else {
        const filteredEvidences = res.data.filter(opcion => opcion.activity_type === parseInt(selectedActivity));
        evidencesWithAllOption = [allOption, ...filteredEvidences];
      }
      setEvidences(evidencesWithAllOption);
      setSelectedEvidence(0); /* Arregló el error de que a veces no se podían hacer búsquedas. */
/*       console.log(evidencesWithAllOption);  */
    }
    loadEvidencesType();
  }, [selectedActivity]);




/* ------------------------------------------------------------------------------ */
/* --------------------------- Modal ---------------------------------------------*/
/* ------------------------------------------------------------------------------ */






useEffect(() => {
  async function loadEvidencesType_modal() {
    const res = await getEvidencesType();
    const filteredEvidences = res.data.filter(
      (opcion) => opcion.activity_type === parseInt(selectedActivity_modal)
    );
    setEvidences_modal(filteredEvidences);
    //console.log(filteredEvidences)
    if (evidence_document.activity_type == selectedActivity_modal)
      setSelectedEvidence_modal(evidence_document.evidence_type)
    else 
      setSelectedEvidence_modal(filteredEvidences[0].id)
    //console.log(evidence_document)
    
  }

  // Mueve la llamada a loadEvidencesType_modal aquí
  loadEvidencesType_modal();
}, [selectedActivity_modal]);


/* ----------- Carga de los semestres ----------------------- */
  useEffect(() => {
    async function loadSemesters() {
      const res = await getSemesters();
      setSemesters(res.data);
    }
    loadSemesters();
  }, []);

  /* --------------- Validar las entradas de los formularios ---------------- */
  const {
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const onSubmit = handleSubmit(async () => {
    const evidence_data = {
      professor_id: selectedProfessor,
      activity_type: parseInt(selectedActivity),
      evidence_type: parseInt(selectedEvidence),
      semester_id: parseInt(selectedSemester)
    };

    const res = await getDocuments();
    let filteredDocuments = [];
    if (parseInt(selectedActivity) === 0) {
      if (parseInt(selectedEvidence) === 0) {
        filteredDocuments = res.data.filter(document =>
          document.professor_id === evidence_data.professor_id &&
          document.semester_id === evidence_data.semester_id
        );
      } else {
        filteredDocuments = res.data.filter(document =>
          document.professor_id === evidence_data.professor_id &&
          document.evidence_type === evidence_data.evidence_type &&
          document.semester_id === evidence_data.semester_id
        );
      }
    } else {
      if (parseInt(selectedEvidence) === 0) {
        filteredDocuments = res.data.filter(document =>
          document.professor_id === evidence_data.professor_id &&
          document.activity_type === evidence_data.activity_type &&
          document.semester_id === evidence_data.semester_id
        );
      } else {
        filteredDocuments = res.data.filter(document =>
          document.professor_id === evidence_data.professor_id &&
          document.activity_type === evidence_data.activity_type &&
          document.evidence_type === evidence_data.evidence_type &&
          document.semester_id === evidence_data.semester_id
        );
      }
    }


    const documentsWithNames = filteredDocuments.map(document => ({
      ...document,
      activity_type_name: activities.find(activity => activity.id === document.activity_type)?.activity_type,
      evidence_type_name: evidences.find(evidence => evidence.id === document.evidence_type)?.evidence_type
    }));

    
    setDocuments(documentsWithNames);
    if (documentsWithNames.length === 0)
    toast.info('No se encontraron registros!', {
      position: toast.POSITION.BOTTOM_RIGHT
  });
  });




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
                value={selectedProfessor}
                onChange={(e) => {
                  setSelectedProfessor(e.target.value);
                  setValue('selected_professor', e.target.value);
                }}
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
  
        <Button className="mt-4" variant="primary" type="submit">Guardar</Button>
      </Form>
  
      <br />
    </Base_Dean>
  );
  
}