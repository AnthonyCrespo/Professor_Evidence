CREATE TABLE IF NOT EXISTS public.activity_type
(
    activity_type_id integer NOT NULL DEFAULT nextval('activity_type_activity_type_id_seq'::regclass),
    activity_type character varying(13) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT activity_type_pkey PRIMARY KEY (activity_type_id)
);
INSERT INTO activity_type(activity_type_id, activity_type) VALUES (1,'Docencia');
INSERT INTO activity_type(activity_type_id, activity_type) VALUES (2,'Vinculación');
INSERT INTO activity_type(activity_type_id, activity_type) VALUES (3,'Investigación');
INSERT INTO activity_type(activity_type_id, activity_type) VALUES (4,'Gestión');


CREATE TABLE IF NOT EXISTS public.evidence_type
(
    evidence_type_id integer NOT NULL DEFAULT nextval('evidence_type_evidence_type_id_seq'::regclass),
    activity_type integer NOT NULL,
    evidence_type character varying(248) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT evidence_type_pkey PRIMARY KEY (evidence_type_id),
    CONSTRAINT evidence_type_activity_type_fkey FOREIGN KEY (activity_type)
        REFERENCES public.activity_type (activity_type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (1,'Impartir clases, seminarios, talleres, entre otros.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (1,'Planificar y actualizar contenidos de clases, seminarios, talleres, entre otros.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (1,'Diseñar y elaborar material didáctico, guías docentes o syllabus.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (1,'Diseñar y elaborar textos.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (1,'Orientar y acompañar a los estudiantes a través de tutorías, individuales o grupales.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (1,'Realizar visitas de campo, tutorías, docencia en servicio y formación dual.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (1,'Llevar a cabo la dirección, tutorías, seguimiento y evaluación de prácticas o pasantías preprofesionales.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (1,'Preparar, elaborar, aplicar y calificar exámenes, trabajos y prácticas.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (1,'Efectuar la dirección y tutoría de trabajos para la obtención del título.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (1,'Direccionar y participar en proyectos de experimentación e innovación docente.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (1,'Diseñar e impartir cursos de educación continua o de capacitación y actualización.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (1,'Participar y organizar colectivos académicos de debate, capacitación o intercambio de metodologías y experiencias de enseñanza.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (1,'Llevar a cabo el uso pedagógico de la investigación formativa y la sistematización como soporte o parte de la enseñanza.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (1,'Coordinar los aprendizajes prácticos y de laboratorio.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (2,'Impulsar procesos de cooperación y desarrollo.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (2,'Prestar la asistencia técnica, de servicios especializados, así como la participación en consultorías que generen beneficio a la colectividad.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (2,'Impartir cursos de educación continua, capacitación, actualización y certificación de competencias.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (2,'Prestar servicios a la sociedad tales como el análisis de laboratorio especializado, el peritaje, la revisión técnica documental, entre otros.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (2,'Fomentar la constitución, desarrollo y fortalecimiento de organizaciones de la sociedad civil, redes y demás espacios de participación ciudadana.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (2,'Organizar o participar en actividades de divulgación, democratización y distribución del saber.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (2,'Promocionar la internacionalización de la comunidad académica superior e impulso de las relaciones internacionales.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (2,'Desarrollar proyectos de innovación que permitan aplicar los conocimientos generados en las IES, en proyectos productivos o de beneficio social.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (2,'Dar guía y seguimiento a estudiantes que participen en proyectos de vinculación y evaluar prácticas preprofesionales de servicio comunitario desarrolladas en dichos proyectos.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (3,'Diseñar, direccionar y ejecutar proyectos de investigación básica, aplicada, tecnológica y en artes, o proyectos de vinculación articulados a la investigación, que supongan creación, innovación, difusión y transferencia de los resultados obtenidos.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (3,'Realizar investigación para la comprensión, recuperación, fortalecimiento y potenciación de los saberes ancestrales.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (3,'Diseñar, elaborar y poner en marcha metodologías, instrumentos, protocolos o procedimientos operativos o de investigación.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (3,'Investigar en laboratorios, centros documentales y demás instalaciones habilitadas para esta función, así como en entornos sociales.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (3,'Participar en congresos, seminarios y conferencias para la presentación de avances y resultados de sus investigaciones.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (3,'Participar en congresos, seminarios y conferencias para la presentación de avances y resultados de sus investigaciones.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (3,'Diseñar y participar en redes y programas de investigación local, nacional e internacional.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (3,'Participar en comités o consejos académicos y editoriales de revistas científicas y académicas indexadas y/o arbitradas.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (3,'Llevar a cabo la difusión de resultados y beneficios sociales de la investigación, a través de ciones, producciones artísticas, actuaciones, conciertos, creación u organización de instalaciones y de exposiciones, entre otros.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (3,'Direccionar o participar en colectivos académicos de debate para la presentación de avances y resultados de investigaciones.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (4,'Desempeñar las funciones como rector, vicerrector o integrante del órgano colegiado superior.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (4,'Desempeñar las funciones o cargos de decano, subdecano o similar jerarquía.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (4,'Dirigir escuelas, departamentos, centros o institutos de investigación.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (4,'Dirigir y/o coordinar carreras o programas.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (4,'Dirigir y/o gestionar los procesos de docencia, investigación y vinculación con la sociedad en sus distintos niveles de organización académica e institucional.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (4,'Organizar y/o dirigir eventos académicos nacionales o internacionales.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (4,'Desempeñar cargos tales como: editor académico, director o miembro editorial de una ción.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (4,'Diseñar proyectos de carreras y programas de estudios de grado y posgrado.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (4,'Participar como delegado institucional en organismos públicos u otros que forman parte del Sistema de Educación Superior, así como sociedades científicas o académicas.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (4,'Participar como evaluador o facilitador académico externo del CES, el CACES, el órgano Rector de la Política Pública de Educación Superior u otro organismo público de investigación o desarrollo tecnológico.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (4,'Participar como representante del estamento de profesores e investigadores de acuerdo con el estatuto de la IES particular en las sesiones del órgano colegiado superior.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (4,'Integrar en calidad de Consejero Académico de los organismos que rigen el Sistema de Educación Superior (CES y CACES); en estos casos, se reconocerá la dedicación como equivalente a tiempo completo.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (4,'Ejercer cargos de nivel jerárquico superior en el órgano Rector de la Política Pública de Educación Superior; en estos casos se reconocerá la dedicación como equivalente a tiempo completo.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (4,'Formar parte de COMISIONES académicas en escuelas.');
INSERT INTO evidence_type(activity_type,evidence_type) VALUES (4,'Participar en capacitaciones de formación pedagógica.');


CREATE TABLE IF NOT EXISTS public.semester
(
    semester_name character varying(8) COLLATE pg_catalog."default" NOT NULL,
    date_start date NOT NULL,
    date_end date NOT NULL,
    CONSTRAINT semester_pkey PRIMARY KEY (semester_name)
);
INSERT INTO semester(semester_name,date_start,date_end) VALUES ('S01_2023','2023-04-17','2023-08-13');


CREATE TABLE IF NOT EXISTS public.school
(
    school_name character varying(56) COLLATE pg_catalog."default" NOT NULL,
    school_abbreviation character varying(5) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT school_pkey PRIMARY KEY (school_abbreviation)
);
INSERT INTO school(school_name,school_abbreviation) VALUES ('Escuela de Ciencias Matemáticas y Tecnología Informática','ECMTI');
INSERT INTO school(school_name,school_abbreviation) VALUES ('Escuela de Ciencias Físicas y Nanotecnología','ECFN');
INSERT INTO school(school_name,school_abbreviation) VALUES ('Escuela de Ciencias Biológicas e Ingeniería','ECBI');
INSERT INTO school(school_name,school_abbreviation) VALUES ('Escuela de Ciencias Químicas e Ingeniería','ECQI');
INSERT INTO school(school_name,school_abbreviation) VALUES ('Escuela de Ciencias Geológicas e Ingeniería','ECGI');


CREATE TABLE IF NOT EXISTS public.career
(
    school_abbreviation character varying(5) COLLATE pg_catalog."default" NOT NULL,
    career_id integer NOT NULL DEFAULT nextval('career_career_id_seq'::regclass),
    career_name character varying(28) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT career_pkey PRIMARY KEY (career_id),
    CONSTRAINT career_school_abbreviation_fkey FOREIGN KEY (school_abbreviation)
        REFERENCES public.school (school_abbreviation) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
INSERT INTO career(school_abbreviation,career_name) VALUES ('ECMTI', 'Matemáticas');
INSERT INTO career(school_abbreviation,career_name) VALUES ('ECMTI', 'Computación');
INSERT INTO career(school_abbreviation,career_name) VALUES ('ECBI', 'Biología');
INSERT INTO career(school_abbreviation,career_name) VALUES ('ECBI', 'Biomedicina');
INSERT INTO career(school_abbreviation,career_name) VALUES ('ECFN', 'Ingeniería en Nanotecnología');
INSERT INTO career(school_abbreviation,career_name) VALUES ('ECFN', 'Física');
INSERT INTO career(school_abbreviation,career_name) VALUES ('ECQI', 'Materiales');
INSERT INTO career(school_abbreviation,career_name) VALUES ('ECQI', 'Química');
INSERT INTO career(school_abbreviation,career_name) VALUES ('ECGI', 'Agroindustria');
INSERT INTO career(school_abbreviation,career_name) VALUES ('ECGI', 'Geología');


CREATE TABLE IF NOT EXISTS public.professor
(
    professor_id integer NOT NULL DEFAULT nextval('professor_professor_id_seq'::regclass),
    career_id integer NOT NULL,
    professor_degree character varying(3) COLLATE pg_catalog."default" NOT NULL,
    professor_names character varying(15) COLLATE pg_catalog."default" NOT NULL,
    professor_lastnames character varying(13) COLLATE pg_catalog."default" NOT NULL,
    professor_denomination character varying(8) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT professor_pkey PRIMARY KEY (professor_id),
    CONSTRAINT professor_career_id_fkey FOREIGN KEY (career_id)
        REFERENCES public.career (career_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
INSERT INTO professor(career_id,professor_degree,professor_names,professor_lastnames,professor_denomination) VALUES (1,'PhD','Patricio Joshue','Mendoza Núñez','Profesor');
INSERT INTO professor(career_id,professor_degree,professor_names,professor_lastnames,professor_denomination) VALUES (5,'PhD','Ronald Patricio','Mendoza Núñez','Profesor');


CREATE TABLE semester_school(
	semester_name  VARCHAR(8)  NOT NULL REFERENCES semester(semester_name),
	school_abbreviation VARCHAR(5) NOT NULL REFERENCES school(school_abbreviation),
	dean_id INTEGER NOT NULL UNIQUE REFERENCES professor(professor_id)
	);
	
CREATE TABLE semester_career(
	semester_name  VARCHAR(8)  NOT NULL REFERENCES semester(semester_name),
	career_id INTEGER NOT NULL REFERENCES career(career_id),
	coordinator_id INTEGER NOT NULL UNIQUE REFERENCES professor(professor_id)
	);
	
CREATE TABLE IF NOT EXISTS public.document
(
    document_id integer NOT NULL DEFAULT nextval('document_document_id_seq'::regclass),
    professor_id integer NOT NULL,
    activity_type integer NOT NULL,
    evidence_type integer NOT NULL,
    semester_name character varying(8) COLLATE pg_catalog."default" NOT NULL,
    document_comment character varying(500) COLLATE pg_catalog."default",
    document_uploaddate date,
    document_pathtofile character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT document_pkey PRIMARY KEY (document_id),
    CONSTRAINT document_activity_type_fkey FOREIGN KEY (activity_type)
        REFERENCES public.activity_type (activity_type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT document_evidence_type_fkey FOREIGN KEY (evidence_type)
        REFERENCES public.evidence_type (evidence_type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT document_professor_id_fkey FOREIGN KEY (professor_id)
        REFERENCES public.professor (professor_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT document_semester_name_fkey FOREIGN KEY (semester_name)
        REFERENCES public.semester (semester_name) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS activity_report_teaching
(
    activity_report_teaching_id integer NOT NULL DEFAULT nextval('activity_report_teaching_activity_report_teaching_id_seq'::regclass),
    semester_name character varying(8) COLLATE pg_catalog."default" NOT NULL,
    professor_id integer NOT NULL,
    document_id integer NOT NULL,
    activity_report_teaching_summary character varying(500) COLLATE pg_catalog."default",
    activity_report_teaching_hoursperweek double precision,
    activity_report_teaching_hoursperweekintersemester double precision,
    CONSTRAINT activity_report_teaching_pkey PRIMARY KEY (activity_report_teaching_id),
    CONSTRAINT activity_report_teaching_document_id_fkey FOREIGN KEY (document_id)
        REFERENCES document (document_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT activity_report_teaching_professor_id_fkey FOREIGN KEY (professor_id)
        REFERENCES professor (professor_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT activity_report_teaching_semester_name_fkey FOREIGN KEY (semester_name)
        REFERENCES semester (semester_name) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS activity_report_vinculation
(
    activity_report_vinculation_id integer NOT NULL DEFAULT nextval('activity_report_vinculation_activity_report_vinculation_id_seq'::regclass),
    semester_name character varying(8) COLLATE pg_catalog."default" NOT NULL,
    professor_id integer NOT NULL,
    document_id integer NOT NULL,
    activity_report_vinculation_summary character varying(500) COLLATE pg_catalog."default",
    activity_report_vinculation_hoursperweek double precision,
    activity_report_vinculation_hoursperweekintersemester double precision,
    CONSTRAINT activity_report_vinculation_pkey PRIMARY KEY (activity_report_vinculation_id),
    CONSTRAINT activity_report_vinculation_document_id_fkey FOREIGN KEY (document_id)
        REFERENCES document (document_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT activity_report_vinculation_professor_id_fkey FOREIGN KEY (professor_id)
        REFERENCES professor (professor_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT activity_report_vinculation_semester_name_fkey FOREIGN KEY (semester_name)
        REFERENCES semester (semester_name) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS activity_report_investigation
(
    activity_report_investigation_id integer NOT NULL DEFAULT nextval('activity_report_investigation_activity_report_investigation_seq'::regclass),
    semester_name character varying(8) COLLATE pg_catalog."default" NOT NULL,
    professor_id integer NOT NULL,
    document_id integer NOT NULL,
    activity_report_investigation_summary character varying(500) COLLATE pg_catalog."default",
    activity_report_investigation_hoursperweek double precision,
    activity_report_investigation_hoursperweekintersemester double precision,
    CONSTRAINT activity_report_investigation_pkey PRIMARY KEY (activity_report_investigation_id),
    CONSTRAINT activity_report_investigation_document_id_fkey FOREIGN KEY (document_id)
        REFERENCES document (document_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT activity_report_investigation_professor_id_fkey FOREIGN KEY (professor_id)
        REFERENCES professor (professor_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT activity_report_investigation_semester_name_fkey FOREIGN KEY (semester_name)
        REFERENCES semester (semester_name) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


CREATE TABLE IF NOT EXISTS activity_report_management
(
    activity_report_management_id integer NOT NULL DEFAULT nextval('activity_report_management_activity_report_management_id_seq'::regclass),
    semester_name character varying(8) COLLATE pg_catalog."default" NOT NULL,
    professor_id integer NOT NULL,
    document_id integer NOT NULL,
    activity_report_management_summary character varying(500) COLLATE pg_catalog."default",
    activity_report_management_hoursperweek double precision,
    activity_report_management_hoursperweekintersemester double precision,
    CONSTRAINT activity_report_management_pkey PRIMARY KEY (activity_report_management_id),
    CONSTRAINT activity_report_management_document_id_fkey FOREIGN KEY (document_id)
        REFERENCES document (document_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT activity_report_management_professor_id_fkey FOREIGN KEY (professor_id)
        REFERENCES professor (professor_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT activity_report_management_semester_name_fkey FOREIGN KEY (semester_name)
        REFERENCES semester (semester_name) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE report(
	report_id SERIAL NOT NULL PRIMARY KEY,
    professor_id INTEGER NOT NULL REFERENCES professor(professor_id),
	   
    activity_report_teaching_id INTEGER NOT NULL REFERENCES activity_report_teaching(activity_report_teaching_id),
    activity_report_management_id INTEGER NOT NULL REFERENCES activity_report_management(activity_report_management_id),
    activity_report_vinculation_id INTEGER NOT NULL REFERENCES activity_report_vinculation(activity_report_vinculation_id),
    activity_report_investigation_id INTEGER NOT NULL REFERENCES activity_report_investigation(activity_report_investigation_id),
    
    semester_name VARCHAR(8)  NOT NULL REFERENCES semester(semester_name),
    report_name VARCHAR(500),
    report_uploadDate DATE,
    report_professorComment VARCHAR(500),
    report_revisorComment VARCHAR(500),
    report_reviewedBy INTEGER NOT NULL UNIQUE REFERENCES semester_career(coordinator_id),
    report_approvedBy INTEGER NOT NULL UNIQUE REFERENCES semester_school(dean_id),
    report_isApproved BOOL,
    report_pathToFile VARCHAR(50)
);


