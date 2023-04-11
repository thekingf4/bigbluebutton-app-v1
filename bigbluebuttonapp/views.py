from django.shortcuts import render_to_response
from opaque_keys.edx.keys import CourseKey
from courseware.courses import get_course_with_access
from openedx.core.djangoapps.site_configuration import helpers as configuration_helpers

def bigbluebuttonapp_view(request, course_id):
    import os
    from django.conf import settings
    from path import Path
    tabTemplatePath = Path( os.path.dirname(os.path.abspath(__file__)) + '/templates' )
    if settings.MAKO_TEMPLATE_DIRS_BASE[-1] != tabTemplatePath :
        settings.MAKO_TEMPLATE_DIRS_BASE.append(tabTemplatePath)
    if settings.DEFAULT_TEMPLATE_ENGINE['DIRS'][-1] != tabTemplatePath :
        settings.DEFAULT_TEMPLATE_ENGINE['DIRS'].append(tabTemplatePath)
    tabStaticPath = Path( os.path.dirname(os.path.abspath(__file__)) + '/static' )
    if settings.STATICFILES_DIRS[-1] != tabStaticPath :
        settings.STATICFILES_DIRS.append(tabStaticPath)
    course_key = CourseKey.from_string(course_id)
    course = get_course_with_access(request.user, "load", course_key)

    context = {
        "course": course,
        "settings": settings,
        "dirs":  configuration_helpers.get_value('GW_PORTAL_URL', 'PORTAL_URL'),
        "dirs2":  configuration_helpers.get_value('GW_GCORE_URL', 'G-CORE_URL') ,
    }
    return render_to_response("bigbluebuttonapp/tab.html", context)
