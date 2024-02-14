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
    )
    second = Book(
        title="The Fellowship of the Ring",
        series=lotr,
        author=tolkien,
        author_id=1,
        genre="Fantasy",
    )
    third = Book(
        title="The Two Towers",
        series=lotr,
        author=tolkien,
        author_id=1,
        genre="Fantasy",
    )
    fourth = Book(
        title="The Return of the King",
        series=lotr,
        author=tolkien,
        author_id=1,
        genre="Fantasy",
    )
    fifth = Book(
        title="The Final Empire",
        series=mistborn,
        author=sanderson,
        author_id=4,
        genre="Fantasy",
    )
    sixth = Book(
        title="The Well of Ascension",
        series=mistborn,
        author=sanderson,
        author_id=4,
        genre="Fantasy",
    )
    seventh = Book(
        title="The Hero of Ages",
        series=mistborn,
        author=sanderson,
        author_id=4,
        genre="Fantasy",
    )
    eighth = Book(
        title="The Way of Kings",
        series=stormlight,
        author=sanderson,
        author_id=4,
        genre="Fantasy",
    )
    ninth = Book(
        title="A Game of Thrones",
        series=thrones,
        author=martin,
        author_id=3,
        genre="Fantasy",
    )
    tenth = Book(
        title="A Clash of Kings",
        series=thrones,
        author=martin,
        author_id=3,
        genre="Fantasy",
    )
    eleventh = Book(
        title="A Storm of Swords",
        series=thrones,
        author=martin,
        author_id=3,
        genre="Fantasy",
    )
    twelfth = Book(
        title="A Feast for Crows",
        series=thrones,
        author=martin,
        author_id=3,
        genre="Fantasy",
    )
    thirdteenth = Book(
        title="A Dance with Dragons",
        series=thrones,
        author=martin,
        author_id=3,
        genre="Fantasy",
    )
    fourteenth = Book(
        title="The Name of the Wind",
        series=kingkiller,
        author=rothfuss,
        author_id=5,
        genre="Fantasy",
    )
    fifteenth = Book(
        title="The Wise Man's Fear",
        series=kingkiller,
        author=rothfuss,
        author_id=5,
        genre="Fantasy",
    )
    sixteenth = Book(
        title="The Eye of the World",
        series=time,
        author=jordan,
        author_id=7,
        genre="Fantasy",
    )
    seventeenth = Book(
        title="The Great Hunt",
        series=time,
        author=jordan,
        author_id=7,
        genre="Fantasy",
    )
    eighteenth = Book(
        title="The Dragon Reborn",
        series=time,
        author=jordan,
        author_id=7,
        genre="Fantasy",
    )
    nintheenth = Book(
        title="The Shadow Rising",
        series=time,
        author=jordan,
        author_id=7,
        genre="Fantasy",
    )
    twentieth = Book(
        title="The Fires of Heaven",
        series=time,
        author=jordan,
        author_id=7,
        genre="Fantasy",
    )
    twentyfirst = Book(
        title="Harry Potter and the Sorcerer's Stone",
        series=potter,
        author=rowling,
        author_id=2,
        genre="Fantasy",
    )
    twentysecond = Book(
        title="Harry Potter and the Chamber of Secrets",
        series=potter,
        author=rowling,
        author_id=2,
        genre="Fantasy",
    )
    twentythird = Book(
        title="Harry Potter and the Prisoner of Azkaban",
        series=potter,
        author=rowling,
        author_id=2,
        genre="Fantasy",
    )
    twentyfourth = Book(
        title="Harry Potter and the Goblet of Fire",
        series=potter,
        author=rowling,
        author_id=2,
        genre="Fantasy",
    )
    twentyfifth = Book(
        title="The Blade Itself",
        series=first_law,
        author=abercrombie,
        author_id=17,
        genre="Fantasy",
    )
    twentysixth = Book(
        title="Before They Are Hanged",
        series=first_law,
        author=abercrombie,
        author_id=17,
        genre="Fantasy",
    )
    twentyseventh = Book(
        title="Last Argument of Kings",
        series=first_law,
        author=abercrombie,
        author_id=17,
        genre="Fantasy",
    )
    twentyeigth = Book(
        title="The Lies of Locke Lamora",
        series=gentleman,
        author=lynch,
        author_id=20,
        genre="Fantasy",
    )
    twentyninth = Book(
        title="Red Seas Under Red Skies",
        series=gentleman,
        author=lynch,
        author_id=20,
        genre="Fantasy",
    )
    thirtyth = Book(
        title="The Republic of Thieves",
        series=gentleman,
        author=lynch,
        author_id=20,
        genre="Fantasy",
    )
    thirtyfirst = Book(
        title="Jade City",
        series=jade,
        author=lee,
        author_id=11,
        genre="Fantasy",
    )
    thirtysecond = Book(
        title="Jade War",
        series=jade,
        author=lee,
        author_id=11,
        genre="Fantasy",
    )
    thirtythird = Book(
        title="Jade Legacy",
        series=jade,
        author=lee,
        author_id=11,
        genre="Fantasy",
    )
    thirtyfourth = Book(
        title="The Fifth Season",
        series=broken_earth,
        author=jemisin,
        author_id=12,
        genre="Fantasy",
    )
    thirtyfifth = Book(
        title="The Obelisk Gate",
        series=broken_earth,
        author=jemisin,
        author_id=12,
        genre="Fantasy",
    )
    thirtysixth = Book(
        title="The Stone Sky",
        series=broken_earth,
        author=jemisin,
        author_id=12,
        genre="Fantasy",
    )
    thirtyseventh = Book(
        title="The Black Prism",
        series=lightbringer,
        author=weeks,
        author_id=17,
        genre="Fantasy",
    )
    thirtyeigth = Book(
        title="The Blinding Knife",
        series=lightbringer,
        author=weeks,
        author_id=17,
        genre="Fantasy",
    )
    thirtyninth = Book(
        title="The Broken Eye",
        series=lightbringer,
        author=weeks,
        author_id=17,
        genre="Fantasy",
    )
    fourtieth = Book(
        title="A Wizard of Earthsea",
        series=earthsea,
        author=ursula,
        author_id=36,
        genre="Fantasy",
    )
    fortyfirst = Book(
        title="The Tombs of Atuan",
        series=earthsea,
        author=ursula,
        author_id=36,
        genre="Fantasy",
    )
    fortysecond = Book(
        title="The Farthest Shore",
        series=earthsea,
        author=ursula,
        author_id=36,
        genre="Fantasy",
    )
    fortythird = Book(
        title="Storm Front",
        series=dresden_files,
        author=butcher,
        author_id=18,
        genre="Fantasy",
    )
    fortyfourth = Book(
        title="Fool Moon",
        series=dresden_files,
        author=butcher,
        author_id=18,
        genre="Fantasy",
    )
    fortyfifth = Book(
        title="Grave Peril",
        series=dresden_files,
        author=butcher,
        author_id=18,
        genre="Fantasy",
    )
    fortysixth = Book(
        title="Summer Knight",
        series=dresden_files,
        author=butcher,
        author_id=18,
        genre="Fantasy",
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
