from django.conf.urls import include
from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="pTracker API",
        default_version='v1',
        description="Price Tracker Application with Django and React used to Track Discounts on stores online",
        contact=openapi.Contact(email="onasanyatunde67@gmail.com"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('pricechecker.urls')),
    path('api/', include('rest_auth.urls')),
    path('api/', include('api.urls')),
    path('api/register/', include('rest_auth.registration.urls')),
    # API DOCS URLS
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('api/docs/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

]
