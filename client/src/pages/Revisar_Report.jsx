import React, { useState, useEffect } from 'react';
import  Base_Revisor  from './Base_Revisor';
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
import { getActivitiesType, 
         getEvidencesType, 
         getSemesters, 
         getDocuments, 
         getDocumentByID,
         getProfessors, 
         deleteDocumentByID,
         updateDocument,
         getReports,  
         updateReportPartial} from '../api/task.api';

export function Revisar_Report() {
  const ci = useSelector(state => state.profile.ci);
  console.log("el ci es "+ ci)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    
  if (!isAuthenticated){
    console.log("El usuario no está autenticado.")
    return <Navigate to='/login' />;
  }
  //const [professors, setProfessors] = useState([]);
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


/* ------ Carga de los profesores bajo supervisión --------- */
useEffect(() => {
  async function loadProfesssors() {
    if (!ci) {
      return; // Si ci no está definido, no se ejecuta la carga de profesores
    }
    const res = await getProfessors();
    // Filtrar los registros cuyo campo professor_revisor sea igual a "1317858973"
    const filteredProfessors = res.data.filter((professor) => professor.professor_revisor === ci);
    setProfessors([allProfessorsOption, ...filteredProfessors]);
    setSelectedProfessor(allProfessorsOption.professor_id); // Establece "Todos" como opción por defecto
  }
  loadProfesssors();
}, [ci]); // Agrega ci como dependencia para que se ejecute cuando cambie su valor

  
  
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
      semester_id: parseInt(selectedSemester),
      report_isReviewed: selectedEstado === "Todos" ? null : selectedEstado === "Aprobado",
    };

    const res = await getReports();
    let filteredReports = [];
    if (parseInt(selectedProfessor) === 0) {
      const professorsIdsUnderSupervision = professors.map((professor) => professor.professor_id);

      filteredReports = res.data.filter((report) =>
        report.semester_id === report_data.semester_id &&
        professorsIdsUnderSupervision.includes(report.professor_id) &&
        (report_data.report_isReviewed === null || report.report_isReviewed === report_data.report_isReviewed)
      );
    } else {
      filteredReports = res.data.filter((report) =>
        report.professor_id === report_data.professor_id &&
        report.semester_id === report_data.semester_id &&
        (report_data.report_isReviewed === null || report.report_isReviewed === report_data.report_isReviewed)
      );
    }

    const reportsWithSemesterName = filteredReports.map((report) => ({
      ...report,
      semester_name: semesters.find((semester) => semester.id === report.semester_id)?.semester_name,
    }));

    setReports(reportsWithSemesterName);
    console.log(reportsWithSemesterName);

    if (filteredReports.length === 0)
      toast.info('No se encontraron registros!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
  });


  const onSubmit_modal = handleSubmit_modal(async (data) => {
    //const { evidence_type_name, activity_type_name, ...updatedData } = evidence_document;
  
    const new_report = {
      //...updatedData,
      id: report.id,
      report_revisorComment: revisorComment,
      report_isReviewed: approvalStatus === "APROBADO"
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

  const allProfessorsOption = { professor_id: 0, professor_names: "Todos", professor_lastnames: "" };
  const [professors, setProfessors] = useState([allProfessorsOption]);
  const [approvalStatus, setApprovalStatus] = useState("NO APROBADO");
  const greenBgStyle = { backgroundColor: "rgb(176, 227, 117)" };
  const redBgStyle = { backgroundColor: "rgb(242, 133, 132)" };
  const [selectedEstado, setSelectedEstado] = useState("Todos");
  return (
    <Base_Revisor >
      <h1>Revisión de Informes</h1>
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
            {professors.map((professor) => (
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
        <Form.Label>Estado:</Form.Label>
        <Form.Select
          value={selectedEstado}
          onChange={(e) => {
            setSelectedEstado(e.target.value);
            setValue('estado', e.target.value);
          }}
        >
          <option value="Todos">Todos</option>
          <option value="Aprobado">Aprobado</option>
          <option value="No aprobado">No aprobado</option>
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
                      {professors.find((professor) => professor.professor_id === item.professor_id)?.professor_names +
                        " " +
                        professors.find((professor) => professor.professor_id === item.professor_id)?.professor_lastnames}
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
                    <td style={item.report_isReviewed ? greenBgStyle : redBgStyle}>
              {         item.report_isReviewed   ? "APROBADO" : "NO APROBADO"}
                    </td>
                    <td>
{/*                         <button
                        className="btn btn-success"
                        onClick={() => handleVisualizarClick(item.id)}
                        >
                        Visualizar
                        </button> */}
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

        <Form.Group>
                  <Form.Label>Comentario:</Form.Label>
                  <Form.Control as="textarea" rows={3} 
                                  value={revisorComment}
                                  onChange={(e) => {
                                    setRevisorComment(e.target.value)
                                  }}
                  />
        </Form.Group>

      <Form.Group>
        <Form.Label>Estado de Aprobación:</Form.Label>
        <Form.Select
          value={approvalStatus}
          onChange={(e) => setApprovalStatus(e.target.value)}
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
    </Base_Revisor >
  );
}