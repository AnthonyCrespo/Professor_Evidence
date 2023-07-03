from django.db import models

# Create your models here.


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
    def __str__(self):
        return self.professor_names

class Semester_School(models.Model):
    semester_id = models.ForeignKey(Semester, on_delete=models.CASCADE)
    school_id = models.ForeignKey(School, on_delete=models.CASCADE)
    dean_id = models.ForeignKey(Professor, on_delete=models.CASCADE)
    def __str__(self):
        return self.dean_id

class Semester_Career(models.Model):
    career_id = models.ForeignKey(Career, on_delete=models.CASCADE)
    semester_id = models.ForeignKey(Semester, on_delete=models.CASCADE)
    coordinator_id = models.ForeignKey(Professor, on_delete=models.CASCADE)
    def __str__(self):
        return self.coordinator_id

class Activity_Type(models.Model):
    # activity_type_id = models.CharField(max_length=50)
    activity_type = models.TextField(max_length=200)
    def __str__(self):
        return self.activity_type

class Evidence_Type(models.Model):
    # evidence_id = models.CharField(max_length=50)
    activity_type = models.ForeignKey(Activity_Type, on_delete=models.CASCADE)
    evidence_type = models.CharField(max_length=250)
    def __str__(self):
        return self.evidence_type

class Document(models.Model):
    # document_id = models.CharField(max_length=50)
    professor_id = models.ForeignKey(Professor, on_delete=models.CASCADE)
    activity_type = models.ForeignKey(Activity_Type, on_delete=models.CASCADE)
    evidence_type = models.ForeignKey(Evidence_Type, on_delete=models.CASCADE)
    semester_id = models.ForeignKey(Semester, on_delete=models.CASCADE)
    document_comment = models.TextField(blank=True)
    document_uploadDate = models.DateField(auto_now=False, auto_now_add=False)
    document_pathToFile = models.TextField(max_length=200)
    def __str__(self):
        return self.document_pathToFile

class Activity_Report_Teaching(models.Model):
    # activity_report_id = models.CharField(max_length=50)
    semester_id = models.ForeignKey(Semester, on_delete=models.CASCADE)
    professor_id = models.ForeignKey(Professor, on_delete=models.CASCADE)
    document_id = models.ForeignKey(Document, on_delete=models.CASCADE, default=1)
    activity_report_summary = models.TextField(max_length=200)
    activity_report_hoursPerWeek = models.FloatField()
    activity_report_hoursPerWeekIntersemester = models.FloatField()
    def __str__(self):
        return self.activity_report_summary
    
class Activity_Report_Investigation(models.Model):
    # activity_report_id = models.CharField(max_length=50)
    semester_id = models.ForeignKey(Semester, on_delete=models.CASCADE)
    professor_id = models.ForeignKey(Professor, on_delete=models.CASCADE)
    document_id = models.ForeignKey(Document, on_delete=models.CASCADE, default=1)
    activity_report_summary = models.TextField(max_length=200)
    activity_report_hoursPerWeek = models.FloatField()
    activity_report_hoursPerWeekIntersemester = models.FloatField()
    def __str__(self):
        return self.activity_report_summary

class Activity_Report_Vinculation(models.Model):
    # activity_report_id = models.CharField(max_length=50)
    semester_id = models.ForeignKey(Semester, on_delete=models.CASCADE)
    professor_id = models.ForeignKey(Professor, on_delete=models.CASCADE)
    document_id = models.ForeignKey(Document, on_delete=models.CASCADE, default=1)
    activity_report_summary = models.TextField(max_length=200)
    activity_report_hoursPerWeek = models.FloatField()
    activity_report_hoursPerWeekIntersemester = models.FloatField()
    def __str__(self):
        return self.activity_report_summary

class Activity_Report_Management(models.Model):
    # activity_report_id = models.CharField(max_length=50)
    semester_id = models.ForeignKey(Semester, on_delete=models.CASCADE)
    professor_id = models.ForeignKey(Professor, on_delete=models.CASCADE)
    document_id = models.ForeignKey(Document, on_delete=models.CASCADE, default=1)
    activity_report_summary = models.TextField(max_length=200)
    activity_report_hoursPerWeek = models.FloatField()
    activity_report_hoursPerWeekIntersemester = models.FloatField()
    def __str__(self):
        return self.activity_report_summary

class Report(models.Model):
    # report_id = models.CharField(max_length=50)
    professor_id = models.ForeignKey(Professor, on_delete=models.CASCADE)
    # activity_report_id = models.ForeignKey(Activity_Report, on_delete=models.CASCADE)

    # Note: Multiple Foreign Keys are not allowed, that is why only 1 activity_report_id will
    # appear in the class of the report. However, we can manage to include in the final document
    # all the 4 activities of the professors.
    
    activity_report_teaching_id = models.ForeignKey(Activity_Report_Teaching, verbose_name="Teaching Activity", on_delete=models.CASCADE, default=1)
    activity_report_management_id = models.ForeignKey(Activity_Report_Management, verbose_name="Management Activity", on_delete=models.CASCADE, default=1)
    activity_report_vinculation_id = models.ForeignKey(Activity_Report_Vinculation, verbose_name="Vinculation Activity", on_delete=models.CASCADE, default=1)
    activity_report_investigation_id = models.ForeignKey(Activity_Report_Investigation, verbose_name="Investigation Activity", on_delete=models.CASCADE, default=1)
    
    semester_id = models.ForeignKey(Semester, on_delete=models.CASCADE)
    report_name = models.TextField(max_length=200)
    report_uploadDate = models.DateField(auto_now=False, auto_now_add=False)
    report_professorComment = models.TextField(max_length=200)
    report_revisorComment = models.TextField(max_length=200)
    report_conclusion = models.TextField(max_length=200, blank=True)
    report_reviewedBy = models.ForeignKey(Semester_Career, on_delete=models.CASCADE)
    report_approvedBy = models.ForeignKey(Semester_School, on_delete=models.CASCADE)
    report_isApproved = models.BooleanField(default = False)
    report_pathToFile = models.TextField(max_length=200)
    def __str__(self):
        return self.report_pathToFile