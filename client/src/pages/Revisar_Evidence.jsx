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
         getProfessors, 
         deleteDocumentByID,
         updateDocument } from '../api/task.api';

export function Revisar_Evidence() {

  const ci = useSelector(state => state.profile.ci);
  console.log("el ci es "+ ci)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    
  if (!isAuthenticated){
    console.log("El usuario no está autenticado.")
    return <Navigate to='/login' />;
  }
  

  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(0);

  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(0);
  const [evidences, setEvidences] = useState([]);
  const [selectedEvidence, setSelectedEvidence] = useState(0);
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [documents, setDocuments] = useState([]);
  const [evidence_document,  setEvidenceDocument] = useState([]);

  const [activities_modal, setActivities_modal] = useState([]);
  const [selectedActivity_modal, setSelectedActivity_modal] = useState(1);
  const [evidences_modal, setEvidences_modal] = useState([]);
  const [selectedEvidence_modal, setSelectedEvidence_modal] = useState(1);
  const [document_modal, setDocument_modal] = useState([]);

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
    setProfessors(filteredProfessors);
    setSelectedProfessor(filteredProfessors[0].professor_id)
  }
  loadProfesssors();
}, [ci]); // Agrega ci como dependencia para que se ejecute cuando cambie su valor
  

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
      const allOption = { id: 0, evidence_code: 'Todos', activity_type: 0 };
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

  const {
    handleSubmit: handleSubmit_modal,
    setValue: setValue_modal
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
      evidence_type_name: evidences.find(evidence => evidence.id === document.evidence_type)?.evidence_code
    }));

    
    setDocuments(documentsWithNames);
    if (documentsWithNames.length === 0)
    toast.info('No se encontraron registros!', {
      position: toast.POSITION.BOTTOM_RIGHT
  });
  });


  const onSubmit_modal = handleSubmit_modal(async (data) => {
    //const { evidence_type_name, activity_type_name, ...updatedData } = evidence_document;
  
    const new_evidence_document = {
      //...updatedData,
      id: evidence_document.id,
      activity_type: parseInt(selectedActivity_modal),
      evidence_type: parseInt(selectedEvidence_modal),
      document_uploadDate: formattedDate,
      document_revisorComment: revisorComment
    };
  
    if (data.document_pathToFile) {
      //new_evidence_document.document_pathToFile = data.document_pathToFile.name;
      new_evidence_document.uploadedDocument = data.document_pathToFile;
    }
  
    //setEvidenceDocument(new_evidence_document);
  
    console.log(new_evidence_document);
    await updateDocument(new_evidence_document.id, new_evidence_document);
    toast.success('Registro actualizado!', {
     position: toast.POSITION.BOTTOM_RIGHT
  });

  handleCloseModal()
  onSubmit()
  //window.location.reload();
  });
  



  const handleEdit = async (doc) => {
      setEvidenceDocument(doc)
      const fileName = doc.uploadedDocument;
      setDocument(fileName.substring(fileName.lastIndexOf('/') + 1));
      setEditItemId(doc.id);
      setSelectedActivity_modal(doc.activity_type)
      setSelectedEvidence_modal(doc.evidence_type)
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
    <Base_Revisor >
      <h1>Revisión de Evidencias</h1>
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
          <Form.Label>Tipo de actividad:</Form.Label>
          <Form.Select
            value={selectedActivity}
            onChange={(e) => {
              setSelectedActivity(e.target.value);
              setValue('activity_type', e.target.value);
            }}
          >
            {activities.map((opcion) => (
              <option key={opcion.id} value={opcion.id}>
                {opcion.activity_type}
              </option>
            ))}
          </Form.Select>
          {errors.activity_type && <span>Debe elegir un tipo de actividad.</span>}
        </Form.Group>

        <Form.Group className="mt-4">
          <Form.Label>Evidencia:</Form.Label>
          <Form.Select
            value={selectedEvidence}
            onChange={(e) => {
              setSelectedEvidence(e.target.value);
              setValue('evidence_type', e.target.value);
            }}
          >
            {evidences.map(opcion => (
              <option key={opcion.id} value={opcion.id} title={opcion.evidence_type} >{opcion.evidence_code}</option>
            ))}
          </Form.Select>
          {errors.evidence_type && <span>Debe elegir un tipo de evidencia.</span>}
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
              <th>Actividades</th>
              <th>Evidencia</th>
              <th>Documento</th>
              <th>Fecha</th>
              <th>Comentario</th>
              <th>Comentario del revisor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {documents.length > 0 ? (
              documents.map((item) => (
                <tr key={item.id}>
                  <td>{item.activity_type_name}</td>
                  <td>{item.evidence_type_name}</td>
                  <td>
                    <a href={item.uploadedDocument} target="_blank">
                      {item.uploadedDocument.substring(item.uploadedDocument.lastIndexOf('/') + 1)}
                    </a>
                  </td>
                  <td>{item.document_uploadDate}</td>
                  <td>{item.document_professorComment}</td>
                  <td>{item.document_revisorComment}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleEdit(item)}>Editar</Button>
                    <Button variant="danger" onClick={() => handleDelete(item.id)}>Borrar</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
              </tr>
            )}
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
            <Form.Label>Tipo de actividad:</Form.Label>
            <Form.Select
              value={selectedActivity_modal}
              onChange={(e) => {
                setSelectedActivity_modal(e.target.value);
                setValue_modal('activity_type', e.target.value);
              }}
            >
              {activities_modal.map((opcion) => (
                <option key={opcion.id} value={opcion.id}>
                  {opcion.activity_type}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-4">
            <Form.Label>Evidencia:</Form.Label>
            <Form.Select
              value={selectedEvidence_modal}
              onChange={(e) => {
                setValue_modal('evidence_type', e.target.value);
                setSelectedEvidence_modal(e.target.value);
                console.log(e.target.value)
              }}
            >
              {evidences_modal.map((opcion) => (
                <option key={opcion.id} value={opcion.id}>
                  {opcion.evidence_type}
                </option>
              ))}
            </Form.Select>
          </Form.Group>


        <Form.Group className="mt-4">
          <Form.Label>Documento de respaldo:</Form.Label>
          <div className="input-group">
            <input
              type="file"
              className="form-control"
              accept=".pdf"
              id="document"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files[0];
                setValue_modal('document_pathToFile', file);
                setDocument(e.target.files[0].name)
              }}
            />
            <label htmlFor="document" className="input-group-text" style={{
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
              {document}
            </label>
          </div>
        </Form.Group>

        
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
    </Base_Revisor >
  );
}