import React, { useState, useEffect } from 'react';


import { Base } from './Base';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Typeahead} from 'react-bootstrap-typeahead'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
/* import {ActivitiesType} from '../components/ActivitiesType' */
/* import {EvidencesType} from '../components/EvidencesType' */
import './css/Register_evidence.css';

/* ------------- Import Functions from API ------------------ */
import { getActivitiesType } from '../api/task.api';
import { getEvidencesType } from '../api/task.api';
import { createEvidence } from '../api/task.api';

export function Register_evidence() {

    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(1);
    const [evidences, setEvidences] = useState([]);
    const [selectedEvidence, setSelectedEvidence] = useState(1);
    const [document, setDocument] = useState("");


    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    


    useEffect(() => {
      async function loadActivitiesType() {
        const res = await getActivitiesType();
        setActivities(res.data);
        console.log(activities)
      }
      loadActivitiesType();
    }, []);
  

    useEffect(() => {
      async function loadEvidencesType() {
        const res = await getEvidencesType();
        const filteredEvidences = res.data.filter(opcion => opcion.activity_type === parseInt(selectedActivity));
        setEvidences(filteredEvidences);
      }
      loadEvidencesType();
    }, [selectedActivity]);


    const handleSelectedEvidenceChange = (selected) => {
      console.log('Selected Evidence:', selected);
    };


    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue
    } = useForm();

    const navigate = useNavigate()

    const onSubmit = handleSubmit(async (data) => {
      const evidence_data = {
        document_comment: " ",
        document_uploadDate: formattedDate,
        document_pathToFile: data.document_pathToFile[0].name,
        professor_id: "1317858973",
        activity_type: parseInt(data.activity_type),
        evidence_type: parseInt(data.evidence_type),
        semester_id: 1
      };

      console.log(evidence_data)
      await  createEvidence(evidence_data);
      navigate("/home/")
      })

  return (
    <Base>
          <h1>Registrar Evidencia</h1>
          <Form className="w-50" onSubmit={onSubmit} encType="multipart/form-data">
              {/*-----------------------------------------------------  */}
              {/*---------------- Activities Type --------------------  */}
              {/*-----------------------------------------------------  */}
              <Form.Group className="mt-4">
                <Form.Label>Tipo de actividad:</Form.Label>
                <Form.Select
                  value={selectedActivity}
                  onChange={(e) => {setSelectedActivity(e.target.value)
                                    console.log(selectedActivity)
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
{/* 
              <Form.Group className="mt-4">
                    <Form.Label>Evidencia:</Form.Label>
                    <Typeahead
                      id="evidences"
                      labelKey="evidence_type"
                      onChange={(selected)=>{setSelectedEvidence(selected[0])}}
                      options={evidences}
                      placeholder="Evidence"
                      selected={[selectedEvidence]}
                    />
              </Form.Group>

 */}
              

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
              {/*---------------------- Documents --------------------  */}
              {/*-----------------------------------------------------  */}
              <Form.Group className="mt-4">
                <Form.Label>Documentos de respaldo:</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => {
                              const file = e.target.files[0];
                              setValue('document_pathToFile', file);
                              setValue('document_pathToFile', e.target.files[0])
                             }}
                  {...register('document_pathToFile', { required: true })}
                />
                {errors.document_pathToFile && <span>Un documento es requerido.</span>}
            </Form.Group>

              <Button className="mt-4" variant="primary" type="submit">Enviar</Button>
          </Form>
    </Base>
  );
}
