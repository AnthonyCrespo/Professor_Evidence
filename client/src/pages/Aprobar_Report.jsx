import React, { useState, useEffect } from 'react';
import  Base_Dean  from './Base_Dean';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table';
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container';
import { Navigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

/* ------------- Import Functions from API ------------------ */
import { getSemesters, 
         getProfessors, 
         deleteDocumentByID,
         getReports,  
         getCareers,
         updateReportPartial} from '../api/task.api';

export function Aprobar_Report() {
  const ci = useSelector(state => state.profile.ci);
  console.log("el ci es "+ ci)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    
  if (!isAuthenticated){
    console.log("El usuario no está autenticado.")
    return <Navigate to='/login' />;
  }
  const [selectedProfessor, setSelectedProfessor] = useState(0);


  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [report,  setReport] = useState([]);

  /* -------------------For editing a task ------------------- */
  const [showModal, setShowModal] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

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
  
  const [currentSemester, setCurrentSemester] = useState([]);


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
      const school_id = res.data.filter((career) => career.id === deanCareerId)[0].school_id;

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

      const filteredProfessors = res.data.filter((professor) => careersInDeanSchool.some((career) => professor.career_id === career.id));
      setProfessorsInDeanSchool([allProfessorsOption, ...filteredProfessors]);
      setSelectedProfessor(allProfessorsOption.professor_id); // Establece "Todos" como opción por defecto

    }
    loadProfessorsInDeanSchool();
  }, [careersInDeanSchool]);

  
/* ----------- Carga de los semestres ----------------------- */
useEffect(() => {
    async function loadSemesters() {
      const res = await getSemesters();
      setSemesters(res.data);
      const currentSemester = res.data.find(semester => semester.isCurrentSemester === true);
      setSelectedSemester(currentSemester.id)
      setCurrentSemester(currentSemester)
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
      semester_id: parseInt(selectedSemester),
      report_isApproved: selectedReportState === "Todos" ? null : selectedReportState === "APROBADO",
    };
    console.log(report_data)
  
    const res = await getReports();
    let filteredReports = res.data.filter(report => {
      const isProfessorMatch = parseInt(selectedProfessor) === 0 || report.professor_id === report_data.professor_id;
      const isSemesterMatch = report.semester_id === report_data.semester_id;
      const isReportStateMatch =
        report_data.report_isApproved === null || report.report_isApproved === report_data.report_isApproved;
      const isReportReviewed = report.report_isReviewed === true; // Check for report_isReviewed === true
  
      return isProfessorMatch && isSemesterMatch && isReportStateMatch && isReportReviewed; // Add the condition for isReportReviewed
    });
  
    const reportsWithSemesterName = filteredReports.map(report => ({
      ...report,
      semester_name: semesters.find(semester => semester.id === report.semester_id)?.semester_name,
    }));
  
    setReports(reportsWithSemesterName);
  
    if (filteredReports.length === 0) {
      toast.info('No se encontraron registros!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  });
  
  

  const [selectedOption, setSelectedOption] = useState("NO APROBADO");
  
  const onSubmit_modal = handleSubmit_modal(async () => {
    const new_report = {
      id: report.id,
      report_isApproved: selectedOption === "APROBADO", // Check if the selected option is "APROBAR" and set isApproved accordingly
    };
    console.log("La opcion seleccionada es " + selectedOption);
    console.log(new_report);
    await updateReportPartial(new_report.id, new_report);
    toast.success('Registro actualizado!', {
      position: toast.POSITION.BOTTOM_RIGHT
    });

    handleCloseModal();
    onSubmit();
  });

  



  const handleEdit = async (report) => {
    setReport(report);
    setEditItemId(report.id);
    console.log("El estado actual de aprobacion del reporte es " + report.report_isApproved )
    setSelectedOption(report.report_isApproved ? "APROBADO" : "NO APROBADO");
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

  
  // Inline styles for green and red backgrounds
  const greenBgStyle = { backgroundColor: "rgb(176, 227, 117)" };
  const redBgStyle = { backgroundColor: "rgb(242, 133, 132)" };

  const allProfessorsOption = { professor_id: 0, professor_names: "Todos", professor_lastnames: "" };
  const [selectedReportState, setSelectedReportState] = useState("Todos");

  return (
    <Base_Dean >
      <h1>Revisar y Aprobar Informes Finales </h1>
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

        <Form.Group className="mt-4">
        <Form.Label>Estado del Reporte:</Form.Label>
        <Form.Select
          value={selectedReportState}
          onChange={(e) => setSelectedReportState(e.target.value)}
        >
          <option value="Todos">Todos</option>
          <option value="APROBADO">Aprobado</option>
          <option value="NO APROBADO">No Aprobado</option>
        </Form.Select>
      </Form.Group>

        <Button className="mt-4" variant="primary" type="submit">Buscar</Button>
      </Form>

      <br />


      
      <h5>Informes registrados</h5>
      <div style={{ maxWidth: '80%' }}>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Profesor</th> 
                <th>Semestre</th>
                <th>Fecha</th>
                <th>Reporte</th>
                <th>Comentario</th>
                <th>Comentario del revisor</th>
                <th>Estado</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {reports.map((item) => (
                <tr key={item.id}>
                    <td>
                      {/* Mostrar el nombre del profesor */}
                      {professorsInDeanSchool.find((professor) => professor.professor_id === item.professor_id)?.professor_names +
                        " " +
                        professorsInDeanSchool.find((professor) => professor.professor_id === item.professor_id)?.professor_lastnames}
                    </td>
                    <td>{item.semester_name}</td>
                    <td>{item.report_uploadDate}</td>
                    <td>
                      <a href={item.uploadedReport} target="_blank">
                        {item.uploadedReport.substring(item.uploadedReport.lastIndexOf('/') + 1)}
                      </a>
                    </td>
                    <td>{item.report_professorComment}</td>
                    <td>{item.report_revisorComment}</td>
                    <td style={item.report_isApproved ? greenBgStyle : redBgStyle}>
              {         item.report_isApproved ? "APROBADO" : "NO APROBADO"}
                    </td>
                    <td>

                    {item.semester_id === currentSemester.id && (
                    <Button variant="primary" onClick={() => handleEdit(item)}>
                    Editar
                  </Button>
                    )}
                    
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

      <Form.Group>
              <Form.Label>Seleccionar Aprobación:</Form.Label>
              <Form.Select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="APROBADO">APROBADO</option>
                <option value="NO APROBADO">NO APROBADO</option>
              </Form.Select>
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