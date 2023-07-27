import React, { useState, useEffect } from 'react';
import  Base  from './Base';
import Table from 'react-bootstrap/Table';

import { getReports } from '../api/task.api';
import { getSemesters } from '../api/task.api';

import { useSelector } from 'react-redux';

export function Registered_reports() {
  const ci = useSelector(state => state.profile.ci);
  console.log("El CI en registered reports es "+ ci)


  const [reports, setReports] = useState([]);
  const [semesters, setSemesters] = useState([]);


  useEffect(() => {
    async function loadSemesters() {
      const res = await getSemesters();
      setSemesters(res.data);
      //console.log(res.data);
    }
    loadSemesters();
  }, []);
  
  useEffect(() => {
    if (semesters.length > 0 && ci) {
      const loadReports = async () => {
        const response = await getReports();
        const filteredReports = response.data.filter(report => report.professor_id === ci);
        const reportsWithSemesterName = filteredReports.map(report => ({
          ...report,
          semester_name: semesters.find(semester => semester.id === report.semester_id)?.semester_name,
        }));
        setReports(reportsWithSemesterName);
        console.log(reportsWithSemesterName)
      };
      loadReports();
    }
  }, [semesters, ci]);
  const greenBgStyle = { backgroundColor: "rgb(176, 227, 117)" };
  const redBgStyle = { backgroundColor: "rgb(242, 133, 132)" };
  
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
          <th>Comentario del Revisor</th>
          <th>Estado (Revisor)</th>
          <th>Estado (Decano)</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
      {reports.length > 0 ? (
            reports.map((item) => (
              <tr key={item.id}>
                <td>{item.semester_name}</td>
                <td>{item.report_uploadDate}</td>
                <td>{item.report_name}</td>
                <td>{item.report_professorComment}</td>
                <td>{item.report_revisorComment}</td>
                <td style={item.report_isReviewed ? greenBgStyle : redBgStyle}>
              {         item.report_isReviewed   ? "APROBADO" : "NO APROBADO"}
                    </td>
                    <td style={item.report_isApproved ? greenBgStyle : redBgStyle}>
              {         item.report_isApproved   ? "APROBADO" : "NO APROBADO"}
                    </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleVisualizarClick(item.id)}
                  >
                    VISUALIZAR
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
            </tr>
          )}
      </tbody>
    </Table>
    </Base>
  );
}
