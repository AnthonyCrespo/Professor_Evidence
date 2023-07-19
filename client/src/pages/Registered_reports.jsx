import React, { useState, useEffect } from 'react';
import { Base } from './Base';
import { getReports } from '../api/task.api';
import Table from 'react-bootstrap/Table';


import { getSemesters } from '../api/task.api';


export function Registered_reports() {

  const [reports, setReports] = useState([]);
  const [semesters, setSemesters] = useState([]);


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
      console.log(reportsWithSemesterName);
    };
  
    // Ensure that loadReports runs only after semesters state has been updated
    if (semesters.length > 0) {
      loadReports();
    }
  }, [semesters]);
  
  
  return (
    <Base>
    <br/>
    <h1>Informes registrados</h1>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Semestre</th>
          <th>Fecha</th>
          <th>Reporte</th>
          <th>Comentario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((item) => (
          <tr key={item.id}>
           <td>{item.semester_name}</td>
            <td>{item.report_uploadDate}</td>
            <td>{item.report_name}</td>
            <td>{item.report_professorComment}</td>
            <td>
                <button
                  className="btn btn-success"
                  onClick={() => handleVisualizarClick(item.id)}
                >
                  VISUALIZAR
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </Base>
  );
}
