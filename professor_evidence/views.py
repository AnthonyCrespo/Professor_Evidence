# from django.shortcuts import render
from rest_framework import viewsets
from .serializer import *
from .models import *

# Create your views here.

class SemesterView(viewsets.ModelViewSet):
    serializer_class = SemesterSerializer
    queryset = Semester.objects.all()

class SchoolView(viewsets.ModelViewSet):
    serializer_class = SchoolSerializer
    queryset = School.objects.all()

class CareerView(viewsets.ModelViewSet):
    serializer_class = CareerSerializer
    queryset = Career.objects.all()

class ProfessorView(viewsets.ModelViewSet):
    serializer_class = ProfessorSerializer
    queryset = Professor.objects.all()

class DocumentView(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    queryset = Document.objects.all()

class ReportView(viewsets.ModelViewSet):
    serializer_class = ReportSerializer
    queryset = Report.objects.all()

class Semester_SchoolView(viewsets.ModelViewSet):
    serializer_class = Semester_SchoolSerializer
    queryset = Semester_School.objects.all()

class Semester_CareerView(viewsets.ModelViewSet):
    serializer_class = Semester_CareerSerializer
    queryset = Semester_Career.objects.all()

class Activity_TypeView(viewsets.ModelViewSet):
    serializer_class = Activity_TypeSerializer
    queryset = Activity_Type.objects.all()
    
class Evidence_TypeView(viewsets.ModelViewSet):
    serializer_class = Evidence_TypeSerializer
    queryset = Evidence_Type.objects.all()
    
class Activity_ReportView(viewsets.ModelViewSet):
    serializer_class = Activity_ReportSerializer
    queryset = Activity_Report.objects.all()