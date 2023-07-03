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


export const getActivitiesType = () => tasksApi.get('/Activity_Type/');
export const getEvidencesType = () => tasksApi.get('/Evidence_Type/');
export const getSemesters = () => tasksApi.get('/Semester/');
export const getDocuments = () => tasksApi.get('/Document/');



export const createEvidence = (evidence) => tasksApi.post("/Document/", evidence);


export const getAllTasks = () => {
    return tasksApi.get("/"); 
}

export const getTask = (id) => tasksApi.get(`/${id}/`);


export const createTask = (task) => tasksApi.post("/", task);


export const deleteTask  = (id) => {
    return tasksApi.delete(`/${id}`);
}


export const updateTask = (id, task) => tasksApi.put(`/${id}/`, task);
