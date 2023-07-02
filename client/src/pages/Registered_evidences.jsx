import React, { useState, useEffect } from 'react';


import { Base } from './Base';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
/* import {ActivitiesType} from '../components/ActivitiesType' */
/* import {EvidencesType} from '../components/EvidencesType' */


/* ------------- Import Functions from API ------------------ */
import { getActivitiesType } from '../api/task.api';
import { getEvidencesType } from '../api/task.api';
import { getSemesters } from '../api/task.api';

export function Registered_evidences() {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(1);
  const [evidences, setEvidences] = useState([]);
  const [semesters, setSemesters] = useState([]);

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
      const filteredEvidences = res.data.filter(opcion => opcion.activity_type === parseInt(selectedActivity));
      setEvidences(filteredEvidences);
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


  return (
    <Base>
    <h1>Evidencias Registradas</h1>
    <Form className="w-50">
              {/*-----------------------------------------------------  */}
              {/*---------------- Activities Type --------------------  */}
              {/*-----------------------------------------------------  */}
              <Form.Group className="mt-4">
                    <Form.Label>Tipo de actividad:</Form.Label>
                    <Form.Select value={selectedActivity} onChange={(e) => setSelectedActivity(e.target.value)}>
                      {activities.map(opcion => (
                        <option key={opcion.id} value={opcion.id}>{opcion.activity_type}</option>
                      ))}
                  </Form.Select>
              </Form.Group>


              {/*-----------------------------------------------------  */}
              {/*------------------- Evidences Type ------------------  */}
              {/*-----------------------------------------------------  */}
              <Form.Group className="mt-4">
                    <Form.Label>Evidencia:</Form.Label>
                    <Form.Select>
                      {evidences.map(opcion => (
                        <option key={opcion.id} value={opcion.id}>{opcion.evidence_type}</option>
                      ))}
                    </Form.Select>
              </Form.Group>

              {/*-----------------------------------------------------  */}
              {/*----------------------- Semester --------------------  */}
              {/*-----------------------------------------------------  */}
              <Form.Group className="mt-4">
                    <Form.Label>Semestre:</Form.Label>
                    <Form.Select>
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
