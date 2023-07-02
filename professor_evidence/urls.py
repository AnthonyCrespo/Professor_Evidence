from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers 
from professor_evidence import views 

router = routers.DefaultRouter()
router.register(r'Semester',views.SemesterView, 'Semester')
router.register(r'Semester_School',views.Semester_SchoolView, 'Semester_School')
router.register(r'School',views.SchoolView, 'School')
router.register(r'Semester_Career',views.Semester_CareerView, 'Semester_Career')
router.register(r'Career',views.CareerView, 'Career')
router.register(r'Professor',views.ProfessorView, 'Professor')
router.register(r'Document',views.DocumentView, 'Document')
router.register(r'Evidence_Type',views.Evidence_TypeView, 'Evidence_Type')
router.register(r'Report',views.ReportView, 'Report')
router.register(r'Activity_Type',views.Activity_TypeView, 'Activity_Type')
router.register(r'Activity_Report',views.Activity_ReportView, 'Activity_Repor')

urlpatterns = [
    path("api_2/v1/",include(router.urls) ),
    path('docs/',include_docs_urls(title="Evidence API"))
]