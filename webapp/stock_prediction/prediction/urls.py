from django.urls import path

from . import views

app_name = 'prediction'
urlpatterns = [
    path('', views.index, name='index'),
    path('config/', views.config, name='config'),
    path('config/<int:model_id>/', views.detail, name='detail'),
    path('config/new/', views.new_config, name='new_config'),
    path('config/<int:model_id>/modify/', views.upsert_config, name='update_config'),
    path('config/post/', views.upsert_config, name = 'create_config'),
    path('config/<int:model_id>/delete/', views.delete_config, name='delete_config'),
]