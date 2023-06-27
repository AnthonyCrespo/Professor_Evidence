from rest_framework import serializers
from .models import *

class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = '__all__'

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'

class CareerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Career
        fields = '__all__'

class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        fields = '__all__'

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'

class Semester_SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester_School
        fields = '__all__'

class Semester_CareerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester_Career
        fields = '__all__'

class Activity_TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity_Type
        fields = '__all__'

class Evidence_TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evidence_Type
        fields = '__all__'

class Activity_ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity_Report
        fields = '__all__'