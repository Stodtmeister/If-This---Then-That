from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Series(db.Model):
    __tablename__ = "series"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    votes = db.Column(db.Integer, nullable=True, default=0)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("authors.id")))

    author = db.relationship("Author", back_populates="series")
    books = db.relationship("Book", back_populates="series")

    def __repr__(self):
        return f"<Series {self.id} {self.name}>"

    def to_dict(self, include_author=True, include_books=True):
        data = {
            "id": self.id,
            "name": self.name,
            "votes": self.votes,
            "author_id": self.author_id,
        }
        if include_books:
            data["books"] = [
                book.to_dict(
                    include_author=False,
                    include_reviews=False,
                    include_boards=False,
                    include_recommendations=False,
                )
                for book in self.books
            ]
        if include_author:
            data["author"] = self.author.to_dict(include_series=False)
        return data
