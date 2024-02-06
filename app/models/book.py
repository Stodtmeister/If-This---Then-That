from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .board import board_book
from sqlalchemy import UniqueConstraint


class BookRecommendation(db.Model):
    __tablename__ = 'book_recommendation'
    __table_args__ = (UniqueConstraint('book_id', 'recommendation_id', name='_book_rec_uniq'),)

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')), nullable=False)
    recommendation_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recommendations.id')), nullable=False)
    votes = db.Column(db.Integer, nullable=True, default=1)

    book = db.relationship('Book', back_populates='book_recommendations')
    recommendation = db.relationship('Recommendation', back_populates='book_recommendations')

    def to_dict(self, include_books=True, include_recommendations=True):
        data = {
            'id': self.id,
            'book_id': self.book_id,
            'recommendation_id': self.recommendation_id,
            'votes': self.votes,


            # 'book': self.book.to_dict(),
            # 'recommendation': self.recommendation.to_dict(),
        }
        if include_books:
            data['book'] = self.book.to_dict(include_author=False, include_boards=False, include_reviews=False, include_recommendations=False)
        if include_recommendations:
            data['recommendation'] = self.recommendation.to_dict(include_books=False)
        return data

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
    book_recommendations = db.relationship('BookRecommendation', back_populates='book')

    def __repr__(self):
        return f'<Book {self.id} {self.title}>'

    def to_dict(self, include_author=True, include_boards=True, include_reviews=True, include_recommendations=True, include_books=True):
        data = {
            'id': self.id,
            'title': self.title,
            'cover': self.cover,
            'genre': self.genre,
            'authorId': self.author_id,
            'seriesId': self.series_id,
        }
        if include_author:
            data['author'] = self.author.to_dict()
        if include_boards:
            data['boards'] = [board.to_dict(include_books=False) for board in self.boards]
        if include_reviews:
            data['reviews'] = [review.to_dict(include_books=False) for review in self.reviews]
        if include_recommendations:
            data['recommendations'] = [br.recommendation.to_dict(include_books=include_books) for br in self.book_recommendations]
        return data

# book_recommendation = db.Table(
#     'book_recommendation',
#     db.Column( 'book_id', db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')), primary_key=True,),
#     db.Column( 'recommendation_id', db.Integer, db.ForeignKey(add_prefix_for_prod('recommendations.id')), primary_key=True,),
#     db.Column('votes', db.Integer, nullable=True, default=1),
# )

# class Book(db.Model):
#     __tablename__ = 'books'

#     if environment == 'production':
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(100), nullable=False)
#     cover = db.Column(db.String(100), nullable=False)
#     genre = db.Column(db.String(50), nullable=False)
#     author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('authors.id')), nullable=False)
#     series_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('series.id')))
#     series = db.relationship('Series', back_populates='books')
#     reviews = db.relationship('Review', back_populates='book')
#     author = db.relationship('Author', back_populates='books')
#     boards = db.relationship('Board', secondary=board_book, back_populates='books')
#     recommendations = db.relationship('Recommendation', secondary=book_recommendation, back_populates='books')

#     def __repr__(self):
#         return f'<Book {self.id} {self.title}>'

#     def to_dict(self, include_author=True, include_boards=True, include_reviews=True, include_recommendations=True, include_series=True):
#         data = {
#             'id': self.id,
#             'title': self.title,
#             'cover': self.cover,
#             'genre': self.genre,
#             'authorId': self.author_id,
#             'seriesId': self.series_id,
#             # 'reviews': [review.to_dict() for review in self.reviews],
#             # 'author': self.author.to_dict(),
#             # 'boards': [board.to_dict() for board in self.boards],
#             # 'recommendations': [recommendation.to_dict() for recommendation in self.recommendations],
#         }
#         if include_author:
#             data['author'] = self.author.to_dict()
#         # if include_series:
#         #     data['series'] = self.series.to_dict(include_author=False)
#         if include_boards:
#             data['boards'] = [board.to_dict(include_books=False) for board in self.boards]
#         if include_reviews:
#             data['reviews'] = [review.to_dict(include_books=False) for review in self.reviews]
#         if include_recommendations:
#             data['recommendations'] = [recommendation.to_dict(include_books=False) for recommendation in self.recommendations]
#         return data
