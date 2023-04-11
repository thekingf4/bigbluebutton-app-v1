from django.conf.urls import url
from django.conf import settings
from .views import bigbluebuttonapp_view


urlpatterns = (
    url(
        r'courses/{}/chat$'.format(
            settings.COURSE_ID_PATTERN,
        ),
        bigbluebuttonapp_view.as_view(),
        name='bigbluebuttonapp_view',
    ),
)
