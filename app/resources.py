# -*- coding: utf-8 -*-

from flask_restful import Resource
import models


class Musicas(Resource):
    def _obter_musicas(self):
        return [musica.to_dict(lista=True) for musica in models.Musica.query.all()]

    def _obter_musica(self, musica_id):
        return models.Musica.query.get(musica_id).to_dict()

    def get(self, musica_id=None):
        if not musica_id:
            return self._obter_musicas()
        return self._obter_musica(musica_id)