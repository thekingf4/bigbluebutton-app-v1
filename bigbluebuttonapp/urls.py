from django.conf.urls import url, patterns
from django.conf import settings
# from .views import bigbluebuttonapp_view


# urlpatterns = (
#     url(
#         r'courses/{}/chat$'.format(
#             settings.COURSE_ID_PATTERN,
#         ),
#         bigbluebuttonapp_view,
#         name='bigbluebuttonapp_view',
#     ),
# )

urlpatterns = patterns(
    'bigbluebuttonapp.views',

    url(
        r'courses/{}/chat$'.format(
            settings.COURSE_ID_PATTERN,
        ),
        'bigbluebuttonapp_view',
        name='rocketchat_view',
    ),

)
