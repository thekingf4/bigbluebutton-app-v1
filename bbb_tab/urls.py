# -*- coding: utf-8 -*-


from django.conf.urls import url
from django.conf import settings
from .views import BBBView


urlpatterns = (
    url(
        r'courses/{}/bbb$'.format(
            settings.COURSE_ID_PATTERN,
        ),
        BBBView.as_view(),
        name='bbb_view',
    ),
)
