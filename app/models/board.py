from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


#! original
# board_book = db.Table(
#     add_prefix_for_prod("board_book"),
#     db.Column(
#         "board_id",
#         db.Integer,
#         db.ForeignKey(add_prefix_for_prod("boards.id")),
#         primary_key=True,
#     ),
#     db.Column(
#         "book_id",
#         db.Integer,
#         db.ForeignKey(add_prefix_for_prod("books.id")),
#         primary_key=True,
#     ),
# )

from sqlalchemy import Table, Column, Integer, ForeignKey, MetaData

metadata = MetaData()

schema = SCHEMA if environment == "production" else None

board_book = Table(
    add_prefix_for_prod("board_book"),
    metadata,
    Column(
        "board_id",
        Integer,
        ForeignKey(add_prefix_for_prod("boards.id")),
        primary_key=True,
    ),
    Column(
        "book_id",
        Integer,
        ForeignKey(add_prefix_for_prod("books.id")),
        primary_key=True,
    ),
    schema=schema
)


class Board(db.Model):
    __tablename__ = "boards"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user = db.relationship("User", back_populates="tbr")
    books = db.relationship("Book", secondary=board_book, back_populates="boards")

    def __repr__(self):
        return f"<Board {self.id} {self.name}>"

    def to_dict(self, include_books=True):
        data = {
            "id": self.id,
            "name": self.name,
            "userId": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
        if include_books:
            data["books"] = [book.to_dict(include_boards=False) for book in self.books]
        return data
