import React, { useState, useEffect } from 'react';


import  Base  from './Base';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Typeahead} from 'react-bootstrap-typeahead'
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
/* import {ActivitiesType} from '../components/ActivitiesType' */
/* import {EvidencesType} from '../components/EvidencesType' */
import './css/Register_evidence.css';

/* ------------- Import Functions from API ------------------ */
import { getActivitiesType } from '../api/task.api';
import { getEvidencesType } from '../api/task.api';
import { createEvidence } from '../api/task.api';


import { useSelector } from 'react-redux';

export function Register_evidence() {

    const ci = useSelector(state => state.profile.ci);
    console.log("El CI en register evidence es "+ ci)
    const [options, setOptions] = useState([]);

    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(1);
    const [evidences, setEvidences] = useState([]);
    const [selectedEvidence, setSelectedEvidence] = useState(1);
    const [document, setDocument] = useState(null);
    const [professorComment, setProfessorComment] = useState("");


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
        console.log("Estoy cargandooo las evidencias")
      }
      loadEvidencesType();
    }, [selectedActivity]);



    useEffect(() => {
      const loadedOptions = evidences.map(evidence => ({
        value: evidence.id,
        label: evidence.evidence_type
      }));
  
      setOptions(loadedOptions);
    }, [selectedActivity]);

    const handleSelectedEvidenceChange = (selected) => {
      console.log('Selected Evidence:', selected);
    };


    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      reset
    } = useForm();

    const navigate = useNavigate()

    const onSubmit = handleSubmit(async (data) => {
/*       const formData = new FormData();
      formData.append('uploadedDocument', data.document_pathToFile[0]); */
  
      const evidenceData = {
        professor_id: ci, //"0302616099",//"1317858973",
        activity_type: parseInt(selectedActivity),
        evidence_type: parseInt(selectedEvidence),
        semester_id: 1,
        document_revisorComment: " ",
        document_professorComment: professorComment,
        document_uploadDate: formattedDate,
        document_pathToFile: data.document_pathToFile[0].name,
        uploadedDocument: data.document_pathToFile[0]
      };
  
/*       evidenceData.uploadedDocument = formData.get('uploadedDocument');
      console.log(evidenceData.uploadedDocument) */
      console.log(evidenceData)
      await createEvidence(evidenceData);
      //navigate("/home/");

      /* Set form to default values */
      reset();  
      setSelectedActivity(1)
      setSelectedActivity(evidences[0].id)
      setProfessorComment(" ")
      /* setSelectedEvidence(0) */

      /* Show notification */
      toast.success('Evidencia registrada existosamente!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000, // Duración en milisegundos antes de que la notificación se cierre automáticamente
        hideProgressBar: true, // Oculta la barra de progreso
        closeOnClick: true, // Cierra la notificación al hacer clic en ella
        });




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
{/*               <Form.Group className="mt-4">
                <Form.Label>Evidencia:</Form.Label>
                <Select
                  id="evidences"
                  labelKey="label"
                  defaultValue={options[1]}
                  onChange={(selectedOption) => {
                    setSelectedEvidence(selectedOption['value']);
                    console.log(selectedEvidence);
                    setValue('evidence_type', selectedOption['value']);
                  }}
                  options={options}
                  placeholder="Seleccionar evidencia"
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
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && file.type === 'application/pdf') {
                      setValue('document_pathToFile', file);
                      setDocument(file);
                    } else {
                      setValue('document_pathToFile', null);
                      setDocument(null);
                      // Puedes mostrar un mensaje de error aquí o realizar alguna acción adicional
                      console.log('Solo se permiten archivos PDF.');
                    }
                  }}
                  {...register('document_pathToFile', { required: true })}
                />
                {errors.document_pathToFile && <span>Se requiere subir un documento.</span>}
              </Form.Group>

              <Form.Group className="mt-4">
                  <Form.Label>Comentario:</Form.Label>
                  <Form.Control as="textarea" rows={3} 
                                  value={professorComment}
                                  onChange={(e) => {
                                    setProfessorComment(e.target.value)
                                  }}
                  />
              </Form.Group>


              <Button className="mt-4" variant="primary" type="submit">Enviar</Button>
          </Form>
         <ToastContainer />
    </Base>
  );
}
