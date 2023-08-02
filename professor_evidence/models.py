from django.db import models
from django.db.models.signals import pre_delete
from django.utils import timezone
from django.dispatch import receiver
from django.core.files.storage import default_storage
import os, io
from datetime import datetime
from xhtml2pdf import pisa
from django.template.loader import render_to_string

# Table for the Semester to know when does it starts and ends
class Semester(models.Model):
    # Primary Keys are generated automatically
    # semester_id = models.CharField(max_length=50)
    semester_name = models.TextField(max_length=200, default="SEM")
    date_start = models.DateField(auto_now=False, auto_now_add=False)
    date_end = models.DateField(auto_now=False, auto_now_add=False)
    isCurrentSemester = models.BooleanField(default = False)
    def __str__(self):
        return self.semester_name

class School(models.Model):
    # school_id = models.CharField(max_length=50)
    school_name = models.TextField(max_length=200)
    school_abbreviation = models.TextField(max_length=200, default=school_name)
    def __str__(self):
        return self.school_abbreviation

class Career(models.Model):
    # career_id = models.CharField(max_length=50)
    school_id = models.ForeignKey(School, on_delete=models.CASCADE)
    career_name = models.TextField(max_length=200)
    def __str__(self):
        return self.career_name

class Professor_Denomination(models.Model):
    # professor_denomination_id = models.CharField(max_length=50)
    denomination = models.TextField(max_length=200)
    def __str__(self):
        return self.denomination

class Professor(models.Model):
    professor_id = models.CharField(primary_key=True, max_length=50)
    career_id = models.ForeignKey(Career, on_delete=models.CASCADE)
    professor_degree = models.TextField(max_length=200)
    professor_names = models.TextField(max_length=200)
    professor_lastnames = models.TextField(max_length=200)
    professor_denomination = models.ForeignKey(Professor_Denomination, on_delete=models.CASCADE)
    professor_revisor = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)
    isRevisor = models.BooleanField(default = False)
    isDean = models.BooleanField(default = False)
    def __str__(self):
        #return str(self.professor_id)
        return self.professor_names + " " + self.professor_lastnames

class Semester_School(models.Model):
    semester_id = models.ForeignKey(Semester, on_delete=models.CASCADE)
    school_id = models.ForeignKey(School, on_delete=models.CASCADE)
    dean_id = models.ForeignKey(Professor, on_delete=models.CASCADE)
    def __str__(self):
        return str(self.semester_id) + "_" + str(self.dean_id)  + "_" +  str(self.school_id)

class Semester_Career(models.Model):
    career_id = models.ForeignKey(Career, on_delete=models.CASCADE)
    semester_id = models.ForeignKey(Semester, on_delete=models.CASCADE)
    coordinator_id = models.ForeignKey(Professor, on_delete=models.CASCADE)
    def __str__(self):
        return str(self.semester_id) + "_" + str(self.coordinator_id )  + "_" +  str(self.career_id)

class Activity_Type(models.Model):
    # activity_type_id = models.CharField(max_length=50)
    activity_type = models.TextField(max_length=200)
    def __str__(self):
        return str(self.activity_type)

class Evidence_Type(models.Model):
    # evidence_id = models.CharField(max_length=50)
    activity_type = models.ForeignKey(Activity_Type, on_delete=models.CASCADE)
    evidence_type = models.CharField(max_length=250)
    evidence_code = models.CharField(max_length=5)
    def __str__(self):
        return str(self.evidence_code)

    
class Document(models.Model):
    # document_id = models.CharField(max_length=50)
    professor_id = models.ForeignKey(Professor, on_delete=models.CASCADE)
    activity_type = models.ForeignKey(Activity_Type, on_delete=models.CASCADE)
    evidence_type = models.ForeignKey(Evidence_Type, on_delete=models.CASCADE)
    semester_id = models.ForeignKey(Semester, on_delete=models.CASCADE)
    document_revisorComment = models.TextField(blank=True, default='')
    document_professorComment = models.TextField(blank=True, default='')
    document_uploadDate = models.DateField(auto_now=True, auto_now_add=False)
    #document_pathToFile = models.TextField(max_length=200)
    #document_approved = models.BooleanField(null=True, default = None)

    def get_document_upload_path(self, filename):
        current_datetime = datetime.now().strftime('%Y-%m-%d_%H%M%S')
        semester_name = self.semester_id.semester_name
        school_abbreviation = self.professor_id.career_id.school_id.school_abbreviation
        professor_id = self.professor_id.professor_id
        activity_type = self.activity_type.activity_type
        evidence_type = self.evidence_type.evidence_code

        path = f"{semester_name}/{school_abbreviation}/{professor_id}/Evidencias/{activity_type}/{evidence_type}/"
        filename = path[:-1].replace("/","_")
        filename_with_datetime = f"{filename}_{current_datetime}"
        return f"{path}{filename_with_datetime}.pdf"
    
    uploadedDocument = models.FileField(upload_to=get_document_upload_path, max_length = 500)



    def delete(self, *args, **kwargs):
        # Obtenemos la ruta del archivo
        file_path = self.uploadedDocument.path

        # Eliminamos el archivo del servidor
        if default_storage.exists(file_path):
            default_storage.delete(file_path)

            # Obtenemos el directorio que contiene el archivo
            file_directory = os.path.dirname(file_path)

            # Verificamos si el directorio está vacío después de eliminar el archivo
            if not os.listdir(file_directory):
                # Si está vacío, eliminamos el directorio también
                os.rmdir(file_directory)

        # Llamamos al método "delete" de la clase padre para eliminar el registro de la tabla
        super(Document, self).delete(*args, **kwargs)
        
    def save(self, *args, **kwargs):
        # Verificamos si el archivo adjunto ha cambiado
        if self.id:
            try:
                old_document = Document.objects.get(id=self.id)
                if old_document.uploadedDocument and old_document.uploadedDocument != self.uploadedDocument:
                    # Si el archivo ha cambiado, eliminamos el archivo anterior del servidor
                    file_path = old_document.uploadedDocument.path
                    if default_storage.exists(file_path):
                        default_storage.delete(file_path)
            except Document.DoesNotExist:
                pass

        super(Document, self).save(*args, **kwargs)
        
    def __str__(self):
        return str(self.id)


class Report(models.Model):
    # Foreign Keys
    semester_id = models.ForeignKey(Semester, on_delete=models.CASCADE)
    professor_id = models.ForeignKey(Professor, on_delete=models.CASCADE)
    report_reviewedBy = models.ForeignKey(Semester_Career, on_delete=models.CASCADE, null=True, default=None )
    report_approvedBy = models.ForeignKey(Semester_School, on_delete=models.CASCADE, null=True, default=None )
    # Information about the activities
    teaching_report_summary = models.TextField(max_length=500)
    teaching_report_hoursPerWeek = models.FloatField()
    teaching_report_hoursPerWeekIntersemester = models.FloatField()
    
    management_report_summary = models.TextField(max_length=500)
    management_report_hoursPerWeek = models.FloatField()
    management_report_hoursPerWeekIntersemester = models.FloatField()
    
    vinculation_report_summary = models.TextField(max_length=500)
    vinculation_report_hoursPerWeek = models.FloatField()
    vinculation_report_hoursPerWeekIntersemester = models.FloatField()
    
    investigation_report_summary = models.TextField(max_length=500)
    investigation_report_hoursPerWeek = models.FloatField()
    investigation_report_hoursPerWeekIntersemester = models.FloatField()
    # Report information
    # report_name = models.TextField(max_length=200)
    report_professorComment = models.TextField(max_length=350, blank=True)
    report_revisorComment = models.TextField(max_length=350, blank=True)
    report_conclusion = models.TextField(max_length=500, blank=True)
    # report_uploadDate = models.DateField(default=datetime.now().date())
    report_uploadDate = models.DateField(auto_now=True, auto_now_add=False)
    report_isReviewed = models.BooleanField(default = False)
    report_isApproved = models.BooleanField(default = False)
    # report_pathToFile = models.TextField(max_length=200)

    def get_report_upload_path(self, filename):
        # Use the Semester ID, Professor's ID, and the Report's name to generate the path
        semester_name = self.semester_id.semester_name
        school_abbreviation = self.professor_id.career_id.school_id.school_abbreviation
        professor_id = self.professor_id.professor_id
        # report_name = instance.report_name
        path = f"{semester_name}/{school_abbreviation}/{professor_id}/Reporte/"
        filename = path[:-1].replace("/","_")
        return f"{path}{filename}.pdf"
    
    uploadedReport = models.FileField(upload_to=get_report_upload_path, max_length=500, blank=True)

    def save(self, *args, **kwargs):

        if Report.objects.filter(professor_id=self.professor_id, semester_id=self.semester_id).exists():
            # Delete the existing report before generating a new one
            existing_report = Report.objects.get(professor_id=self.professor_id, semester_id=self.semester_id)
            existing_report.delete()
        
        
        try:
            semester_career = Semester_Career.objects.get(semester_id=self.semester_id, career_id=self.professor_id.career_id)
            print("EL ID DEL COORDINADOR ES " + str(semester_career))
            self.report_reviewedBy = semester_career
        except Semester_Career.DoesNotExist:
            self.report_reviewedBy = None

        try:
            semester_school = Semester_School.objects.get(semester_id=self.semester_id, school_id=self.professor_id.career_id.school_id)
            print("EL ID DEL DECANO ES " + str(semester_school))
            self.report_approvedBy = semester_school
        except Semester_School.DoesNotExist:
            self.report_approvedBy = None
            
        print(f"valores son {self.report_reviewedBy}   {self.report_approvedBy}")
        print(f"valores de fecha son {self.report_uploadDate}")
        # Generate the PDF
        pdf_buffer = generate_pdf(self)

        # Save the PDF to the FileField
        self.uploadedReport.save(f"{self.semester_id.semester_name}{self.professor_id}.pdf", pdf_buffer, save=False)

        super(Report, self).save(*args, **kwargs)
        
    def __str__(self):
        return str(self.semester_id.semester_name + '_' + str(self.professor_id))
        
@receiver(pre_delete, sender=Report)
def delete_report_pdf(sender, instance, **kwargs):
    # Function to delete the associated PDF file when a report instance is deleted
    if instance.uploadedReport:
        if os.path.isfile(instance.uploadedReport.path):
            os.remove(instance.uploadedReport.path)

def generate_pdf(report):
    buffer = io.BytesIO()
    # c = canvas.Canvas(buffer, pagesize=letter)

    # Render the HTML template to a string
    report_data = render_to_string('report_template.html', {'report': report})

    # Convert the HTML string to PDF
    pisa_status = pisa.CreatePDF(report_data, dest=buffer)

    # Check if the PDF conversion was successful
    if pisa_status.err:
        raise Exception(f"PDF generation error: {pisa_status.err}")

    # Set the buffer's file position to the beginning
    buffer.seek(0)
    return buffer