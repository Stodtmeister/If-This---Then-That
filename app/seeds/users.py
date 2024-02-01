from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    first = User(
        first_name='Walter', last_name='White', username='Heisenberg', email='science@aa.io', password='password')
    second = User(
        first_name='Frodo', last_name='Baggins', username='Ring_Bearer', email='baggins@aa.io', password='password')
    third = User(
        first_name='Harry', last_name='Potter', username='TheBoyWhoLived', email='potter@aa.io', password='password')

    db.session.add_all([first, second, third])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
