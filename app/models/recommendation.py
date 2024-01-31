from .db import db, environment, SCHEMA, add_prefix_for_prod
from .book import book_recommendation

# book_recommendation = db.Table(
#     'book_recommendation',
#     db.Column('book_id', db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')), primary_key=True),
#     db.Column('recommendation_id', db.Integer, db.ForeignKey(add_prefix_for_prod('recommendations.id')), primary_key=True)
# )


class Recommendation(db.Model):
    __tablename__ = 'recommendations'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    books = db.relationship('Book', secondary='book_recommendation', back_populates='recommendations')

    def __repr__(self):
        return f'<Recommendation {self.id} {self.title}>'

    def to_dict(self):
        return {
            'id': self.id,
            'books': [book.to_dict() for book in self.books],
        }
