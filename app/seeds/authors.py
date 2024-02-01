from app.models import db, Author, environment, SCHEMA
from sqlalchemy.sql import text


def seed_authors():
    first = Author(name="J.R.R. Tolkien")
    second = Author(name="J.K. Rowling")
    third = Author(name="George R.R. Martin")
    fourth = Author(name="Brandon Sanderson")
    fifth = Author(name="Patrick Rothfuss")
    sixth = Author(name="Terry Pratchett")
    seventh = Author(name="Robert Jordan")
    eigth = Author(name="Terry Goodkind")

    db.session.add_all([first, second, third, fourth, fifth, sixth, seventh, eigth])
    db.session.commit()

def undo_authors():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.authors RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM authors"))

    db.session.commit()
