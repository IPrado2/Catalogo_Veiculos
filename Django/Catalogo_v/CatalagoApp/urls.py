from django.urls import re_path
from CatalagoApp import views
from .views import get_marca, create_marca, update_marca, delete_marca
from .views import get_modelo, create_modelo, update_modelo, delete_modelo
from .views import get_veiculo, create_veiculo, update_veiculo, delete_veiculo, upload_image
from .views import get_media_file
from .views import login, logout, register_admin
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = []

# Configuração para servir arquivos de mídia durante o desenvolvimento
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    ## MARCA
    re_path(r'^get_marca/$', views.get_marca),
    re_path(r'^get_marca/([0-9]+)$', views.get_marca),
    re_path(r'^create_marca/$', views.create_marca),
    re_path(r'^create_marca/([0-9]+)$', views.create_marca),
    re_path(r'^update_marca/$', views.update_marca),
    re_path(r'^update_marca/([0-9]+)$', views.update_marca),
    re_path(r'^delete_marca/$', views.delete_marca),
    re_path(r'^delete_marca/([0-9]+)$', views.delete_marca),
    ## MODELO
    re_path(r'^get_modelo/$', views.get_modelo),
    re_path(r'^get_modelo/([0-9]+)$', views.get_modelo),
    re_path(r'^create_modelo/$', views.create_modelo),
    re_path(r'^create_modelo/([0-9]+)$', views.create_modelo),
    re_path(r'^update_modelo/$', views.update_modelo),
    re_path(r'^update_modelo/([0-9]+)$', views.update_modelo),
    re_path(r'^delete_modelo/$', views.delete_modelo),
    re_path(r'^delete_modelo/([0-9]+)$', views.delete_modelo),
    ## VEICULO
    re_path(r'^get_veiculo/$', views.get_veiculo),
    re_path(r'^get_veiculo/([0-9]+)$', views.get_veiculo),
    re_path(r'^create_veiculo/$', views.create_veiculo),
    re_path(r'^create_veiculo/([0-9]+)$', views.create_veiculo),
    re_path(r'^update_veiculo/$', views.update_veiculo),
    re_path(r'^update_veiculo/([0-9]+)$', views.update_veiculo),
    re_path(r'^delete_veiculo/$', views.delete_veiculo),
    re_path(r'^delete_veiculo/([0-9]+)$', views.delete_veiculo),
    re_path(r'^upload_image/$', views.upload_image),
    re_path(r'^upload_image/([0-9]+)$', views.upload_image),
    ## LOGIN / LOGOUT / REGISTER
    re_path(r'^login/$', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Rota para obter um token JWT
    re_path(r'^login/refresh/$', TokenRefreshView.as_view(), name='token_refresh'), # Rota para atualizar um token JWT
    re_path(r'^logout/$', logout, name='logout'),
    re_path(r'^register_admin/$', views.register_admin, name='register_admin'),
    re_path(r'^register_admin/([0-9]+)$', views.register_admin, name='register_admin'), 
    ## MEDIA
    re_path(r'^media/<str:filename>/', views.get_media_file, name='get_media_file')
]
