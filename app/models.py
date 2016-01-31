# -*- coding: utf-8 -*-
from sqlalchemy.orm import relationship

from app import db


class Musica(db.Model):
    __tablename__ = 'musicas'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String())
    cantor = db.Column(db.String())
    sequencia = db.Column(db.String())
    estrofes = relationship("Estrofe", back_populates="musica")


class Estrofe(db.Model):
    __tablename__ = 'estrofes'
    id = db.Column(db.Integer, primary_key=True)
    musica_id = db.Column(db.Integer, db.ForeignKey('musicas.id'))
    musica = relationship("Musica", back_populates="estrofes")
    versos = relationship("Verso", back_populates="estrofe")


class Verso(db.Model):
    __tablename__ = 'versos'
    id = db.Column(db.Integer, primary_key=True)
    estrofe_id = db.Column(db.Integer, db.ForeignKey('estrofes.id'))
    estrofe = relationship("Estrofe", back_populates="versos")
    cifra = db.Column(db.String())
    letra = db.Column(db.String())
