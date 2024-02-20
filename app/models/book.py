from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .board import board_book
from sqlalchemy import UniqueConstraint


from sqlalchemy import UniqueConstraint

class BookRecommendation(db.Model):
    __tablename__ = "book_recommendation"

    if environment == "production":
        __table_args__ = (UniqueConstraint('book_id', 'recommendation_id', name='uix_1'), {"schema": SCHEMA})

    bookRecommendation_id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("books.id"))
    )
    recommendation_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("recommendations.id"))
    )
    votes = db.Column(db.Integer, nullable=True, default=1)

    book = db.relationship("Book", back_populates="book_recommendations")
    recommendation = db.relationship(
        "Recommendation", back_populates="book_recommendations"
    )

    def to_dict(self, include_books=True, include_recommendations=True):
        data = {
            "id": self.bookRecommendation_id,
            "bookId": self.book_id,
            "recommendationId": self.recommendation_id,
            "votes": self.votes,
        }

        if include_books:
            data["book"] = self.book.to_dict(
                include_author=False,
                include_boards=False,
                include_reviews=False,
                include_recommendations=False,
                include_series=False,
            )
        if include_recommendations:
            data["recommendation"] = self.recommendation.to_dict()
        return data

# !Original
# class BookRecommendation(db.Model):
#     __tablename__ = "book_recommendation"

#     if environment == "production":
#         __table_args__ = {"schema": SCHEMA}

#     book_id = db.Column(
#         db.Integer, db.ForeignKey(add_prefix_for_prod("books.id")), primary_key=True
#     )
#     recommendation_id = db.Column(
#         db.Integer,
#         db.ForeignKey(add_prefix_for_prod("recommendations.id")),
#         primary_key=True,
#     )
#     votes = db.Column(db.Integer, nullable=True, default=1)

#     book = db.relationship("Book", back_populates="book_recommendations")
#     recommendation = db.relationship(
#         "Recommendation", back_populates="book_recommendations"
#     )

#     def to_dict(self, include_books=True, include_recommendations=True):
#         data = {
#             "bookId": self.book_id,
#             "recommendationId": self.recommendation_id,
#             "votes": self.votes,
#         }

#         if include_books:
#             data["book"] = self.book.to_dict(
#                 include_author=False,
#                 include_boards=False,
#                 include_reviews=False,
#                 include_recommendations=False,
#                 include_series=False,
#             )
#         if include_recommendations:
#             data["recommendation"] = self.recommendation.to_dict()
#         return data


class Book(db.Model):
    __tablename__ = "books"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    cover = db.Column(db.String(100), nullable=True)
    genre = db.Column(db.String(50), nullable=False)
    author_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("authors.id")), nullable=False
    )
    series_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("series.id")))
    series = db.relationship("Series", back_populates="books")
    reviews = db.relationship("Review", back_populates="book")
    author = db.relationship("Author", back_populates="books")
    boards = db.relationship("Board", secondary=board_book, back_populates="books")
    book_recommendations = db.relationship("BookRecommendation", back_populates="book")

    def __repr__(self):
        return f"<Book {self.id} {self.title}>"

    def to_dict(
        self,
        include_author=True,
        include_boards=True,
        include_reviews=True,
        include_recommendations=True,
        include_series=True,
    ):
        data = {
            "id": self.id,
            "title": self.title,
            "cover": self.cover,
            "genre": self.genre,
            "authorId": self.author_id,
            "seriesId": self.series_id,
        }
        if include_author:
            data["author"] = self.author.to_dict()
        if include_boards:
            data["boards"] = [
                board.to_dict(include_books=False) for board in self.boards
            ]
        if include_reviews:
            data["reviews"] = [
                review.to_dict(include_books=False) for review in self.reviews
            ]
        if include_recommendations:
            data["book_recommendations"] = [
                br.recommendation.to_dict(include_books=False)
                for br in self.book_recommendations
            ]
        return data
