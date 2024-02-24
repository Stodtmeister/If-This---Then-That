from app.models import db, Book, environment, SCHEMA
from sqlalchemy.sql import text
from app.models import Author, Series
import requests

# def fetch_book_cover(title, author):
#     response = requests.get(f"https://www.googleapis.com/books/v1/volumes?q=intitle:{title}+inauthor:{author}")
#     data = response.json()
#     if 'items' in data:
#         return data['items'][0]['volumeInfo']['imageLinks']['thumbnail']
#     else:
#         return None

def fetch_book_cover(title, author):
    try:
        response = requests.get(f"https://www.googleapis.com/books/v1/volumes?q=intitle:{title}+inauthor:{author}")
        response.raise_for_status()  # This will raise an exception if the response status is not 200
        data = response.json()
        if 'items' in data:
            return data['items'][0]['volumeInfo']['imageLinks']['thumbnail']
    except requests.exceptions.RequestException as err:
        print(f"Error occurred: {err}")
    return None

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
        cover=fetch_book_cover("The Hobbit", "J.R.R. Tolkien")
    )
    second = Book(
        title="The Fellowship of the Ring",
        series=lotr,
        author=tolkien,
        author_id=1,
        genre="Fantasy",
        cover=fetch_book_cover("The Fellowship of the Ring", "J.R.R. Tolkien")
    )
    third = Book(
        title="The Two Towers",
        series=lotr,
        author=tolkien,
        author_id=1,
        genre="Fantasy",
        cover=fetch_book_cover("The Two Towers", "J.R.R. Tolkien")
    )
    fourth = Book(
        title="The Return of the King",
        series=lotr,
        author=tolkien,
        author_id=1,
        genre="Fantasy",
        cover=fetch_book_cover("The Return of the King", "J.R.R. Tolkien")
    )
    fifth = Book(
        title="The Final Empire",
        series=mistborn,
        author=sanderson,
        author_id=4,
        genre="Fantasy",
        cover=fetch_book_cover("The Final Empire", "Brandon Sanderson")
    )
    sixth = Book(
        title="The Well of Ascension",
        series=mistborn,
        author=sanderson,
        author_id=4,
        genre="Fantasy",
        cover=fetch_book_cover("The Well of Ascension", "Brandon Sanderson")
    )
    seventh = Book(
        title="The Hero of Ages",
        series=mistborn,
        author=sanderson,
        author_id=4,
        genre="Fantasy",
        cover=fetch_book_cover("The Hero of Ages", "Brandon Sanderson")
    )
    eighth = Book(
        title="The Way of Kings",
        series=stormlight,
        author=sanderson,
        author_id=4,
        genre="Fantasy",
        cover=fetch_book_cover("The Way of Kings", "Brandon Sanderson")
    )
    ninth = Book(
        title="A Game of Thrones",
        series=thrones,
        author=martin,
        author_id=3,
        genre="Fantasy",
        cover=fetch_book_cover("A Game of Thrones", "George R.R. Martin")
    )
    tenth = Book(
        title="A Clash of Kings",
        series=thrones,
        author=martin,
        author_id=3,
        genre="Fantasy",
        cover=fetch_book_cover("A Clash of Kings", "George R.R. Martin")
    )
    eleventh = Book(
        title="A Storm of Swords",
        series=thrones,
        author=martin,
        author_id=3,
        genre="Fantasy",
        cover=fetch_book_cover("A Storm of Swords", "George R.R. Martin")
    )
    twelfth = Book(
        title="A Feast for Crows",
        series=thrones,
        author=martin,
        author_id=3,
        genre="Fantasy",
        cover=fetch_book_cover("A Feast for Crows", "George R.R. Martin")
    )
    thirdteenth = Book(
        title="A Dance with Dragons",
        series=thrones,
        author=martin,
        author_id=3,
        genre="Fantasy",
        cover=fetch_book_cover("A Dance with Dragons", "George R.R. Martin")
    )
    fourteenth = Book(
        title="The Name of the Wind",
        series=kingkiller,
        author=rothfuss,
        author_id=5,
        genre="Fantasy",
        cover=fetch_book_cover("The Name of the Wind", "Patrick Rothfuss")
    )
    fifteenth = Book(
        title="The Wise Man's Fear",
        series=kingkiller,
        author=rothfuss,
        author_id=5,
        genre="Fantasy",
        cover=fetch_book_cover("The Wise Man's Fear", "Patrick Rothfuss")
    )
    sixteenth = Book(
        title="The Eye of the World",
        series=time,
        author=jordan,
        author_id=7,
        genre="Fantasy",
        cover=fetch_book_cover("The Eye of the World", "Robert Jordan")
    )
    seventeenth = Book(
        title="The Great Hunt",
        series=time,
        author=jordan,
        author_id=7,
        genre="Fantasy",
        cover=fetch_book_cover("The Great Hunt", "Robert Jordan")
    )
    eighteenth = Book(
        title="The Dragon Reborn",
        series=time,
        author=jordan,
        author_id=7,
        genre="Fantasy",
        cover=fetch_book_cover("The Dragon Reborn", "Robert Jordan")
    )
    nintheenth = Book(
        title="The Shadow Rising",
        series=time,
        author=jordan,
        author_id=7,
        genre="Fantasy",
        cover=fetch_book_cover("The Shadow Rising", "Robert Jordan")
    )
    twentieth = Book(
        title="The Fires of Heaven",
        series=time,
        author=jordan,
        author_id=7,
        genre="Fantasy",
        cover=fetch_book_cover("The Fires of Heaven", "Robert Jordan")
    )
    twentyfirst = Book(
        title="Harry Potter and the Sorcerer's Stone",
        series=potter,
        author=rowling,
        author_id=2,
        genre="Fantasy",
        cover=fetch_book_cover("Harry Potter and the Sorcerer's Stone", "J.K. Rowling")
    )
    twentysecond = Book(
        title="Harry Potter and the Chamber of Secrets",
        series=potter,
        author=rowling,
        author_id=2,
        genre="Fantasy",
        cover=fetch_book_cover("Harry Potter and the Chamber of Secrets", "J.K. Rowling")
    )
    twentythird = Book(
        title="Harry Potter and the Prisoner of Azkaban",
        series=potter,
        author=rowling,
        author_id=2,
        genre="Fantasy",
        cover=fetch_book_cover("Harry Potter and the Prisoner of Azkaban", "J.K. Rowling")
    )
    twentyfourth = Book(
        title="Harry Potter and the Goblet of Fire",
        series=potter,
        author=rowling,
        author_id=2,
        genre="Fantasy",
        cover=fetch_book_cover("Harry Potter and the Goblet of Fire", "J.K. Rowling")
    )
    twentyfifth = Book(
        title="The Blade Itself",
        series=first_law,
        author=abercrombie,
        author_id=17,
        genre="Fantasy",
        cover=fetch_book_cover("The Blade Itself", "Joe Abercrombie")
    )
    twentysixth = Book(
        title="Before They Are Hanged",
        series=first_law,
        author=abercrombie,
        author_id=17,
        genre="Fantasy",
        cover=fetch_book_cover("Before They Are Hanged", "Joe Abercrombie")
    )
    twentyseventh = Book(
        title="Last Argument of Kings",
        series=first_law,
        author=abercrombie,
        author_id=17,
        genre="Fantasy",
        cover=fetch_book_cover("Last Argument of Kings", "Joe Abercrombie")
    )
    twentyeigth = Book(
        title="The Lies of Locke Lamora",
        series=gentleman,
        author=lynch,
        author_id=20,
        genre="Fantasy",
        cover=fetch_book_cover("The Lies of Locke Lamora", "Scott Lynch")
    )
    twentyninth = Book(
        title="Red Seas Under Red Skies",
        series=gentleman,
        author=lynch,
        author_id=20,
        genre="Fantasy",
        cover=fetch_book_cover("Red Seas Under Red Skies", "Scott Lynch")
    )
    thirtyth = Book(
        title="The Republic of Thieves",
        series=gentleman,
        author=lynch,
        author_id=20,
        genre="Fantasy",
        cover=fetch_book_cover("The Republic of Thieves", "Scott Lynch")
    )
    thirtyfirst = Book(
        title="Jade City",
        series=jade,
        author=lee,
        author_id=11,
        genre="Fantasy",
        cover=fetch_book_cover("Jade City", "Fonda Lee")
    )
    thirtysecond = Book(
        title="Jade War",
        series=jade,
        author=lee,
        author_id=11,
        genre="Fantasy",
        cover=fetch_book_cover("Jade War", "Fonda Lee")
    )
    thirtythird = Book(
        title="Jade Legacy",
        series=jade,
        author=lee,
        author_id=11,
        genre="Fantasy",
        cover=fetch_book_cover("Jade Legacy", "Fonda Lee")
    )
    thirtyfourth = Book(
        title="The Fifth Season",
        series=broken_earth,
        author=jemisin,
        author_id=12,
        genre="Fantasy",
        cover=fetch_book_cover("The Fifth Season", "N.K. Jemisin")
    )
    thirtyfifth = Book(
        title="The Obelisk Gate",
        series=broken_earth,
        author=jemisin,
        author_id=12,
        genre="Fantasy",
        cover=fetch_book_cover("The Obelisk Gate", "N.K. Jemisin")
    )
    thirtysixth = Book(
        title="The Stone Sky",
        series=broken_earth,
        author=jemisin,
        author_id=12,
        genre="Fantasy",
        cover=fetch_book_cover("The Stone Sky", "N.K. Jemisin")
    )
    thirtyseventh = Book(
        title="The Black Prism",
        series=lightbringer,
        author=weeks,
        author_id=17,
        genre="Fantasy",
        cover=fetch_book_cover("The Black Prism", "Brent Weeks")
    )
    thirtyeigth = Book(
        title="The Blinding Knife",
        series=lightbringer,
        author=weeks,
        author_id=17,
        genre="Fantasy",
        cover=fetch_book_cover("The Blinding Knife", "Brent Weeks")
    )
    thirtyninth = Book(
        title="The Broken Eye",
        series=lightbringer,
        author=weeks,
        author_id=17,
        genre="Fantasy",
        cover=fetch_book_cover("The Broken Eye", "Brent Weeks")
    )
    fourtieth = Book(
        title="A Wizard of Earthsea",
        series=earthsea,
        author=ursula,
        author_id=36,
        genre="Fantasy",
        cover=fetch_book_cover("A Wizard of Earthsea", "Ursula K. Le Guin")
    )
    fortyfirst = Book(
        title="The Tombs of Atuan",
        series=earthsea,
        author=ursula,
        author_id=36,
        genre="Fantasy",
        cover=fetch_book_cover("The Tombs of Atuan", "Ursula K. Le Guin")
    )
    fortysecond = Book(
        title="The Farthest Shore",
        series=earthsea,
        author=ursula,
        author_id=36,
        genre="Fantasy",
        cover=fetch_book_cover("The Farthest Shore", "Ursula K. Le Guin")
    )
    fortythird = Book(
        title="Storm Front",
        series=dresden_files,
        author=butcher,
        author_id=18,
        genre="Fantasy",
        cover=fetch_book_cover("Storm Front", "Jim Butcher")
    )
    fortyfourth = Book(
        title="Fool Moon",
        series=dresden_files,
        author=butcher,
        author_id=18,
        genre="Fantasy",
        cover=fetch_book_cover("Fool Moon", "Jim Butcher")
    )
    fortyfifth = Book(
        title="Grave Peril",
        series=dresden_files,
        author=butcher,
        author_id=18,
        genre="Fantasy",
        cover=fetch_book_cover("Grave Peril", "Jim Butcher")
    )
    fortysixth = Book(
        title="Summer Knight",
        series=dresden_files,
        author=butcher,
        author_id=18,
        genre="Fantasy",
        cover=fetch_book_cover("Summer Knight", "Jim Butcher")
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
