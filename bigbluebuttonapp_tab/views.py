# -*- coding: utf-8 -*-

from django.conf import settings
from lms.djangoapps.courseware.courses import get_course_with_access
from django.template.loader import render_to_string
from web_fragments.fragment import Fragment
from openedx.core.djangoapps.plugin_api.views import EdxFragmentView
from xblock.fields import Scope
from opaque_keys.edx.keys import CourseKey
from lms.djangoapps.courseware.access import has_access
from common.djangoapps.student.models import CourseEnrollment
from django.contrib.auth.models import AnonymousUser
from django.utils.translation import ugettext_noop
from openedx.core.djangoapps.site_configuration import helpers as configuration_helpers


# Create your views here.


class BigBlueButtonAppView(EdxFragmentView):
    def render_to_fragment(self, request, course_id, **kwargs):
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
        try:
            context = {
                "course": course,
                "settings": settings,
                "dirs":  configuration_helpers.get_value('GW_PORTAL_URL', 'PORTAL_URL'),
                "dirs2":  configuration_helpers.get_value('GW_GCORE_URL', 'G-CORE_URL') ,
            }
            html = render_to_string('bigbluebuttonapp/tab.html', context)
            # inline_js = render_to_string('discussion/discussion_board_js.template', context)

            fragment = Fragment(html)
            # self.add_fragment_resource_urls(fragment)
            # fragment.add_javascript(inline_js)
            # if not settings.REQUIRE_DEBUG:
            #     fragment.add_javascript_url(staticfiles_storage.url('discussion/js/discussion_board_factory.js'))
            return fragment
        # except cc.utils.CommentClientMaintenanceError:
        #     log.warning('Forum is in maintenance mode')
        #     html = render_to_response('discussion/maintenance_fragment.html', {
        #         'disable_courseware_js': True,
        #         'uses_pattern_library': True,
        #     })
        #     return Fragment(html)
