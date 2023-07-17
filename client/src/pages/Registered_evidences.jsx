import React, { useState, useEffect } from 'react';
import { Base } from './Base';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table';
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container';

/* ------------- Import Functions from API ------------------ */
import { getActivitiesType, getEvidencesType, getSemesters, getDocuments, getDocumentByID, deleteDocumentByID } from '../api/task.api';

export function Registered_evidences() {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(0);
  const [evidences, setEvidences] = useState([]);
  const [selectedEvidence, setSelectedEvidence] = useState(0);
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [documents, setDocuments] = useState([]);


  const [activities_modal, setActivities_modal] = useState([]);
  const [selectedActivity_modal, setSelectedActivity_modal] = useState(1);
  const [evidences_modal, setEvidences_modal] = useState([]);
  const [selectedEvidence_modal, setSelectedEvidence_modal] = useState(0);
  const [documents_modal, setDocuments_modal] = useState([]);

  /* -------------------For editing a task ------------------- */
  const [showModal, setShowModal] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);



  
  /* ------ Carga de los tipos de actividades + 'TODOS' --------- */
  useEffect(() => {
    async function loadActivitiesType() {
      const res = await getActivitiesType();
      const allOption = { id: 0, activity_type: "Todos" };
      const activitiesWithAllOption = [allOption, ...res.data];
      setActivities(activitiesWithAllOption);
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
    async function loadActivitiesType_modal() {
      const res = await getActivitiesType();
      setActivities_modal(res.data);
      setSelectedEvidence_modal(0);
/*       console.log(activitiesWithAllOption)  |||| VERIFICADO. */
    }
    loadActivitiesType_modal();
  }, []);



  useEffect(() => {
    async function loadEvidencesType_modal() {
      const res = await getEvidencesType();
      const filteredEvidences = res.data.filter(opcion => opcion.activity_type === parseInt(selectedActivity_modal));
      setEvidences_modal(filteredEvidences);
      setSelectedEvidence_modal(0);
      }
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
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const {
    register: form_modal,
    handleSubmit: handleSubmit_modal,
    formState: { errors: errors_modal },
    setValue: setValue_modal
  } = useForm();
  



  const onSubmit = handleSubmit(async (data) => {
    const evidence_data = {
      professor_id: "1317858973",
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
      activity_type: activities.find(activity => activity.id === document.activity_type)?.activity_type,
      evidence_type: evidences.find(evidence => evidence.id === document.evidence_type)?.evidence_type
    }));

    
    setDocuments(documentsWithNames);
  });

  const handleEdit = async (id) => {
    try {
      const report = await getDocumentByID(id);
      // Almacena el reporte en una variable o realiza alguna acción con los datos del reporte
      console.log(report);
      setEditItemId(id);
      setShowModal(true);
    } catch (error) {
      // Maneja el error de la petición API
      console.error(error);
    }
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  
  const handleDelete = (id) => {
    setDeleteItemId(id);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = async () => {
    await deleteDocumentByID(deleteItemId);
    setShowConfirmationModal(false);
    // Actualizar la tabla después de eliminar el registro
    // const res = await getDocuments();
    // setDocuments(res.data);
    onSubmit();
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  

  const obtenerDocumentoPrevio = () => {
    // Obtén el path del archivo previamente guardado desde tu base de datos o cualquier otra fuente de datos
    const pathDocumentoPrevio = obtenerPathDocumentoPrevio(); // Reemplaza esto con tu lógica para obtener el path del documento previo
  
    // Verifica si el path del documento previo existe
    if (!pathDocumentoPrevio) {
      return null;
    }
  
    // Lee el archivo desde el almacenamiento local del navegador
    const archivoPrevio = localStorage.getItem(pathDocumentoPrevio);
  
    // Si no se encuentra el archivo previo, devuelve null
    if (!archivoPrevio) {
      return null;
    }
  
    // Crea un nuevo objeto File utilizando el archivo previo y su nombre
    const nombreArchivoPrevio = obtenerNombreArchivoDesdePath(pathDocumentoPrevio);
    const documentoPrevio = new File([archivoPrevio], nombreArchivoPrevio);
  
    return documentoPrevio;
  };
  
  // Función auxiliar para obtener el nombre de archivo desde un path
  const obtenerNombreArchivoDesdePath = (path) => {
    const partesPath = path.split('/');
    return partesPath[partesPath.length - 1];
  };

  return (
    <Base>
      <h1>Evidencias Registradas</h1>
      <Form className="w-50" onSubmit={onSubmit}>
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
              <option key={opcion.id} value={opcion.id}>{opcion.evidence_type}</option>
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
            <th>Actividad</th>
            <th>Evidencia</th>
            <th>Documento</th>
            <th>Fecha</th>
            <th>Comentario</th>
          </tr>
        </thead>
        <tbody>
          {documents.length > 0 ? (
            documents.map((item) => (
              <tr key={item.id}>
                <td>{item.activity_type}</td>
                <td>{item.evidence_type}</td>
                <td>{item.document_pathToFile}</td>
                <td>{item.document_uploadDate}</td>
                <td>{item.document_comment}</td>
                <td>
                  <Button variant="primary" onClick={() => handleEdit(item.id)}>Editar</Button>
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
      <Form className="w-80" /* onSubmit={onSubmit_modal} */>
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
                setSelectedEvidence_modal(e.target.value);
                setValue_modal('evidence_type', e.target.value);
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
            <Form.Label>Documentos de respaldo:</Form.Label>
            <Form.Control
              type="file"
              accept=".pdf"
              onChange={(e) => {

                const file = e.target.files[0];
                setValue_modal('document_pathToFile', file);
                console.log(e.target.files[0])
              }}
              {...form_modal('document_pathToFile', { required: true })}
            />
    {/*         {errors_modal?.document_pathToFile && <span>Se requiere subir un documento.</span>} */}
          </Form.Group>

{/*           <Button className="mt-4" variant="primary" type="submit">
            Guardar Cambios
          </Button> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button className="mt-4" variant="primary" type="submit">
        Guardar Cambios
        </Button>
      </Modal.Footer>
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


    </Base>
  );
}