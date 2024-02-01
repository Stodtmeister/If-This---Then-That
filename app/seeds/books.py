from app.models import db, Book, environment, SCHEMA
from sqlalchemy.sql import text
from app.models import Author


def seed_books():
    tolkien = Author.query.filter_by(name="J.R.R. Tolkien").first()

    first = Book(
        title="The Hobbit",
        author=tolkien,
        author_id=1,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    second = Book(
        title="The Fellowship of the Ring",
        author=tolkien,
        author_id=1,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    third = Book(
        title="The Two Towers",
        author=tolkien,
        author_id=1,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    fourth = Book(
        title="The Return of the King",
        author=tolkien,
        author_id=1,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )

    db.session.add_all([first, second, third, fourth])
    db.session.commit()


def undo_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM books"))

    db.session.commit()
