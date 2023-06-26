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