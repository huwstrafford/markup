from django.urls import include, path, re_path

from . import views

urlpatterns = [
    re_path('suggest-cui/', views.suggest_cui, name='suggest_cui'),
    re_path('suggest-annotations/', views.suggest_annotations, name='suggest_annotations'),
    re_path('teach-active-learner/', views.teach_active_learner, name='teach_active_learner'),
    re_path('reset-ontology/', views.reset_ontology, name='reset_ontology'),
    re_path('setup-demo/', views.setup_demo, name='setup_demo'),
    re_path('setup-umls/', views.setup_umls, name='setup_umls'),
    re_path('setup-preloaded-ontology/', views.setup_preloaded_ontology, name='setup_preloaded_ontology'),
    re_path('setup-custom-ontology/', views.setup_custom_ontology, name='setup_custom_ontology'),
    re_path('', views.annotate_data, name='annotate_data'),
]
