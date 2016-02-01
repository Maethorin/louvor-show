# -*- coding: utf-8 -*-
import os

from flask import Flask, send_from_directory
from flask.ext.sqlalchemy import SQLAlchemy

import database

web_app = Flask(__name__)
web_app.config.from_object(os.environ['APP_SETTINGS'])
database.AppRepository.db = SQLAlchemy(web_app)

import api
api.create_api(web_app)


@web_app.route('/', methods=['GET', 'POST'])
def index():
    return send_from_directory('templates', 'index.html')


@web_app.route('/angular/<template_name>', methods=['GET', 'POST'])
def angular_template(template_name):
    return send_from_directory('templates', template_name)


@web_app.route('/json/<json_name>', methods=['GET', 'POST'])
def angular_json(json_name):
    return web_app.send_static_file("musicas/json/{}".format(json_name))


def run():
    web_app.run(debug=True)
