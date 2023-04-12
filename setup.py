"""
Setup script for the Open edX package.
"""

from setuptools import setup

setup(
    name="bigbluebuttonapp_tab",
    version="1.0",
    install_requires=["setuptools"],
    requires=[],
    packages=["bigbluebuttonapp_tab"],
    include_package_data=True,
    entry_points={
        "openedx.course_tab": [
            "bigbluebuttonapp_tab = bigbluebuttonapp_tab.plugins:BBBTab"
        ]
    }
)
