@echo off
python manage.py loaddata .\data\school.json
python manage.py loaddata .\data\career.json
python manage.py loaddata .\data\semester.json

python manage.py loaddata .\data\professor_denomination.json
python manage.py loaddata .\data\professor.json

python manage.py loaddata .\data\semester_school.json
python manage.py loaddata .\data\semester_career.json


python manage.py loaddata .\data\activity_type.json
python manage.py loaddata .\data\evidence_type.json
