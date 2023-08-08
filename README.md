# Sistema Académico de Evidencia Docente (SAED)

## Description

This repository includes the source code of the Sistema Académico de Evidencia Docente (SAED), a Web Application oriented to the automation of the record of evidence of the professors of the Yachay Tech University.

The application was developed by Anthony Crespo, and Patricio Mendoza, students at [Yachay Tech University](https://www.yachaytech.edu.ec/en/).


For simplicity in running this project, the current branch makes use of SQLite. However, the project configured with PostgreSQL can be found in the branch
[PostgreSQL](https://github.com/AnthonyCrespo/Professor_Evidence/tree/PostgreSQL)
## Requirements
* [React](https://es.react.dev/)
* [Django](https://www.djangoproject.com/)
* [PostgresQL](https://www.postgresql.org/)
* [Python 3.11](https://www.python.org/)


### Usage

Clone the current repository with:
```
git clone https://github.com/AnthonyCrespo/Professor_Evidence.git
```

Having previously installed node.js, for the frontend, move to the client folder, and execute
```
npm install
```
For the backend, in the main folder, create a python virtual environment and execute: 
```
pip install -r requirements.txt
```
Finally, to run the project execute:
```
python manage.py runserver
```
By default, Django app run on `http://127.0.0.1:8000/`, however, we need to use `localhost:8000` instead.
Additionally, we have registered 3 users, one for each role. In this sense, we have test users brian.crespo, patricio.mendoza, and franklin.camacho with professor, reviewer, and dean roles respectively, and password 123456 in all the cases.

**Note:** If a change is made in the frontend it is necessary to execute `npm run build` in order to see the changes reflected.
## Contact

Anthony Crespo - brian.crespo@yachaytech.edu.ec

Patricio Mendoza - patricio.mendoza@yachaytech.edu.ec


<br>
<br>
