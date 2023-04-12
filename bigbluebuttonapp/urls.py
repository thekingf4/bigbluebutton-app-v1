# -*- coding: utf-8 -*-


from django.conf.urls import url
from django.conf import settings
from .views import BigBlueButtonAppView


urlpatterns = (
    url(
        r'courses/{}/BBB$'.format(
            settings.COURSE_ID_PATTERN,
        ),
        BigBlueButtonAppView.as_view(),
        name='BigBlueButtonAppView',
    ),
)
