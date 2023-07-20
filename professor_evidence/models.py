from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


from django.core.files.storage import default_storage
from django.http import JsonResponse
import os
# Create your models here.

'''

Models for the users authentication

'''
# class UserAccountManager(BaseUserManager):
#     def create_user(self, email, password=None, **extra_fields):
#         if not email:
#             raise ValueError('Users must have an email address')

#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)

#         user.set_password(password)
#         user.save()

#         return user

# class UserAccount(AbstractBaseUser, PermissionsMixin):
#     email = models.EmailField(max_length=255, unique=True)
#     first_name = models.CharField(max_length=255)
#     last_name = models.CharField(max_length=255)
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)

#     objects = UserAccountManager()

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['first_name', 'last_name']

#     def get_full_name(self):
#         return self.first_name

#     def get_short_name(self):
#         return self.first_name
    
#     def __str__(self):
#         return self.email

'''

Models for the Registers

'''
# Table for the Semester to know when does it starts and ends
class Semester(models.Model):
    # Primary Keys are generated automatically
    # semester_id = models.CharField(max_length=50)
    semester_name = models.TextField(max_length=200, default="SM")
    date_start = models.DateField(auto_now=False, auto_now_add=False)
    date_end = models.DateField(auto_now=False, auto_now_add=False)
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
        return str(self.professor_id)

class Semester_School(models.Model):
    semester_id = models.ForeignKey(Semester, on_delete=models.CASCADE)
    school_id = models.ForeignKey(School, on_delete=models.CASCADE)
    dean_id = models.ForeignKey(Professor, on_delete=models.CASCADE)
    def __str__(self):
        return str(self.dean_id)

class Semester_Career(models.Model):
    career_id = models.ForeignKey(Career, on_delete=models.CASCADE)
    semester_id = models.ForeignKey(Semester, on_delete=models.CASCADE)
    coordinator_id = models.ForeignKey(Professor, on_delete=models.CASCADE)
    def __str__(self):
        return str(self.coordinator_id)

class Activity_Type(models.Model):
    # activity_type_id = models.CharField(max_length=50)
    activity_type = models.TextField(max_length=200)
    def __str__(self):
        return str(self.id)

class Evidence_Type(models.Model):
    # evidence_id = models.CharField(max_length=50)
    activity_type = models.ForeignKey(Activity_Type, on_delete=models.CASCADE)
    evidence_type = models.CharField(max_length=250)
    def __str__(self):
        return str(self.id)

    
class Document(models.Model):
    # document_id = models.CharField(max_length=50)
    professor_id = models.ForeignKey(Professor, on_delete=models.CASCADE)
    activity_type = models.ForeignKey(Activity_Type, on_delete=models.CASCADE)
    evidence_type = models.ForeignKey(Evidence_Type, on_delete=models.CASCADE)
    semester_id = models.ForeignKey(Semester, on_delete=models.CASCADE)
    document_revisorComment = models.TextField(blank=True, default='')
    document_professorComment = models.TextField(blank=True, default='')
    document_uploadDate = models.DateField(auto_now=False, auto_now_add=False)
    document_pathToFile = models.TextField(max_length=200)

    def get_document_upload_path(self, filename):
        professor_id = self.professor_id
        activity_id = self.activity_type
        evidence_id = self.evidence_type
        return f"{professor_id}/{activity_id }/{evidence_id}/{filename}"
    uploadedDocument = models.FileField(upload_to=get_document_upload_path)
    # uploadedDocument = models.FileField(upload_to="0302616099")



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
    # report_id = models.CharField(max_length=50)
    professor_id = models.ForeignKey(Professor, on_delete=models.CASCADE)
    # activity_report_id = models.ForeignKey(Activity_Report, on_delete=models.CASCADE)

    # Note: Multiple Foreign Keys are not allowed, that is why only 1 activity_report_id will
    # appear in the class of the report. However, we can manage to include in the final document
    # all the 4 activities of the professors.
    
    # activity_report_teaching_id = models.ForeignKey(Activity_Report_Teaching, verbose_name="Teaching Activity", on_delete=models.CASCADE)
    # activity_report_management_id = models.ForeignKey(Activity_Report_Management, verbose_name="Management Activity", on_delete=models.CASCADE)
    # activity_report_vinculation_id = models.ForeignKey(Activity_Report_Vinculation, verbose_name="Vinculation Activity", on_delete=models.CASCADE)
    # activity_report_investigation_id = models.ForeignKey(Activity_Report_Investigation, verbose_name="Investigation Activity", on_delete=models.CASCADE)
    teaching_report_summary = models.TextField(max_length=200)
    teaching_report_hoursPerWeek = models.FloatField()
    teaching_report_hoursPerWeekIntersemester = models.FloatField()
    
    management_report_summary = models.TextField(max_length=200)
    management_report_hoursPerWeek = models.FloatField()
    management_report_hoursPerWeekIntersemester = models.FloatField()
    
    vinculation_report_summary = models.TextField(max_length=200)
    vinculationt_report_hoursPerWeek = models.FloatField()
    vinculation_report_hoursPerWeekIntersemester = models.FloatField()
        
    investigation_report_summary = models.TextField(max_length=200)
    investigation_report_hoursPerWeek = models.FloatField()
    investigation_report_hoursPerWeekIntersemester = models.FloatField()
    
    
    semester_id = models.ForeignKey(Semester, on_delete=models.CASCADE)
    report_name = models.TextField(max_length=200)
    report_uploadDate = models.DateField(auto_now=False, auto_now_add=False)
    report_professorComment = models.TextField(max_length=200, blank=True)
    report_revisorComment = models.TextField(max_length=200, blank=True)
    report_conclusion = models.TextField(max_length=200, blank=True)
    report_reviewedBy = models.ForeignKey(Semester_Career, on_delete=models.CASCADE)
    report_approvedBy = models.ForeignKey(Semester_School, on_delete=models.CASCADE)
    report_isApproved = models.BooleanField(default = False)
    report_pathToFile = models.TextField(max_length=200)
    def __str__(self):
        return self.report_name
