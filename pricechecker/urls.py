
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^tracker/', views.tracker_view, name='tracker'),
]
