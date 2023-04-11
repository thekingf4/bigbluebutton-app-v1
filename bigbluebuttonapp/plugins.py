from django.utils.translation import ugettext_noop
from lms.djangoapps.courseware.tabs import EnrolledTab

class BBBTab(EnrolledTab):
    """
    The representation of the course teams view type.
    """
    type = "bigbluebuttonapp"
    title = ugettext_noop("Mensajeria")
    view_name = "bigbluebuttonapp"
    is_default = True
    tab_id = "bigbluebuttonapp"
    is_hideable = True
    view_name = "bigbluebuttonapp_view"

    @classmethod
    def is_enabled(cls, course, user=None):

        if not super(BBBTab, cls).is_enabled(course, user=user):
            return False

        if user and not user.is_authenticated:
            return False

        return True

