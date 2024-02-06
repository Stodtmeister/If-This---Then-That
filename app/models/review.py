from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    book_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("books.id")), nullable=False
    )
    review = db.Column(db.String(250), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user = db.relationship("User", back_populates="reviews")
    book = db.relationship("Book", back_populates="reviews")

    def __repr__(self):
        return f"<Review {self.id} {self.review}>"

    def to_dict(self, include_user=True, include_books=True):
        data = {
            "id": self.id,
            "userId": self.user_id,
            "bookId": self.book_id,
            "review": self.review,
            "stars": self.stars,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
        if include_user:
            data["user"] = self.user.to_dict(include_reviews=False, include_tbr=False)
        if include_books:
            data["book"] = self.book.to_dict(include_reviews=False)
        return data
