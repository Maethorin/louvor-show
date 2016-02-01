# -*- coding: utf-8 -*-
from sqlalchemy.orm import relationship
from database import AppRepository

db = AppRepository.db


class Cantor(db.Model):
    __tablename__ = 'cantores'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String())
    musicas = relationship("Musica", back_populates="cantor")


class Musica(db.Model):
    __tablename__ = 'musicas'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String())
    cantor_id = db.Column(db.Integer, db.ForeignKey('cantores.id'))
    cantor = relationship("Cantor", back_populates="musicas")
    sequencia = db.Column(db.String())
    estrofes = relationship("Estrofe", back_populates="musica")

    def to_dict(self, lista=False):
        as_dict = {'id': self.id, 'nome': self.nome, 'cantor': self.cantor.nome}
        if not lista:
            as_dict['letra'] = {}
            as_dict['sequencia'] = [int(numero) for numero in self.sequencia.split(', ')]
            for estrofe in self.estrofes:
                versos = []
                for verso in estrofe.versos:
                    if verso.cifra:
                        versos.append(verso.cifra)
                    if verso.letra:
                        versos.append(verso.letra)
                as_dict['letra'][estrofe.indice] = versos
        return as_dict


class Estrofe(db.Model):
    __tablename__ = 'estrofes'
    id = db.Column(db.Integer, primary_key=True)
    indice = db.Column(db.Integer)
    musica_id = db.Column(db.Integer, db.ForeignKey('musicas.id'))
    musica = relationship("Musica", back_populates="estrofes")
    versos = relationship("Verso", back_populates="estrofe")


class Verso(db.Model):
    __tablename__ = 'versos'
    id = db.Column(db.Integer, primary_key=True)
    ordem = db.Column(db.Integer)
    estrofe_id = db.Column(db.Integer, db.ForeignKey('estrofes.id'))
    estrofe = relationship("Estrofe", back_populates="versos")
    cifra = db.Column(db.String())
    letra = db.Column(db.String())
