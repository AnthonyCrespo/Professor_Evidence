import React, { useState, useEffect } from 'react';
import  Base_Dean  from './Base_Dean';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table';
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

/* ------------- Import Functions from API ------------------ */
import { getActivitiesType, 
         getEvidencesType, 
         getSemesters, 
         getDocuments, 
         getDocumentByID,
         getProfessors, 
         deleteDocumentByID,
         updateDocument,
         getReports,  
         getCareers,
         getSchools,
         updateReportPartial} from '../api/task.api';

export function Aprobar_Report() {
  const ci = useSelector(state => state.profile.ci);
  console.log("el ci es "+ ci)
  
  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(0);


  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [report,  setReport] = useState([]);

  /* -------------------For editing a task ------------------- */
  const [showModal, setShowModal] = useState(false);


  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);



  const [selectedDocument, setSelectedDocument] = useState(null);
  /* Para desplegar el nombre del archivo actual en la BD */
  const [document, setDocument] = useState(null);

  const [professorComment, setProfessorComment] = useState("");
  const [revisorComment, setRevisorComment] = useState("");
  const [reports, setReports] = useState([]);

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
      setSelectedProfessor(filteredProfessors[0]?.professor_id || 0);
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

  
/* ----------- Carga de los semestres ----------------------- */
useEffect(() => {
    async function loadSemesters() {
      const res = await getSemesters();
      setSemesters(res.data);
    }
    loadSemesters();
  }, []);


/* ------------------------------------------------------------------------------ */
/* --------------------------- Modal ---------------------------------------------*/
/* ------------------------------------------------------------------------------ */


  /* --------------- Validar las entradas de los formularios ---------------- */
  const {
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const {
    handleSubmit: handleSubmit_modal,
    setValue: setValue_modal
  } = useForm();
  


  const onSubmit = handleSubmit(async () => {
    const report_data = {
      professor_id: selectedProfessor,
      semester_id: parseInt(selectedSemester)
    };

    const res = await getReports();
    let filteredReports = [];
    if (parseInt(selectedProfessor) === 0) {
        filteredReports = res.data.filter(report =>
          report.semester_id === report_data.semester_id
        );
      } else {
        filteredReports = res.data.filter(report =>
            report.professor_id === report_data.professor_id &&
            report.semester_id === report_data.semester_id
        );
      }

      const reportsWithSemesterName = filteredReports.map(report => ({
        ...report,
        semester_name: semesters.find(semester => semester.id === report.semester_id)?.semester_name,
      }));
  
      setReports(reportsWithSemesterName);
      console.log(reportsWithSemesterName);
    
    if (filteredReports.length === 0)
    toast.info('No se encontraron registros!', {
    position: toast.POSITION.BOTTOM_RIGHT
        });
  });


  const onSubmit_modal = handleSubmit_modal(async (data) => {
    //const { evidence_type_name, activity_type_name, ...updatedData } = evidence_document;
  
    const new_report = {
      //...updatedData,
      id: report.id,
      report_revisorComment: revisorComment
    };

    //setEvidenceDocument(new_evidence_document);
  
    console.log(new_report);
    await updateReportPartial(new_report.id, new_report);
    toast.success('Registro actualizado!', {
     position: toast.POSITION.BOTTOM_RIGHT
  });

  handleCloseModal()
  onSubmit()
  });
  



  const handleEdit = async (report) => {
        setReport(report)
        setEditItemId(report.id);
        setShowModal(true);
};
  
  const handleCloseModal = () => {
    setShowModal(false);
    setRevisorComment("")
    //setSelectedEvidence_modal(0)
  };
  
  
  const handleDelete = (id) => {
    setDeleteItemId(id);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = async () => {
    await deleteDocumentByID(deleteItemId);
    setShowConfirmationModal(false);
        // Mostrar la notificación de eliminación exitosa
    toast.success('Evidencia eliminada existosamente!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000, // Duración en milisegundos antes de que la notificación se cierre automáticamente
      hideProgressBar: true, // Oculta la barra de progreso
      closeOnClick: true, // Cierra la notificación al hacer clic en ella
    });
    
    onSubmit();
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  
  return (
    <Base_Dean >
      <h1>Revisar y Aprobar Reportes </h1>
      <Form className="w-50" onSubmit={onSubmit}>

      <Form.Group className="mt-4">
          <Form.Label>Profesor</Form.Label>
          <Form.Select
            value={selectedProfessor}
            onChange={(e) => {
              setSelectedProfessor(e.target.value);
              setValue('selected_professor', e.target.value);
            }}
          >
            {professorsInDeanSchool.map((professor) => (
              <option key={professor.professor_id} value={professor.professor_id}>
                {professor.professor_names + " " + professor.professor_lastnames}
              </option>
            ))}
          </Form.Select>
          {errors.selected_professor && <span>Debe elegir un profesor.</span>}
      </Form.Group>


      <Form.Group className="mt-4">
          <Form.Label>Semestre:</Form.Label>
          <Form.Select
            value={selectedSemester}
            onChange={(e) => {
              setSelectedSemester(e.target.value);
              setValue('semester', e.target.value);
            }}
          >
            {semesters.map(opcion => (
              <option key={opcion.id} value={opcion.id}>{opcion.semester_name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button className="mt-4" variant="primary" type="submit">Buscar</Button>
      </Form>

      <br />


      
      <h5>Documentos subidos:</h5>
      <div style={{ maxWidth: '80%' }}>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Semestre</th>
                <th>Fecha</th>
                <th>Reporte</th>
                <th>Comentario</th>
                <th>Comentario del revisor</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {reports.map((item) => (
                <tr key={item.id}>
                    <td>{item.semester_name}</td>
                    <td>{item.report_uploadDate}</td>
                    <td>{item.report_name}</td>
                    <td>{item.report_professorComment}</td>
                    <td>{item.report_revisorComment}</td>
                    <td>
                        <button
                        className="btn btn-success"
                        onClick={() => handleVisualizarClick(item.id)}
                        >
                        Visualizar
                        </button>
                        <br/>
                        <Button variant="primary" onClick={() => handleEdit(item)}>Editar</Button>
                    </td>
                </tr>
                ))}
            </tbody>
        </Table>
      </div>

    {/* ----------------------------------------------------------------------- */}
    {/* ------------------------ Modal de edición --------------------------- */}
    {/* ----------------------------------------------------------------------- */}
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Registro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form className="w-80" onSubmit={onSubmit_modal}>

        <Form.Group className="mt-4">
                  <Form.Label>Comentario:</Form.Label>
                  <Form.Control as="textarea" rows={3} 
                                  value={revisorComment}
                                  onChange={(e) => {
                                    setRevisorComment(e.target.value)
                                  }}
                  />
        </Form.Group>

        <Button className="mt-4" variant="primary" type="submit">
            Guardar Cambios
        </Button>
          </Form>
      </Modal.Body>
{/*       <Modal.Footer>

      </Modal.Footer> */}

    </Modal>



    {/* ----------------------------------------------------------------------- */}
    {/* ----------------- Modal de confirmación de borrado -------------------- */}
    {/* ----------------------------------------------------------------------- */}

      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de Borrado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Desea borrar esta evidencia?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Borrar
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </Base_Dean >
  );
}