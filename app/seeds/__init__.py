from flask.cli import AppGroup
from .users import seed_users, undo_users
from .boards import seed_boards, undo_boards
from .reviews import seed_reviews, undo_reviews
from .books import seed_books, undo_books
from .authors import seed_authors, undo_authors
from .recommendations import seed_recommendations, undo_recommendations
from .series import seed_series, undo_series

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_boards()
        undo_authors()
        undo_series()
        undo_books()
        undo_reviews()
        undo_recommendations()
    seed_users()
    seed_boards()
    seed_authors()
    seed_series()
    seed_books()
    seed_reviews()
    seed_recommendations()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_boards()
    undo_authors()
    undo_series()
    undo_books()
    undo_reviews()
    seed_recommendations()
    # Add other undo functions here
