from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Series(db.Model):
    __tablename__ = 'series'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    books = db.relationship('Book', back_populates='series')


    def __repr__(self):
        return f'<Series {self.id} {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'books': [book.to_dict() for book in self.books],
        }