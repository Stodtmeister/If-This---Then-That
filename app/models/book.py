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
    votes = db.Column(db.Integer, nullable=True, default=0)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('authors.id')), nullable=False)
    series_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('series.id')))

    series = db.relationship('Series', back_populates='books')
    reviews = db.relationship('Review', back_populates='book')
    author = db.relationship('Author', back_populates='books')
    boards = db.relationship('Board', secondary=board_book, back_populates='books')
    recommendations = db.relationship('Recommendation', secondary=book_recommendation, back_populates='books')

    def __repr__(self):
        return f'<Book {self.id} {self.title}>'

    def to_dict(self, include_author=True, include_boards=True, include_reviews=True, include_recommendations=True, include_series=True):
        data = {
            'id': self.id,
            'title': self.title,
            'cover': self.cover,
            'genre': self.genre,
            'votes': self.votes,
            'authorId': self.author_id,
            'seriesId': self.series_id,
            # 'reviews': [review.to_dict() for review in self.reviews],
            # 'author': self.author.to_dict(),
            # 'boards': [board.to_dict() for board in self.boards],
            # 'recommendations': [recommendation.to_dict() for recommendation in self.recommendations],
        }
        if include_author:
            data['author'] = self.author.to_dict()
        # if include_series:
        #     data['series'] = self.series.to_dict(include_author=False)
        if include_boards:
            data['boards'] = [board.to_dict(include_books=False) for board in self.boards]
        if include_reviews:
            data['reviews'] = [review.to_dict(include_books=False) for review in self.reviews]
        if include_recommendations:
            data['recommendations'] = [recommendation.to_dict(include_books=False) for recommendation in self.recommendations]
        return data
