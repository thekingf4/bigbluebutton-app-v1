# -*- coding: utf-8 -*-

from django.conf import settings
from lms.djangoapps.courseware.courses import get_course_with_access
from django.template.loader import render_to_string
from web_fragments.fragment import Fragment
from openedx.core.djangoapps.plugin_api.views import EdxFragmentView
from opaque_keys.edx.keys import CourseKey
from django.utils.translation import ugettext_noop


# Create your views here.


class BBBView(EdxFragmentView):
    def render_to_fragment(self, request, course_id, **kwargs):

        course_key = CourseKey.from_string(course_id)
        course = get_course_with_access(request.user, "load", course_key)
        display_name_course = course.display_name
        

        # For bbb_chat.html
        context = {
            "course": course,           # must in the root level to avoid "proctored exam error"
            "course_info": {
                "course": course,
                "name": display_name_course,
                "key": course_key,
            },
        }

        html = render_to_string(
            'bbb_chat/bbb_chat.html', context, )

        fragment = Fragment(html)
        return fragment
