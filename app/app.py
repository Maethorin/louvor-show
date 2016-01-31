# -*- coding: utf-8 -*-
import os

from flask import Flask, render_template
from flask.ext.sqlalchemy import SQLAlchemy

import api

app = Flask(__name__)
api_flask = api.create_api(app)
api.register_resources(api_flask)
app.config.from_object(os.environ['APP_SETTINGS'])

db = SQLAlchemy(app)


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


@app.route('/angular/<template_name>', methods=['GET', 'POST'])
def angular_template(template_name):
    return app.send_static_file("musicas/{}".format(template_name))


@app.route('/json/<json_name>', methods=['GET', 'POST'])
def angular_json(json_name):
    return app.send_static_file("musicas/json/{}".format(json_name))

def run():
    app.run(debug=True)
