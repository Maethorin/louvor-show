# -*- coding: utf-8 -*-

from flask_restful import Api

import resources


def create_api(app):
    return Api(app)


def register_resources(api):
    api.add_resource(resources.HelloWorld, '/hellow')
