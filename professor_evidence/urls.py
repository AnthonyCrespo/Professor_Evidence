from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers 
from professor_evidence import views
# from .views import HomePage, Register, Login, logoutuser

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
router.register(r'Activity_Report_Teaching',views.Activity_Report_TeachingView, 'Activity_Report_Teaching')
router.register(r'Activity_Report_Investigation',views.Activity_Report_InvestigationView, 'Activity_Report_Investigation')
router.register(r'Activity_Report_Vinculation',views.Activity_Report_VinculationView, 'Activity_Report_Vinculation')
router.register(r'Activity_Report_Management',views.Activity_Report_ManagementView, 'Activity_Report_Management')
router.register(r'UserAccountView',views.UserAccountView, 'UserAccountView')
# router.register(r'Activity_Report',views.Activity_ReportView, 'Activity_Repor')

urlpatterns = [
    # Admin URLs
    path("api_2/v1/",include(router.urls) ),
    path('docs/',include_docs_urls(title="Evidence API")),

    # Users URLs
    # path('home/', HomePage, name="home-page"),
    # path('register/', Register, name="register-page"),
    # path('login/', Login, name="login-page"),
    # path('logout/', logoutuser, name='logout')
]
    