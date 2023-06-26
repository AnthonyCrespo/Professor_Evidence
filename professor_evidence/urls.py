from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers 
from professor_evidence import views 

router = routers.DefaultRouter()
router.register(r'Semester',views.SemesterView, 'Semester')
router.register(r'School',views.SchoolView, 'School')
router.register(r'Career',views.CareerView, 'Career')
router.register(r'Professor',views.ProfessorView, 'Professor')
router.register(r'Document',views.DocumentView, 'Document')
router.register(r'Report',views.ReportView, 'Report')

urlpatterns = [
    path("api_2/v1/",include(router.urls) ),
    path('professor_evidence/',include_docs_urls(title="Evidence API"))
]