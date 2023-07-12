import React, { useState, useEffect } from 'react';
import { Base} from './Base';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

import { getActivitiesType } from '../api/task.api';
import { createReport } from '../api/task.api';
import { getReports } from '../api/task.api';
import { getSemesters } from '../api/task.api';

import { updateReport } from '../api/task.api';


import './css/Create_report.css';

export function Create_report() {


  const [activities, setActivities] = useState([]);
  const [reports, setReports] = useState([]);
  const [semesters, setSemesters] = useState([]);

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



  useEffect(() => {
    async function loadSemesters() {
      const res = await getSemesters();
      setSemesters(res.data);
      console.log(res.data);
    }
    loadSemesters();
  }, []);

   useEffect(() => {
    const professorId = '1317858549';
    const loadReports = async () => {
      /* const response = await getReports(professorId); */
      const response = await getReports();
  
      const filteredReports = response.data.filter(report => report.professor_id === professorId);
  
      const reportsWithSemesterName = filteredReports.map(report => ({
        ...report,
        semester_name: semesters.find(semester => semester.id === report.semester_id)?.semester_name,
      }));
  
      setReports(reportsWithSemesterName);

      if (reportsWithSemesterName.length > 0) {
        const firstReport = reportsWithSemesterName[0];
        setForm(prevForm => ({
          ...prevForm,
          teaching_report_summary: firstReport.teaching_report_summary,
          teaching_report_hoursPerWeek: firstReport.teaching_report_hoursPerWeek,
          teaching_report_hoursPerWeekIntersemester: firstReport.teaching_report_hoursPerWeekIntersemester,

          management_report_summary: firstReport.management_report_summary,
          management_report_hoursPerWeek: firstReport.management_report_hoursPerWeek,
          management_report_hoursPerWeekIntersemester: firstReport.management_report_hoursPerWeekIntersemester,

          vinculation_report_summary: firstReport.vinculation_report_summary,
          vinculationt_report_hoursPerWeek: firstReport.vinculationt_report_hoursPerWeek,
          vinculation_report_hoursPerWeekIntersemester: firstReport.vinculation_report_hoursPerWeekIntersemester,

          investigation_report_summary: firstReport.investigation_report_summary,
          investigation_report_hoursPerWeek: firstReport.investigation_report_hoursPerWeek,
          investigation_report_hoursPerWeekIntersemester: firstReport.investigation_report_hoursPerWeekIntersemester,
          report_conclusion: firstReport.report_conclusion,
          report_uploadDate: formattedDate,
        }));
      }
      
    };
  
    // Ensure that loadReports runs only after semesters state has been updated
    if (semesters.length > 0) {
      loadReports();
    }
  }, [semesters]);


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

    if (reports.length > 0) {
          const firstReport = reports[0]; 
         const existingReportId = firstReport["id"]
          console.log(existingReportId)
          await updateReport(existingReportId, form);
    
       } else { 
          // Si no hay un ID de informe existente, crear un nuevo informe
          await createReport(form);
        }
        navigate("/home/");
      });
  
  
  return (
    <Base>
      <h1>Crear informe</h1>

      
        <Form className="w-50"  onSubmit={onSubmit} encType="multipart/form-data">

<Tab.Container defaultActiveKey="docencia">
  <Nav variant="tabs">
    <Nav.Item>
      <Nav.Link eventKey="docencia">Docencia</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="vinculacion">Vinculación</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="investigacion">Investigación</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="gestion">Gestión</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="conclusiones">Conclusiones</Nav.Link>
    </Nav.Item>
  </Nav>

  <Tab.Content>
      <Tab.Pane eventKey="docencia">
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
    </Tab.Pane>


    <Tab.Pane eventKey="vinculacion">
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

    </Tab.Pane>


    <Tab.Pane eventKey="investigacion">
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
    </Tab.Pane>


    <Tab.Pane eventKey="gestion">
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
    </Tab.Pane>

    
    <Tab.Pane eventKey="conclusiones">
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
      <Button className="mt-4" variant="primary" type="submit">Generar reporte</Button>
    </Tab.Pane>
    
  </Tab.Content>
</Tab.Container>
          

        </Form>
    <br/>
    </Base>
  );
}