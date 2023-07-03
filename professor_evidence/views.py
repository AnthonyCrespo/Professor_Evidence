# from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializer import *
from .models import *
# from django.shortcuts import render, redirect
# from django.contrib.auth.models import User
# from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.decorators import login_required
# from django.http import HttpResponse

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

class Professor_DenominationView(viewsets.ModelViewSet):
    serializer_class = Professor_DenominationSerializer
    queryset = Professor_Denomination.objects.all()

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

class Activity_Report_TeachingView(viewsets.ModelViewSet):
    serializer_class = Activity_Report_TeachingSerializer
    queryset = Activity_Report_Teaching.objects.all()

class Activity_Report_InvestigationView(viewsets.ModelViewSet):
    serializer_class = Activity_Report_InvestigationSerializer
    queryset = Activity_Report_Investigation.objects.all()

class Activity_Report_VinculationView(viewsets.ModelViewSet):
    serializer_class = Activity_Report_VinculationSerializer
    queryset = Activity_Report_Vinculation.objects.all()

class Activity_Report_ManagementView(viewsets.ModelViewSet):
    serializer_class = Activity_Report_ManagementSerializer
    queryset = Activity_Report_Management.objects.all()
    
class Evidence_TypeView(viewsets.ModelViewSet):
    queryset = Evidence_Type.objects.all()
    serializer_class = Evidence_TypeSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data,list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
# class Activity_ReportView(viewsets.ModelViewSet):
#     serializer_class = Activity_ReportSerializer
#     queryset = Activity_Report.objects.all()