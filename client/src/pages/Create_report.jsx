import React, { useState, useEffect } from 'react';
import  Base from './Base';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
import { Navigate} from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


import { getActivitiesType } from '../api/task.api';
import { createReport } from '../api/task.api';
import { getReports } from '../api/task.api';
import { getSemesters } from '../api/task.api';

import { updateReport } from '../api/task.api';
import { useSelector } from 'react-redux';

import './css/Create_report.css';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const hoursValidation = yup
.number()
.min(0, 'El número de horas debe ser mayor o igual a 0')
.max(50, 'El número de horas debe ser menor a 50')
.required('Este campo es obligatorio')

const schema = yup.object().shape({
  teaching_report_summary: yup.string().required('Este campo es obligatorio'),
  teaching_report_hoursPerWeek: hoursValidation,
  teaching_report_hoursPerWeekIntersemester: hoursValidation,


  management_report_summary: yup.string().required('Este campo es obligatorio'),
  management_report_hoursPerWeek:hoursValidation,
  management_report_hoursPerWeekIntersemester:hoursValidation,


  vinculation_report_summary: yup.string().required('Este campo es obligatorio'),
  vinculation_report_hoursPerWeek:hoursValidation,
  vinculation_report_hoursPerWeekIntersemester:hoursValidation,


  investigation_report_summary: yup.string().required('Este campo es obligatorio'),
  investigation_report_hoursPerWeek:hoursValidation,
  investigation_report_hoursPerWeekIntersemester:hoursValidation,


  report_conclusion: yup.string().required('Este campo es obligatorio')
});



export function Create_report() {
  const ci = useSelector(state => state.profile.ci);
  //console.log("El CI en create report es "+ ci)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    
  if (!isAuthenticated){
    console.log("El usuario no está autenticado.")
    return <Navigate to='/login' />;
  }

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
    vinculation_report_hoursPerWeek: 0,
    vinculation_report_hoursPerWeekIntersemester: 0,
    
    investigation_report_summary: "",
    investigation_report_hoursPerWeek: 0,
    investigation_report_hoursPerWeekIntersemester: 0,
    
    
    report_name: 'nombre_del_reporte',	
    report_uploadDate: formattedDate,	
    report_professorComment: '',	
    report_revisorComment: '',	
    report_conclusion:	'',
    report_isApproved:	false,
    report_pathToFile: 'path/to/file',	
    professor_id: "",//"",//"0302616099",	
    semester_id: 1,	
    report_reviewedBy: 1,	
    report_approvedBy: 1,
  });


  useEffect(() => {
    async function loadActivitiesType() {
      const res = await getActivitiesType();
      setActivities(res.data);
      //console.log(activities)
    }
    loadActivitiesType();
  }, []);



  useEffect(() => {
    async function loadSemesters() {
      const res = await getSemesters();
      setSemesters(res.data);
      //console.log(res.data);
    }
    loadSemesters();
  }, []);
  /* ------------------------------------------------------ */
  /* ------------- Cargar los reportes ------------------- */
  /* ------------------------------------------------------- */
  useEffect(() => {
    const loadReports = async () => {
      const professorId = ci;
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
          professor_id: firstReport.professor_id,
          teaching_report_summary: firstReport.teaching_report_summary,
          teaching_report_hoursPerWeek: firstReport.teaching_report_hoursPerWeek,
          teaching_report_hoursPerWeekIntersemester: firstReport.teaching_report_hoursPerWeekIntersemester,
          management_report_summary: firstReport.management_report_summary,
          management_report_hoursPerWeek: firstReport.management_report_hoursPerWeek,
          management_report_hoursPerWeekIntersemester: firstReport.management_report_hoursPerWeekIntersemester,
          vinculation_report_summary: firstReport.vinculation_report_summary,
          vinculation_report_hoursPerWeek: firstReport.vinculation_report_hoursPerWeek,
          vinculation_report_hoursPerWeekIntersemester: firstReport.vinculation_report_hoursPerWeekIntersemester,
          investigation_report_summary: firstReport.investigation_report_summary,
          investigation_report_hoursPerWeek: firstReport.investigation_report_hoursPerWeek,
          investigation_report_hoursPerWeekIntersemester: firstReport.investigation_report_hoursPerWeekIntersemester,
          report_conclusion: firstReport.report_conclusion,
          report_professorComment: firstReport.report_professorComment,
          report_uploadDate: formattedDate,
        }));
    // Usamos un bucle para asignar los valores a todos los campos
      for (const fieldName in firstReport) {
          setValue(fieldName, firstReport[fieldName]);
        }
      }else{
        for (const fieldName in form) {
          setValue(fieldName, form[fieldName]);
        }
  
      }
    }

    // Ensure that loadReports runs whenever semesters, ci, or reports state changes.
    if (semesters.length > 0 && ci) {
      loadReports();
    }
  }, [semesters, ci]);


  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // }

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues
  } = useForm({
    resolver: yupResolver(schema),
  });

  
  const onSubmit = handleSubmit(async (data) => {
    console.log(form)
    console.log(data)
    console.log("el valor en el form es " + getValues("teaching_report_summary"))
    try {
      if (reports.length > 0) {
        const firstReport = reports[0]; 
        const existingReportId = firstReport["id"];
        //console.log("El CI para el update es " + ci);
        //console.log(form)
        await updateReport(existingReportId, data);
        toast.success('Reporte actualizado exitosamente!', {
          position: toast.POSITION.BOTTOM_RIGHT})
      } else { 
        // Si no hay un ID de informe existente, crear un nuevo informe
        //console.log("El CI en create report es "+ ci)
        form.professor_id = ci;
        data.professor_id = ci;
        await createReport(data);
        toast.success('Reporte generado exitosamente!', {
          position: toast.POSITION.BOTTOM_RIGHT})
      }

      //navigate("/home/");
    } catch (error) {
      // Capturar y mostrar el error
      console.error("Error en createReport:", error);
      // Aquí puedes realizar otras acciones relacionadas con el manejo del error, si es necesario.
    }
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
    <Nav.Item>
      <Nav.Link eventKey="comentario">Comentario</Nav.Link>
    </Nav.Item>
  </Nav>

  <Tab.Content>
          {/*---------------------------------------------------------------------------  */}
          {/*---------------------------------------------------------------------------  */}
          {/*---------------------------- Docencia -------------------------------------  */}
          {/*---------------------------------------------------------------------------  */}
          {/*---------------------------------------------------------------------------  */}
          <Tab.Pane eventKey="docencia">
          <Form.Group className="mt-4">
                    <Form.Label>Resumen:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3} 
                      //value =  {getValues("teaching_report_summary")} /* {form.teaching_report_summary} */
                      onChange={(e) => {
                        setValue('teaching_report_summary', e.target.value);
                        setForm(prevForm => ({
                          ...prevForm,
                          teaching_report_summary: e.target.value
                        }));
                      }}
                      {...register("teaching_report_summary")}
                    />
                      {errors.teaching_report_summary && (
                          <span className="text-danger">{errors.teaching_report_summary.message}</span>
                        )}
          </Form.Group>

          <Form.Group className="mt-4">
                  <Form.Label>Número promedio de horas por semana dedicadas:</Form.Label>
                  <Form.Control type="number"
                                                //value={form.teaching_report_hoursPerWeek}
                                                onChange={(e) => {
                                                  setValue('teaching_report_hoursPerWeek', e.target.value);
                                                  setForm(prevForm => ({
                                                  ...prevForm,
                                                  teaching_report_hoursPerWeek: parseInt(e.target.value)
                                                }));
                                                }}
                                                {...register("teaching_report_hoursPerWeek")}
                                      />

                        {errors.teaching_report_hoursPerWeek && (
                          <span className="text-danger">{errors.teaching_report_hoursPerWeek.message}</span>
                        )}
                </Form.Group>

                <Form.Group className="mt-4 mb-4">
                  <Form.Label>Número promedio de horas por semana dedicadas en el intersemestre:</Form.Label>
                  <Form.Control type="number" 
                                                //value={form.teaching_report_hoursPerWeekIntersemester}
                                                onChange={(e) => {
                                                  setValue('teaching_report_hoursPerWeekIntersemester', e.target.value);
                                                  setForm(prevForm => ({
                                                ...prevForm,
                                                teaching_report_hoursPerWeekIntersemester: parseInt(e.target.value)
                                              }));
                                              }}
                                              {...register("teaching_report_hoursPerWeekIntersemester")}
                                                              />
                        {errors.teaching_report_hoursPerWeekIntersemester && (
                          <span className="text-danger">{errors.teaching_report_hoursPerWeekIntersemester.message}</span>
                        )}
          </Form.Group>
        </Tab.Pane>

          {/*---------------------------------------------------------------------------  */}
          {/*---------------------------------------------------------------------------  */}
          {/*-------------------------- Vinculacion ------------------------------------  */}
          {/*---------------------------------------------------------------------------  */}
          {/*---------------------------------------------------------------------------  */}
        <Tab.Pane eventKey="vinculacion">
              <Form.Group className="mt-4">
                      <Form.Label>Resumen:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3} 
                        //value =  {getValues("vinculation_report_summary")} /* {form.vinculation_report_summary} */
                        onChange={(e) => {
                          setValue('vinculation_report_summary', e.target.value);
                          setForm(prevForm => ({
                            ...prevForm,
                            vinculation_report_summary: e.target.value
                          }));
                        }}
                        {...register("vinculation_report_summary")}
                      />
                        {errors.vinculation_report_summary && (
                            <span className="text-danger">{errors.vinculation_report_summary.message}</span>
                          )}
            </Form.Group>

            <Form.Group className="mt-4">
                    <Form.Label>Número promedio de horas por semana dedicadas:</Form.Label>
                    <Form.Control type="number" 
                                                  //value={form.vinculation_report_hoursPerWeek}
                                                  onChange={(e) => {
                                                    setValue('vinculation_report_hoursPerWeek', e.target.value);
                                                    setForm(prevForm => ({
                                                    ...prevForm,
                                                    vinculation_report_hoursPerWeek: parseInt(e.target.value)
                                                  }));
                                                  }}
                                                  {...register("vinculation_report_hoursPerWeek")}
                                        />
                              {errors.vinculation_report_hoursPerWeek && (
                                <span className="text-danger">{errors.vinculation_report_hoursPerWeek.message}</span>
                              )}
                  </Form.Group>

                  <Form.Group className="mt-4 mb-4">
                    <Form.Label>Número promedio de horas por semana dedicadas en el intersemestre:</Form.Label>
                    <Form.Control type="number" 
                                                  //value={form.vinculation_report_hoursPerWeekIntersemester}
                                                  onChange={(e) => {
                                                    setValue('vinculation_report_hoursPerWeekIntersemester', e.target.value);
                                                    setForm(prevForm => ({
                                                  ...prevForm,
                                                  vinculation_report_hoursPerWeekIntersemester: parseInt(e.target.value)
                                                }));
                                                }}
                                                {...register("vinculation_report_hoursPerWeekIntersemester")}
                                          />
                               {errors.vinculation_report_hoursPerWeekIntersemester && (
                                <span className="text-danger">{errors.vinculation_report_hoursPerWeekIntersemester.message}</span>
                              )}
            </Form.Group>

        </Tab.Pane>

          {/*---------------------------------------------------------------------------  */}
          {/*---------------------------------------------------------------------------  */}
          {/*-------------------------- Investigación-----------------------------------  */}
          {/*---------------------------------------------------------------------------  */}
          {/*---------------------------------------------------------------------------  */}
        <Tab.Pane eventKey="investigacion">
                  <Form.Group className="mt-4">
                          <Form.Label>Resumen:</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3} 
                            //value =  {getValues("investigation_report_summary")} /* {form.investigation_report_summary} */
                            onChange={(e) => {
                              setValue('investigation_report_summary', e.target.value);
                              setForm(prevForm => ({
                                ...prevForm,
                                investigation_report_summary: e.target.value
                              }));
                            }}
                            {...register("investigation_report_summary")}
                          />
                            {errors.investigation_report_summary && (
                                <span className="text-danger">{errors.investigation_report_summary.message}</span>
                              )}
                </Form.Group>

                <Form.Group className="mt-4">
                        <Form.Label>Número promedio de horas por semana dedicadas:</Form.Label>
                        <Form.Control type="number"
                                                      //value={form.investigation_report_hoursPerWeek}
                                                      onChange={(e) => {
                                                        setValue('investigation_report_hoursPerWeek', e.target.value);
                                                        setForm(prevForm => ({
                                                        ...prevForm,
                                                        investigation_report_hoursPerWeek: parseInt(e.target.value)
                                                      }));
                                                      }}
                                                      {...register("investigation_report_hoursPerWeek")}
                                            />
                            {errors.investigation_report_hoursPerWeek && (
                              <span className="text-danger">{errors.investigation_report_hoursPerWeek.message}</span>
                            )}
              </Form.Group>

              <Form.Group className="mt-4 mb-4">
                <Form.Label>Número promedio de horas por semana dedicadas en el intersemestre:</Form.Label>
                <Form.Control type="number"
                                              //value={form.investigation_report_hoursPerWeekIntersemester}
                                              onChange={(e) => {
                                                setValue('investigation_report_hoursPerWeekIntersemester', e.target.value);
                                                setForm(prevForm => ({
                                              ...prevForm,
                                              investigation_report_hoursPerWeekIntersemester: parseInt(e.target.value)
                                            }));
                                            }}
                                            {...register("investigation_report_hoursPerWeekIntersemester")}
                                                            />
                            {errors.investigation_report_hoursPerWeekIntersemester && (
                              <span className="text-danger">{errors.investigation_report_hoursPerWeekIntersemester.message}</span>
                            )}
              </Form.Group>

                </Tab.Pane>

                    {/*---------------------------------------------------------------------------  */}
                    {/*---------------------------------------------------------------------------  */}
                    {/*----------------------------- Gestión -------------------------------------  */}
                    {/*---------------------------------------------------------------------------  */}
                    {/*---------------------------------------------------------------------------  */}
                  <Tab.Pane eventKey="gestion">
                  <Form.Group className="mt-4">
                    <Form.Label>Resumen:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3} 
                      //value =  {getValues("management_report_summary")} /* {form.management_report_summary} */
                      onChange={(e) => {
                        setValue('management_report_summary', e.target.value);
                        setForm(prevForm => ({
                          ...prevForm,
                          management_report_summary: e.target.value
                        }));
                      }}
                      {...register("management_report_summary")}
                    />
                      {errors.management_report_summary && (
                          <span className="text-danger">{errors.management_report_summary.message}</span>
                        )}
          </Form.Group>

          <Form.Group className="mt-4">
                  <Form.Label>Número promedio de horas por semana dedicadas:</Form.Label>
                  <Form.Control type="number"
                                                //value={form.management_report_hoursPerWeek}
                                                onChange={(e) => {
                                                  setValue('management_report_hoursPerWeek', e.target.value);
                                                  setForm(prevForm => ({
                                                  ...prevForm,
                                                  management_report_hoursPerWeek: parseInt(e.target.value)
                                                }));
                                                }}
                                                {...register("management_report_hoursPerWeek")}
                                      />
                                  {errors.management_report_hoursPerWeek && (
                                    <span className="text-danger">{errors.management_report_hoursPerWeek.message}</span>
                                  )}
                </Form.Group>

                <Form.Group className="mt-4 mb-4">
                  <Form.Label>Número promedio de horas por semana dedicadas en el intersemestre:</Form.Label>
                  <Form.Control type="number"
                                                //value={form.management_report_hoursPerWeekIntersemester}
                                                onChange={(e) => {
                                                  setValue('management_report_hoursPerWeekIntersemester', e.target.value);
                                                  setForm(prevForm => ({
                                                ...prevForm,
                                                management_report_hoursPerWeekIntersemester: parseInt(e.target.value)
                                              }));
                                              }}
                                              {...register("management_report_hoursPerWeekIntersemester")}
                                                              />
                                  {errors.management_report_hoursPerWeekIntersemester && (
                                    <span className="text-danger">{errors.management_report_hoursPerWeekIntersemester.message}</span>
                                  )}
          </Form.Group>

        </Tab.Pane>

        
        <Tab.Pane eventKey="conclusiones">
          <Form.Group className="mt-4">
                <Form.Label>Conclusiones:</Form.Label>
                <Form.Control as="textarea" rows={3} 
                                              //value={form.report_conclusion}
                                              onChange={(e) => {
                                                setValue('report_conclusion', e.target.value);
                                                setForm(prevForm => ({
                                                ...prevForm,
                                                report_conclusion: e.target.value
                                              }));
                                              }}
                                              {...register("report_conclusion")}
                                              />

                            {errors.report_conclusion && (
                              <span className="text-danger">{errors.report_conclusion.message}</span>
                            )}
          </Form.Group>
        </Tab.Pane>


        <Tab.Pane eventKey="comentario">
          <Form.Group className="mt-4">
                <Form.Label>Comentario:</Form.Label>
                <Form.Control as="textarea" rows={3} 
                                              //value={form.report_professorComment}
                                              onChange={(e) => {
                                                setValue('report_professorComment', e.target.value);
                                                setForm(prevForm => ({
                                                ...prevForm,
                                                report_professorComment: e.target.value
                                              }));
                                              }}/>
          </Form.Group>
          <Button className="mt-4" variant="primary" type="submit">Generar reporte</Button>
        </Tab.Pane>
        
      </Tab.Content>
    </Tab.Container>
          

        </Form>
    <br/>
    <ToastContainer />
    </Base>
  );
}