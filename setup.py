"""
Setup script for the Open edX package.
"""

from setuptools import setup

setup(
    name="bigbluebuttonapp",
    version="1.0",
    install_requires=["setuptools"],
    requires=[],
    packages=["bigbluebuttonapp"],
    include_package_data=True,
    entry_points={
        "openedx.course_tab": [
            "bigbluebuttonapp = bigbluebuttonapp.plugins:BBBTab"
        ]
    }
)
