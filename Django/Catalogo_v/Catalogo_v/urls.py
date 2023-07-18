from django.contrib import admin
from django.urls import path, include
from django.urls import re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^', include('CatalagoApp.urls')),
]
