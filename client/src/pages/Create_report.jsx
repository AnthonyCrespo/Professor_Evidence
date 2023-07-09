import React, { useState, useEffect } from 'react';
import { Base} from './Base';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


import { getActivitiesType } from '../api/task.api';
import { createrReport } from '../api/task.api';


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

    teaching_report_summary: "",
    teaching_report_hoursPerWeek: 0,
    teaching_report_hoursPerWeekIntersemester: 0,
    
    management_report_summary: "",
    management_report_hoursPerWeek: 0,
    management_report_hoursPerWeekIntersemester: 0,
    
    vinculation_report_summary: "",
    vinculationt_report_hoursPerWeek: 0,
    vinculation_report_hoursPerWeekIntersemester: 0,
    
    investigation_report_summary: "",
    investigation_report_hoursPerWeek: 0,
    investigation_report_hoursPerWeekIntersemester: 0,
    
    
    report_name: 'nombre_del_reporte',	
    report_uploadDate: formattedDate,	
    report_professorComment: 'comentario del profe',	
    report_revisorComment: 'comentario del revisor',	
    report_conclusion:	'',
    report_isApproved:	false,
    report_pathToFile: 'path/to/file',	
    professor_id: "1317858549",	
    semester_id: 1,	
    report_reviewedBy: 1,	
    report_approvedBy: 1,
  });


  useEffect(() => {
    async function loadActivitiesType() {
      const res = await getActivitiesType();
      setActivities(res.data);
      console.log(activities)
    }
    loadActivitiesType();
  }, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const navigate = useNavigate()

  
  const onSubmit = handleSubmit(async () => {
    console.log(form)
    await   createrReport (form);
    navigate("/home/")
    })
  
  
  return (
    <Base>
      <h1>Crear informe</h1>

      
        <Form className="w-50"  onSubmit={onSubmit} encType="multipart/form-data">
{/*         {activities.map((activity) => (
          <React.Fragment key={activity.id}>
            <h2>{activity.activity_type}</h2>
            <Form.Group className="mt-4">
              <Form.Label>Resumen:</Form.Label>
              <Form.Control as="textarea" rows={3} 
                               value={form.teaching_report_summary}
                               onChange={(e) => {setForm(prevForm => ({
                                ...prevForm,
                                teaching_report_summary: e.target.value
                              }));
                                console.log(form)
                              }}
              />
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
        ))} */}
            <h2>Docencia</h2>
            <Form.Group className="mt-4">
              <Form.Label>Resumen:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3} 
                value={form.teaching_report_summary}
                onChange={(e) => {
                  setValue('teaching_report_summary', e.target.value);
                  setForm(prevForm => ({
                    ...prevForm,
                    teaching_report_summary: e.target.value
                  }));
                }}
/* '                {...register('teaching_report_summary', { required: true })}' */
              />
              {errors.teaching_report_summary && <span>Este campo es obligatorio</span>}
            </Form.Group>


            <Form.Group className="mt-4">
              <Form.Label>Número promedio de horas por semana dedicadas:</Form.Label>
              <Form.Control type="number" min="0" max="100" 
                                             value={form.teaching_report_hoursPerWeek}
                                             onChange={(e) => {setForm(prevForm => ({
                                              ...prevForm,
                                              teaching_report_hoursPerWeek: parseInt(e.target.value)
                                            }));
                                            }}/>
            </Form.Group>

            <Form.Group className="mt-4 mb-4">
              <Form.Label>Número promedio de horas por semana dedicadas en el intersemestre:</Form.Label>
              <Form.Control type="number" min="0" max="100" 
                                            value={form.teaching_report_hoursPerWeekIntersemester}
                                            onChange={(e) => {setForm(prevForm => ({
                                            ...prevForm,
                                            teaching_report_hoursPerWeekIntersemester: parseInt(e.target.value)
                                          }));
                                          }}
                                                          />
            </Form.Group>

            <h2>Vinculación</h2>
            <Form.Group className="mt-4">
              <Form.Label>Resumen:</Form.Label>
              <Form.Control as="textarea" rows={3} 
                               value={form.vinculation_report_summary}
                               onChange={(e) => {setForm(prevForm => ({
                                ...prevForm,
                                vinculation_report_summary: e.target.value
                              }));
                              }}
              />
            </Form.Group>

            <Form.Group className="mt-4">
              <Form.Label>Número promedio de horas por semana dedicadas:</Form.Label>
              <Form.Control type="number" min="0" max="100" 
                                             value={form.vinculationt_report_hoursPerWeek}
                                             onChange={(e) => {setForm(prevForm => ({
                                              ...prevForm,
                                              vinculationt_report_hoursPerWeek: parseInt(e.target.value)
                                            }));
                                            }}/>
            </Form.Group>

            <Form.Group className="mt-4 mb-4">
              <Form.Label>Número promedio de horas por semana dedicadas en el intersemestre:</Form.Label>
              <Form.Control type="number" min="0" max="100" 
                                            value={form.vinculation_report_hoursPerWeekIntersemester}
                                            onChange={(e) => {setForm(prevForm => ({
                                            ...prevForm,
                                            vinculation_report_hoursPerWeekIntersemester: parseInt(e.target.value)
                                          }));
                                          }}
                                                          />
            </Form.Group>


            <h2>Investigación</h2>
            <Form.Group className="mt-4">
              <Form.Label>Resumen:</Form.Label>
              <Form.Control as="textarea" rows={3} 
                               value={form.investigation_report_summary}
                               onChange={(e) => {setForm(prevForm => ({
                                ...prevForm,
                                investigation_report_summary: e.target.value
                              }));
                              }}
              />
            </Form.Group>

            <Form.Group className="mt-4">
              <Form.Label>Número promedio de horas por semana dedicadas:</Form.Label>
              <Form.Control type="number" min="0" max="100" 
                                             value={form.investigation_report_hoursPerWeek}
                                             onChange={(e) => {setForm(prevForm => ({
                                              ...prevForm,
                                              investigation_report_hoursPerWeek: parseInt(e.target.value)
                                            }));
                                            }}/>
            </Form.Group>

            <Form.Group className="mt-4 mb-4">
              <Form.Label>Número promedio de horas por semana dedicadas en el intersemestre:</Form.Label>
              <Form.Control type="number" min="0" max="100" 
                                            value={form.investigation_report_hoursPerWeekIntersemester}
                                            onChange={(e) => {setForm(prevForm => ({
                                            ...prevForm,
                                            investigation_report_hoursPerWeekIntersemester: parseInt(e.target.value)
                                          }));
                                          }}
                                                          />
            </Form.Group>
            <h2>Gestión</h2>
            <Form.Group className="mt-4">
              <Form.Label>Resumen:</Form.Label>
              <Form.Control as="textarea" rows={3} 
                               value={form.management_report_summary}
                               onChange={(e) => {setForm(prevForm => ({
                                ...prevForm,
                                management_report_summary: e.target.value
                              }));
                              }}
              />
            </Form.Group>

            <Form.Group className="mt-4">
              <Form.Label>Número promedio de horas por semana dedicadas:</Form.Label>
              <Form.Control type="number" min="0" max="100" 
                                             value={form.management_report_hoursPerWeek}
                                             onChange={(e) => {setForm(prevForm => ({
                                              ...prevForm,
                                              management_report_hoursPerWeek: parseInt(e.target.value)
                                            }));
                                            }}/>
            </Form.Group>

            <Form.Group className="mt-4 mb-4">
              <Form.Label>Número promedio de horas por semana dedicadas en el intersemestre:</Form.Label>
              <Form.Control type="number" min="0" max="100" 
                                            value={form.management_report_hoursPerWeekIntersemester}
                                            onChange={(e) => {setForm(prevForm => ({
                                            ...prevForm,
                                            management_report_hoursPerWeekIntersemester: parseInt(e.target.value)
                                          }));
                                          }}
                                                          />
            </Form.Group>
          <h2 className = "h2_conclusiones">Conclusiones</h2>
          <Form.Group className="mt-4">
            <Form.Label>Conclusiones:</Form.Label>
            <Form.Control as="textarea" rows={3} 
                                           value={form.report_conclusion}
                                           onChange={(e) => {setForm(prevForm => ({
                                            ...prevForm,
                                            report_conclusion: e.target.value
                                          }));
                                          }}/>
          </Form.Group>

          
          <Button className="mt-4" variant="primary" type="submit">Enviar</Button>
        </Form>
    <br/>
    </Base>
  );
}
