from django.urls import path

from . import views

urlpatterns = [
    path('', views.compare, name='compare'),
    path('iaa/', views.inter_annotator_agreement, name='iaa'),
    path('iaa/run-IAA/', views.runEverythingWithRemove, name='run-IAA'),
    path('iaa/run-IAA-all/', views.runEverything2WithRemove, name='run-IAA'),
    path('iaa/run-IAA-entities/', views.get_f1score_per_annotationCorpusHTMLWithRemove, name='run-IAA'),
    path('iaa/view-Difference-Only/', views.getDiffAnnfileWithRemove, name='run-IAA'),
    path('iaa/entities-and-annotation-all/', views.entities_and_annotation_all, name='run-IAA'),
]
