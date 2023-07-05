from rest_framework import serializers
from .models import *
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

# Serializers for Users
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password')

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'

# Serializers for Backend Views
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

# class Activity_Report_TeachingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Activity_Report_Teaching
#         fields = '__all__'

# class Activity_Report_InvestigationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Activity_Report_Investigation
#         fields = '__all__'

# class Activity_Report_VinculationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Activity_Report_Vinculation
#         fields = '__all__'

# class Activity_Report_ManagementSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Activity_Report_Management
#         fields = '__all__'

class Professor_DenominationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor_Denomination
        fields = '__all__'

# class Activity_ReportSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Activity_Report
#         fields = '__all__'