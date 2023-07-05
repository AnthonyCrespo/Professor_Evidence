import React, { useState, useEffect } from 'react';
import { Base} from './Base';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


import { getActivitiesType } from '../api/task.api';

import './css/Create_report.css';

export function Create_report() {


  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(1);
  const [evidences, setEvidences] = useState([]);
  const [selectedEvidence, setSelectedEvidence] = useState(1);


  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

  const [form, setForm] = useState({
    report_name: ' ',	
    report_uploadDate: formattedDate,	
    report_professorComment: ' ',	
    report_revisorComment: ' ',	
    report_conclusion:	' ',
    report_isApproved:	false,
    report_pathToFile: ' ',	
    professor_id: "1317858973",	
    activity_report_teaching_id: ' ',	
    activity_report_management_id: ' ',	
    activity_report_vinculation_id: ' ',	
    activity_report_investigation_id: ' ',	
    semester_id: 1,	
    report_reviewedBy: ' ',	
    report_approvedBy: ' ',
  });




  useEffect(() => {
    async function loadActivitiesType() {
      const res = await getActivitiesType();
      setActivities(res.data);
      console.log(activities)
    }
    loadActivitiesType();
  }, []);


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
      activity_type: parseInt(selectedActivity), //parseInt(data.activity_type),
      evidence_type: parseInt(selectedEvidence),//parseInt(selectedActivity),
      semester_id: 1
    };


    console.log(evidence_data)
    await  createEvidence(evidence_data);
    navigate("/home/")
    })
  
  
  const renderFields = (category) => {
    return (
      <>
        <h2>{category}</h2>
        <Form.Group className="mt-4">
          <Form.Label>Resumen:</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Form.Group className="mt-4">
          <Form.Label>Número promedio de horas por semana dedicadas:</Form.Label>
          <Form.Control type="number" min="0" max="100" />
        </Form.Group>

        <Form.Group className="mt-4 mb-4">
          <Form.Label>Número promedio de horas por semana dedicadas en el intersemestre:</Form.Label>
          <Form.Control type="number" min="0" max="100"  />
        </Form.Group>
      </>
    );
  };

  return (
    <Base>
      <h1>Crear informe</h1>

      
        <Form className="w-50"  onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
{/*           <Form.Group className="mt-4">
            <Form.Label>Tipo de actividad:</Form.Label>
            <Form.Select>
              <option value="docencia">Docencia</option>
              <option value="investigacion">Investigación</option>
              <option value="vinculacion">Vinculación con la sociedad</option>
              <option value="gestion">Gestión educativa</option>
            </Form.Select>
          </Form.Group> */}

        {activities.map((activity) => (
          <React.Fragment key={activity.id}>
            <h2>{activity.activity_type}</h2>
            <Form.Group className="mt-4">
              <Form.Label>Resumen:</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>

            <Form.Group className="mt-4">
              <Form.Label>Número promedio de horas por semana dedicadas:</Form.Label>
              <Form.Control type="number" min="0" max="100" />
            </Form.Group>

            <Form.Group className="mt-4 mb-4">
              <Form.Label>Número promedio de horas por semana dedicadas en el intersemestre:</Form.Label>
              <Form.Control type="number" min="0" max="100" />
            </Form.Group>
          </React.Fragment>
        ))}

          <h2 className = "h2_conclusiones">Conclusiones</h2>
          <Form.Group className="mt-4">
            <Form.Label>Conclusiones:</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          
          <Button className="mt-4" variant="primary" type="submit">Enviar</Button>
        </Form>
    <br/>
    </Base>
  );
}
