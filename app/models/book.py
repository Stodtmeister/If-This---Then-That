from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .board import board_book


book_recommendation = db.Table(
    'book_recommendation',
    db.Column( 'book_id', db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')), primary_key=True,),
    db.Column( 'recommendation_id', db.Integer, db.ForeignKey(add_prefix_for_prod('recommendations.id')), primary_key=True,),
)

class Book(db.Model):
    __tablename__ = 'books'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    cover = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(50), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('authors.id')), nullable=False)
    series_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('series.id')))

    series = db.relationship('Series', back_populates='books')
    reviews = db.relationship('Review', back_populates='book')
    author = db.relationship('Author', back_populates='books')
    boards = db.relationship('Board', secondary=board_book, back_populates='books')
    recommendations = db.relationship('Recommendation', secondary=book_recommendation, back_populates='books')

    def __repr__(self):
        return f'<Book {self.id} {self.title}>'

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'cover': self.cover,
            'genre': self.genre,
            'authorId': self.author_id,
            'reviews': [review.to_dict() for review in self.reviews],
            'author': self.author.to_dict(),
            'boards': [board.to_dict() for board in self.boards],
            'recommendations': [recommendation.to_dict() for recommendation in self.recommendations],
        }
