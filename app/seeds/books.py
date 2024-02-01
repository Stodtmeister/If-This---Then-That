from app.models import db, Book, environment, SCHEMA
from sqlalchemy.sql import text
from app.models import Author, Series


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

    dresden_files = Series.query.filter_by(name="The Dresden Files").first()
    lotr = Series.query.filter_by(name="The Lord of the Rings").first()
    mistborn = Series.query.filter_by(name="Mistborn").first()
    stormlight = Series.query.filter_by(name="The Stormlight Archive").first()
    kingkiller = Series.query.filter_by(name="The Kingkiller Chronicle").first()
    first_law = Series.query.filter_by(name="The First Law").first()
    broken_empire = Series.query.filter_by(name="The Broken Empire").first()
    lightbringer = Series.query.filter_by(name="The Lightbringer").first()
    witcher = Series.query.filter_by(name="The Witcher").first()
    inheritance = Series.query.filter_by(name="The Inheritance Cycle").first()
    dark_tower = Series.query.filter_by(name="The Dark Tower").first()
    earthsea = Series.query.filter_by(name="The Earthsea Cycle").first()
    broken_earth = Series.query.filter_by(name="The Broken Earth").first()
    books_of_babel = Series.query.filter_by(name="The Books of Babel").first()
    licanius = Series.query.filter_by(name="The Licanius Trilogy").first()
    malazan = Series.query.filter_by(name="The Malazan Book of the Fallen").first()
    black_company = Series.query.filter_by(name="The Black Company").first()
    demon_cycle = Series.query.filter_by(name="The Demon Cycle").first()
    powder_mage = Series.query.filter_by(name="The Powder Mage").first()
    narnia = Series.query.filter_by(name="The Chronicles of Narnia").first()
    thrones = Series.query.filter_by(name="A Song of Ice and Fire").first()
    time = Series.query.filter_by(name="The Wheel of Time").first()
    potter = Series.query.filter_by(name="Harry Potter").first()
    gentleman = Series.query.filter_by(name="Gentleman Bastard").first()
    jade = Series.query.filter_by(name="The Green Bone Saga").first()


    first = Book(
        title="The Hobbit",
        series=lotr,
        author=tolkien,
        author_id=1,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    second = Book(
        title="The Fellowship of the Ring",
        series=lotr,
        author=tolkien,
        author_id=1,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    third = Book(
        title="The Two Towers",
        series=lotr,
        author=tolkien,
        author_id=1,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    fourth = Book(
        title="The Return of the King",
        series=lotr,
        author=tolkien,
        author_id=1,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    fifth = Book(
        title="The Final Empire",
        series=mistborn,
        author=sanderson,
        author_id=4,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    sixth = Book(
        title="The Well of Ascension",
        series=mistborn,
        author=sanderson,
        author_id=4,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    seventh = Book(
        title="The Hero of Ages",
        series=mistborn,
        author=sanderson,
        author_id=4,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    eighth = Book(
        title="The Way of Kings",
        series=stormlight,
        author=sanderson,
        author_id=4,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    ninth = Book(
        title="A Game of Thrones",
        series=thrones,
        author=martin,
        author_id=3,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    tenth = Book(
        title="A Clash of Kings",
        series=thrones,
        author=martin,
        author_id=3,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    eleventh = Book(
        title="A Storm of Swords",
        series=thrones,
        author=martin,
        author_id=3,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twelfth = Book(
        title="A Feast for Crows",
        series=thrones,
        author=martin,
        author_id=3,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    thirdteenth = Book(
        title="A Dance with Dragons",
        series=thrones,
        author=martin,
        author_id=3,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    fourteenth = Book(
        title="The Name of the Wind",
        series=kingkiller,
        author=rothfuss,
        author_id=5,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    fifteenth = Book(
        title="The Wise Man's Fear",
        series=kingkiller,
        author=rothfuss,
        author_id=5,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    sixteenth = Book(
        title="The Eye of the World",
        series=time,
        author=jordan,
        author_id=7,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    seventeenth = Book(
        title="The Great Hunt",
        series=time,
        author=jordan,
        author_id=7,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    eighteenth = Book(
        title="The Dragon Reborn",
        series=time,
        author=jordan,
        author_id=7,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    nintheenth = Book(
        title="The Shadow Rising",
        series=time,
        author=jordan,
        author_id=7,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twentieth = Book(
        title="The Fires of Heaven",
        series=time,
        author=jordan,
        author_id=7,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twentyfirst = Book(
        title="Harry Potter and the Sorcerer's Stone",
        series=potter,
        author=rowling,
        author_id=2,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twentysecond = Book(
        title="Harry Potter and the Chamber of Secrets",
        series=potter,
        author=rowling,
        author_id=2,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twentythird = Book(
        title="Harry Potter and the Prisoner of Azkaban",
        series=potter,
        author=rowling,
        author_id=2,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twentyfourth = Book(
        title="Harry Potter and the Goblet of Fire",
        series=potter,
        author=rowling,
        author_id=2,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twentyfifth = Book(
        title="The Blade Itself",
        series=first_law,
        author=abercrombie,
        author_id=17,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twentysixth = Book(
        title="Before They Are Hanged",
        series=first_law,
        author=abercrombie,
        author_id=17,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twentyseventh = Book(
        title="Last Argument of Kings",
        series=first_law,
        author=abercrombie,
        author_id=17,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twentyeigth = Book(
        title="The Lies of Locke Lamora",
        series=gentleman,
        author=lynch,
        author_id=20,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    twentyninth = Book(
        title="Red Seas Under Red Skies",
        series=gentleman,
        author=lynch,
        author_id=20,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    thirtyth = Book(
        title="The Republic of Thieves",
        series=gentleman,
        author=lynch,
        author_id=20,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    thirtyfirst = Book(
        title="Jade City",
        series=jade,
        author=lee,
        author_id=11,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    thirtysecond = Book(
        title="Jade War",
        series=jade,
        author=lee,
        author_id=11,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    thirtythird = Book(
        title="Jade Legacy",
        series=jade,
        author=lee,
        author_id=11,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg",
    )
    thirtyfourth = Book(
        title="The Fifth Season",
        series=broken_earth,
        author=jemisin,
        author_id=12,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    thirtyfifth = Book(
        title="The Obelisk Gate",
        series=broken_earth,
        author=jemisin,
        author_id=12,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    thirtysixth = Book(
        title="The Stone Sky",
        series=broken_earth,
        author=jemisin,
        author_id=12,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    thirtyseventh = Book(
        title="The Black Prism",
        series=lightbringer,
        author=weeks,
        author_id=18,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    thirtyeigth = Book(
        title="The Blinding Knife",
        series=lightbringer,
        author=weeks,
        author_id=18,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    thirtyninth = Book(
        title="The Broken Eye",
        series=lightbringer,
        author=weeks,
        author_id=18,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    fourtieth = Book(
        title="A Wizard of Earthsea",
        series=earthsea,
        author=ursula,
        author_id=36,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    fortyfirst = Book(
        title="The Tombs of Atuan",
        series=earthsea,
        author=ursula,
        author_id=36,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    fortysecond = Book(
        title="The Farthest Shore",
        series=earthsea,
        author=ursula,
        author_id=36,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    fortythird = Book(
        title="Storm Front",
        series=dresden_files,
        author=butcher,
        author_id=19,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    fortyfourth = Book(
        title="Fool Moon",
        series=dresden_files,
        author=butcher,
        author_id=19,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    fortyfifth = Book(
        title="Grave Peril",
        series=dresden_files,
        author=butcher,
        author_id=19,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )
    fortysixth = Book(
        title="Summer Knight",
        series=dresden_files,
        author=butcher,
        author_id=19,
        genre="Fantasy",
        cover="https://images-na.ssl-images-amazon.com/images/I/51g7Zp7lF1L._SX331_BO1,204,203,200_.jpg"
    )

    db.session.add_all([first, second, third, fourth])
    db.session.add_all([fifth, sixth, seventh, eighth, ninth, tenth, eleventh, twelfth])
    db.session.add_all([thirdteenth, fourteenth, fifteenth, sixteenth, seventeenth, eighteenth, nintheenth, twentieth])
    db.session.add_all([twentyfirst, twentysecond, twentythird, twentyfourth, twentyfifth, twentysixth, twentyseventh, twentyeigth])
    db.session.add_all([twentyninth, thirtyth, thirtyfirst, thirtysecond, thirtythird, thirtyfourth, thirtyfifth, thirtysixth])
    db.session.add_all([thirtyseventh, thirtyeigth, thirtyninth, fourtieth, fortyfirst, fortysecond, fortythird, fortyfourth])
    db.session.add_all([fortyfifth, fortysixth])
    db.session.commit()


def undo_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM books"))

    db.session.commit()
