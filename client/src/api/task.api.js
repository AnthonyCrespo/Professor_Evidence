import axios from 'axios'


/* const tasksApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tasks/'
})
export const getAllTasks = () => {
    return tasksApi.get("/"); 
}


export const getTask = (id) => tasksApi.get(`/${id}/`);


export const createTask = (task) => tasksApi.post("/", task);


export const deleteTask  = (id) => {
    return tasksApi.delete(`/${id}`);
}


export const updateTask = (id, task) => tasksApi.put(`/${id}/`, task);
 */


const tasksApi = axios.create({
    baseURL: 'http://localhost:8000/professor_evidence/api_2/v1/'
})

/* ------------------ GET --------------------------- */
export const getActivitiesType = () => tasksApi.get('/Activity_Type/');
export const getEvidencesType = () => tasksApi.get('/Evidence_Type/');
export const getSemesters = () => tasksApi.get('/Semester/');
export const getDocuments = () => tasksApi.get('/Document/');
export const getProfessors = () => tasksApi.get('/Professor/');
/* export const getReports = (professorId) => tasksApi.get(`/Report/?professor_id=${professorId}`); */
export const getReports = () => tasksApi.get('/Report/');

export const getDocumentByID = (DocumentId) => tasksApi.get(`/Document/${DocumentId}/`);

/* ------------------ POST --------------------------- */
/* export const createEvidence = (evidence) => tasksApi.post("/Document/", evidence); */
export const createReport = (report) => tasksApi.post("/Report/", report);


export const createEvidence = (evidence) => {
    return tasksApi.post("/Document/", evidence, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };
  

/* ------------------ UPDATE --------------------------- */
export const updateReport = (reportId, report) => tasksApi.put(`/Report/${reportId}/`, report);
/* ------------------ PARTIAL UPDATE --------------------------- */
export const updateReportPartial = (reportId, report) => tasksApi.patch(`/Report/${reportId}/`, report);

/* ------------------ PARTIAL --------------------------- */
export const updateDocument = (DocumentId, document) => {
    return tasksApi.patch(`/Document/${DocumentId}/`, document, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };
  


/* ------------------ DELETE --------------------------- */
export const deleteDocumentByID  = (DocumentId) => tasksApi.delete(`/Document/${DocumentId}/`);









export const getAllTasks = () => {
    return tasksApi.get("/"); 
}

export const getTask = (id) => tasksApi.get(`/${id}/`);

export const createTask = (task) => tasksApi.post("/", task);

export const deleteTask  = (id) => {
    return tasksApi.delete(`/${id}`);
}
export const updateTask = (id, task) => tasksApi.put(`/${id}/`, task);
