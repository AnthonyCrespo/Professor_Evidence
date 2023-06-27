import React, { useState, useEffect } from 'react';
import { getActivitiesType } from '../api/task.api';
import { Form } from 'react-bootstrap';




export function ActivitiesType() {
    const [activities,setActivities] = useState([])
    useEffect(() => {
        async function loadActivitiesType() {
            const res = await getActivitiesType();
        setActivities(res.data)
        console.log(res.data)
        }
        loadActivitiesType(); 
    }, []);
  return (

    <Form.Group className="mt-4">
      <Form.Label>Tipo de actividad:</Form.Label>
      <Form.Select>
        {activities.map(opcion => (
          <option key={opcion.id} value={opcion.activity_type}>{opcion.activity_type}</option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

