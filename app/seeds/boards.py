from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text


def seed_boards():
    first = Board(name='TBR', user_id=1)
    second = Board(name='Read', user_id=1)
    third = Board(name='Favorites', user_id=1)
    fourth = Board(name='TBR', user_id=2)
    fifth = Board(name='Read', user_id=2)
    sixth = Board(name='Favorites', user_id=2)
    seventh = Board(name='TBR', user_id=3)
    eigth = Board(name='Read', user_id=3)
    ninth = Board(name='Favorites', user_id=3)

    db.session.add_all([first, second, third, fourth, fifth, sixth, seventh, eigth, ninth])
    db.session.commit()


def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()
