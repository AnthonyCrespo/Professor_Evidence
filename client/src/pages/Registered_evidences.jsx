import React, { useState, useEffect } from 'react';
import { Base } from './Base';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container';

/* ------------- Import Functions from API ------------------ */
import { getActivitiesType, getEvidencesType, getSemesters, getDocuments } from '../api/task.api';

export function Registered_evidences() {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(0);
  const [evidences, setEvidences] = useState([]);
  const [selectedEvidence, setSelectedEvidence] = useState(0);
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [documents, setDocuments] = useState([]);


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




  useEffect(() => {
    async function loadSemesters() {
      const res = await getSemesters();
      setSemesters(res.data);
    }
    loadSemesters();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
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
              </tr>
            ))
          ) : (
            <tr>
            </tr>
          )}
        </tbody>
      </Table>
    </Base>
  );
}