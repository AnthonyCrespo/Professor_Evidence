import React, { useState, useEffect } from 'react';
import { getEvidencesType } from '../api/task.api';
import { Form } from 'react-bootstrap';




export function EvidencesType() {
    const [evidences,setEvidences] = useState([])
    
    const [selectedActivity, setSelectedActivity] = useState(1);

    
    useEffect(() => {
        async function loadEvidencesType() {
          const res = await getEvidencesType();
          const filteredEvidences = res.data.filter(opcion => opcion.activity_type === parseInt(selectedActivity));
          setEvidences(filteredEvidences);
          console.log(selectedActivity);
        }
        loadEvidencesType();
      }, [selectedActivity]);


  return (

    <Form.Group className="mt-4">
      <Form.Label>Tipo de Evidencia:</Form.Label>
      <Form.Select>
        {evidences.map(opcion => (
          <option key={opcion.id} value={opcion.evidence_type}>{opcion.evidence_type}</option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

