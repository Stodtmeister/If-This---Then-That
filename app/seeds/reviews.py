from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    first = Review(user_id=1, book_id=1, review="This book was amazing!", stars=5)
    # second = Review(user_id=1, book_id=2, review="This book was terrible!", stars=1)
    # third = Review(user_id=1, book_id=3, review="This book was okay.", stars=3)
    fourth = Review(user_id=2, book_id=1, review="This book was amazing!", stars=5)
    # fifth = Review(user_id=2, book_id=2, review="This book was terrible!", stars=1)
    # sixth = Review(user_id=2, book_id=3, review="This book was okay.", stars=3)
    seventh = Review(user_id=3, book_id=1, review="This book was amazing!", stars=5)
    # eigth = Review(user_id=3, book_id=2, review="This book was terrible!", stars=1)
    # ninth = Review(user_id=3, book_id=3, review="This book was okay.", stars=3)

    db.session.add(first)
    # db.session.add_all([first, second, third, fourth, fifth, sixth, seventh, eigth, ninth])
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
