from app.models import db, Book, environment, SCHEMA
from sqlalchemy.sql import text
from app.models import Author


def seed_books():
    tolkien = Author.query.filter_by(name="J.R.R. Tolkien").first()
    sanderson = Author.query.filter_by(name="Brandon Sanderson").first()
    martin = Author.query.filter_by(name="George R.R. Martin").first()
    rothfuss = Author.query.filter_by(name="Patrick Rothfuss").first()
    jordan = Author.query.filter_by(name="Robert Jordan").first()
    rowling = Author.query.filter_by(name="J.K. Rowling").first()
    abercrombie = Author.query.filter_by(name="Joe Abercrombie").first()
    butcher = Author.query.filter_by(name="Jim Butcher").first()
    lynch = Author.query.filter_by(name="Scott Lynch").first()
    ursula = Author.query.filter_by(name="Ursula K. Le Guin").first()
    weeks = Author.query.filter_by(name="Brent Weeks").first()
    lee = Author.query.filter_by(name="Fonda Lee").first()
    jemisin = Author.query.filter_by(name="N.K. Jemisin").first()

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
    fifth = Book(
        title="The Final Empire",
        author=sanderson,
        author_id=4,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    sixth = Book(
        title="The Well of Ascension",
        author=sanderson,
        author_id=4,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    seventh = Book(
        title="The Hero of Ages",
        author=sanderson,
        author_id=4,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    eighth = Book(
        title="The Way of Kings",
        author=sanderson,
        author_id=4,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    ninth = Book(
        title="A Game of Thrones",
        author=martin,
        author_id=3,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    tenth = Book(
        title="A Clash of Kings",
        author=martin,
        author_id=3,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    eleventh = Book(
        title="A Storm of Swords",
        author=martin,
        author_id=3,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twelfth = Book(
        title="A Feast for Crows",
        author=martin,
        author_id=3,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    thirdteenth = Book(
        title="A Dance with Dragons",
        author=martin,
        author_id=3,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    fourteenth = Book(
        title="The Name of the Wind",
        author=rothfuss,
        author_id=5,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    fifteenth = Book(
        title="The Wise Man's Fear",
        author=rothfuss,
        author_id=5,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    sixteenth = Book(
        title="The Eye of the World",
        author=jordan,
        author_id=7,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    seventeenth = Book(
        title="The Great Hunt",
        author=jordan,
        author_id=7,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    eighteenth = Book(
        title="The Dragon Reborn",
        author=jordan,
        author_id=7,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    nintheenth = Book(
        title="The Shadow Rising",
        author=jordan,
        author_id=7,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twentieth = Book(
        title="The Fires of Heaven",
        author=jordan,
        author_id=7,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twentyfirst = Book(
        title="Harry Potter and the Sorcerer's Stone",
        author=rowling,
        author_id=2,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twentysecond = Book(
        title="Harry Potter and the Chamber of Secrets",
        author=rowling,
        author_id=2,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twentythird = Book(
        title="Harry Potter and the Prisoner of Azkaban",
        author=rowling,
        author_id=2,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twentyfourth = Book(
        title="Harry Potter and the Goblet of Fire",
        author=rowling,
        author_id=2,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twentyfifth = Book(
        title="The Blade Itself",
        author=abercrombie,
        author_id=17,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twentysixth = Book(
        title="Before They Are Hanged",
        author=abercrombie,
        author_id=17,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twentyseventh = Book(
        title="Last Argument of Kings",
        author=abercrombie,
        author_id=17,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twentyeigth = Book(
        title="The Lies of Locke Lamora",
        author=lynch,
        author_id=20,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twentyninth = Book(
        title="Red Seas Under Red Skies",
        author=lynch,
        author_id=20,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    thirtyth = Book(
        title="The Republic of Thieves",
        author=lynch,
        author_id=20,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    thirtyfirst = Book(
        title="Jade City",
        author=lee,
        author_id=11,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    thirtysecond = Book(
        title="Jade War",
        author=lee,
        author_id=11,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    thirtythird = Book(
        title="Jade Legacy",
        author=lee,
        author_id=11,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    thirtyfourth = Book(
        title="The Fifth Season",
        author=jemisin,
        author_id=12,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    thirtyfifth = Book(
        title="The Obelisk Gate",
        author=jemisin,
        author_id=12,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    thirtysixth = Book(
        title="The Stone Sky",
        author=jemisin,
        author_id=12,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    thirtyseventh = Book(
        title="The Black Prism",
        author=weeks,
        author_id=18,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    thirtyeigth = Book(
        title="The Blinding Knife",
        author=weeks,
        author_id=18,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    thirtyninth = Book(
        title="The Broken Eye",
        author=weeks,
        author_id=18,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    fourtieth = Book(
        title="A Wizard of Earthsea",
        author=ursula,
        author_id=36,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    fortyfirst = Book(
        title="The Tombs of Atuan",
        author=ursula,
        author_id=36,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    fortysecond = Book(
        title="The Farthest Shore",
        author=ursula,
        author_id=36,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    fortythird = Book(
        title="Storm Front",
        author=butcher,
        author_id=19,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    fortyfourth = Book(
        title="Fool Moon",
        author=butcher,
        author_id=19,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    fortyfifth = Book(
        title="Grave Peril",
        author=butcher,
        author_id=19,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    fortysixth = Book(
        title="Summer Knight",
        author=butcher,
        author_id=19,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )

    db.session.add_all([first, second, third, fourth])
    db.session.commit()


def undo_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM books"))

    db.session.commit()
