import React, { useState, useEffect } from 'react';


import { Base } from './Base';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
/* import {ActivitiesType} from '../components/ActivitiesType' */
/* import {EvidencesType} from '../components/EvidencesType' */
import { useForm } from 'react-hook-form';

/* ------------- Import Functions from API ------------------ */
import { getActivitiesType } from '../api/task.api';
import { getEvidencesType } from '../api/task.api';
import { getSemesters } from '../api/task.api';
import { getDocuments } from '../api/task.api';

export function Registered_evidences() {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(0);
  const [evidences, setEvidences] = useState([]);
  const [selectedEvidence, setSelectedEvidence] = useState(0);
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(1);

  useEffect(() => {
    async function loadActivitiesType() {
      const res = await getActivitiesType();
      const allOption = { id: 0, activity_type: "Todos" };
      const activitiesWithAllOption = [allOption, ...res.data];
      console.log(activitiesWithAllOption);
      setActivities(activitiesWithAllOption);
    }
    loadActivitiesType();
    /* setSelectedActivity(0) */
  }, []);

  useEffect(() => {
    async function loadEvidencesType() {
      
      const res = await getEvidencesType();
      const allOption = { id: 0, evidence_type: 'Todos', activity_type: 0 };
      let evidencesWithAllOption = [];
      /* Si la actividad es 0 (Todos), entonces se muestran todas las evidencias en general + 'Todos'*/
      if (parseInt(selectedActivity) === 0) {
        evidencesWithAllOption = [allOption, ...res.data];
      /* De lo contrario solo se filtran las correspondientes a la actividad + 'Todos'*/
      } else { 
        const filteredEvidences = res.data.filter(opcion => opcion.activity_type === parseInt(selectedActivity));
        evidencesWithAllOption = [allOption, ...filteredEvidences];
      }
  
     /*  console.log(evidencesWithAllOption); */
      setEvidences(evidencesWithAllOption);
    }
  
    loadEvidencesType();
    setSelectedEvidence(0)
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
/*       document_comment: " ", */
     /*  document_uploadDate: formattedDate, */
/*       document_pathToFile: data.document_pathToFile[0].name, */
      professor_id: "1317858973",
      activity_type: parseInt(selectedActivity),//parseInt(data.activity_type),
      evidence_type: parseInt(selectedEvidence),//parseInt(data.evidence_type),
      semester_id: parseInt(selectedSemester)// parseInt(data.semester)
    };

    const res = await getDocuments();
    let filteredDocuments = []
    if (parseInt(selectedActivity) === 0){
          if (parseInt(selectedEvidence) === 0){
/*             console.log("ESTE ES EL TIPO DE ACTIVIDAD " + selectedActivity)
            console.log("ESTE ES EL TIPO DE EVIDENCIA " + selectedEvidence)
            console.log("ESTE ES EL SEMESTRE " + selectedSemester)
            console.log(evidence_data.professor_id)
            console.log(parseInt(evidence_data.semester_id)) */
            filteredDocuments = res.data.filter(document => 
                                                document.professor_id === evidence_data.professor_id &&
                                                document.semester_id === evidence_data.semester_id)
                                              
                                                console.log(filteredDocuments)}
                    
          else {
            filteredDocuments = res.data.filter(document => 
                                                document.professor_id === evidence_data.professor_id  &&
                                                document.evidence_type === evidence_data.evidence_type &&
                                                document.semester_id === evidence_data.semester_id )
                                              }        
    }
    else {
      if (parseInt(selectedEvidence) === 0){
        filteredDocuments = res.data.filter(document => 
                                            document.professor_id === evidence_data.professor_id &&
                                            document.activity_type === evidence_data.activity_type &&
                                            document.semester_id === evidence_data.semester_id)
                                          }
      else{
        filteredDocuments = res.data.filter(document => 
                                            document.professor_id === evidence_data.professor_id &&
                                            document.activity_type === evidence_data.activity_type &&
                                            document.evidence_type === evidence_data.evidence_type &&
                                            document.semester_id === evidence_data.semester_id)
                                          }
                                        }
    console.log(filteredDocuments)
    //navigate("/home/")
    })

  return (
    <Base>
    <h1>Evidencias Registradas</h1>
    <Form className="w-50" onSubmit={onSubmit}>
              {/*-----------------------------------------------------  */}
              {/*---------------- Activities Type --------------------  */}
              {/*-----------------------------------------------------  */}
              <Form.Group className="mt-4">
                <Form.Label>Tipo de actividad:</Form.Label>
                <Form.Select
                  value={selectedActivity}
                  onChange={(e) => {setSelectedActivity(e.target.value)
                                    /* console.log(selectedActivity) */
                                    setValue('activity_type', e.target.value)
                                  }}
                  /* {...register('activity_type')} */
                >
                  {activities.map((opcion) => (
                    <option key={opcion.id} value={opcion.id}>
                      {opcion.activity_type}
                    </option>
                  ))}
                </Form.Select>
                {errors.activity_type && <span>Debe elegir un tipo de actividad.</span>}
              </Form.Group>


              {/*-----------------------------------------------------  */}
              {/*------------------- Evidences Type ------------------  */}
              {/*-----------------------------------------------------  */}
              <Form.Group className="mt-4">
                    <Form.Label>Evidencia:</Form.Label>
                    <Form.Select
                    value={selectedEvidence} 
                    onChange={(e) => {setSelectedEvidence(e.target.value)
                                      /* console.log(selectedEvidence) */
                                      setValue('evidence_type', e.target.value)
                                    }}
                    /* {...register('evidence_type')} */
                    >
                      {evidences.map(opcion => (
                        <option key={opcion.id} value={opcion.id}>{opcion.evidence_type}</option>
                      ))}
                    </Form.Select>
                    {errors.evidence_type && <span>Debe elegir un tipo de evidencia.</span>}
              </Form.Group>

              {/*-----------------------------------------------------  */}
              {/*----------------------- Semester --------------------  */}
              {/*-----------------------------------------------------  */}
              <Form.Group className="mt-4">
                    <Form.Label>Semestre:</Form.Label>
                    <Form.Select
                    value={selectedSemester}
                    onChange={(e) => {setSelectedSemester(e.target.value)
                                      /* console.log(selectedEvidence) */
                                      setValue('semester', e.target.value)
                    }}
                    /* {...register('evidence_type')} */
                  >
                      {semesters.map(opcion => (
                        <option key={opcion.id} value={opcion.id}>{opcion.semester_name}</option>
                      ))}
                    </Form.Select>
              </Form.Group>

        <Button className="mt-4" variant="primary" type="submit">Buscar</Button>
      </Form>
    </Base>
  );
}
