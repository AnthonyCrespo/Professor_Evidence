import React, { useState, useEffect } from 'react';


import { Base } from './Base';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
/* import {ActivitiesType} from '../components/ActivitiesType' */
import {EvidencesType} from '../components/EvidencesType'


/* ------------- Import Functions from API ------------------ */
import { getActivitiesType } from '../api/task.api';
import { getEvidencesType } from '../api/task.api';

export function Register_evidence() {

    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(1);
    const [evidences, setEvidences] = useState([]);

    useEffect(() => {
      async function loadActivitiesType() {
        const res = await getActivitiesType();
        setActivities(res.data);
      }
      loadActivitiesType();
    }, []);

    useEffect(() => {
      async function loadEvidencesType() {
        const res = await getEvidencesType();
        console.log(parseInt(selectedActivity))
        const filteredEvidences = res.data.filter(opcion => opcion.activity_type === parseInt(selectedActivity));
        setEvidences(filteredEvidences);
      }
      loadEvidencesType();
    }, [selectedActivity]);


  return (
    <Base>
    <h1>Registrar Evidencia</h1>
{/*    <Form className="w-50">
         <Form.Group className="mt-4">
          <Form.Label>Tipo de actividad:</Form.Label>
          <Form.Select>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
            <option value="opcion4">Opción 4</option>
          </Form.Select>
        </Form.Group> */}
{/*         <ActivitiesType/> */}

    {/*-----------------------------------------------------  */}
    {/*---------------- Activities Type --------------------  */}
    {/*-----------------------------------------------------  */}
    <Form className="w-50">
        <Form.Group className="mt-4">
          <Form.Label>Tipo de actividad:</Form.Label>
          <Form.Select value={selectedActivity} onChange={(e) => setSelectedActivity(e.target.value)}>
            {activities.map(opcion => (
              <option key={opcion.id} value={opcion.id}>{opcion.activity_type}</option>
            ))}
        </Form.Select>
    </Form.Group>


    {/*-----------------------------------------------------  */}
    {/*---------------- Evidences Type --------------------  */}
    {/*-----------------------------------------------------  */}
    <Form.Group className="mt-4">
          <Form.Label>Evidencia:</Form.Label>
          <Form.Select>
            {evidences.map(opcion => (
              <option key={opcion.id} value={opcion.id}>{opcion.evidence_type}</option>
            ))}
          </Form.Select>
    </Form.Group>

{/*         <EvidencesType/> */}
        
{/*         <Form.Group className="mt-4">
          <Form.Label>Evidencia:</Form.Label>
          <Form.Select>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
            <option value="opcion4">Opción 4</option>
            <option value="opcion5">Opción 5</option>
          </Form.Select>
        </Form.Group> */}

        <Form.Group className="mt-4">
          <Form.Label>Documentos de respaldo:</Form.Label>
          <Form.Control type="file" />
        </Form.Group>

        <Button className="mt-4" variant="primary" type="submit">Enviar</Button>
      </Form>
    </Base>
  );
}
