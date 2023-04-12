
"""
Setup script for the Open edX package.
"""

from setuptools import setup

setup(
    name="bigbluebuttonapp",
    version="1.0.2",
    install_requires=[],
    requires=[],
    packages=["bigbluebuttonapp"],
    package_data={'bigbluebuttonapp': ['templates/*','templates/*/*']},
    include_package_data=True,
    entry_points={
        'openedx.course_tab': [
            'bigbluebuttonapp = bigbluebuttonapp.plugins:BBBTab',
        ],
    },
)
