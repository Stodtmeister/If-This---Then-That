from app.models import db, Series, environment, SCHEMA
from sqlalchemy.sql import text

def seed_series():
    series1 = Series(name='The Wheel of Time', author_id=1)
    series2 = Series(name='The Stormlight Archive', author_id=2)
    series3 = Series(name='Mistborn', author_id=2)
    series4 = Series(name='The Kingkiller Chronicle', author_id=3)
    series5 = Series(name='The First Law', author_id=4)
    series6 = Series(name='The Broken Empire', author_id=5)
    series7 = Series(name='The Lightbringer', author_id=6)
    series8 = Series(name='The Witcher', author_id=7)
    series9 = Series(name='The Inheritance Cycle', author_id=8)
    series10 = Series(name='The Dark Tower', author_id=9)
    series11 = Series(name='The Dresden Files', author_id=10)
    series12 = Series(name='The Powder Mage', author_id=11)
    series13 = Series(name='The Demon Cycle', author_id=12)
    series14 = Series(name='The Black Company', author_id=13)
    series15 = Series(name='The Malazan Book of the Fallen', author_id=14)
    series16 = Series(name='The Chronicles of Narnia', author_id=15)
    series17 = Series(name='The Earthsea Cycle', author_id=16)
    series18 = Series(name='The Broken Earth', author_id=17)
    series19 = Series(name='The Books of Babel', author_id=18)
    series20 = Series(name='The Licanius Trilogy', author_id=19)
    series21 = Series(name='The Lightbringer', author_id=20)
    series22 = Series(name='The Witcher', author_id=21)
    series23 = Series(name='The Inheritance Cycle', author_id=22)
    series24 = Series(name='The Dark Tower', author_id=23)
    series25 = Series(name='The Lord of the Rings', author_id=24)
    series26 = Series(name='Harry Potter', author_id=25)
    series27 = Series(name='Gentleman Bastard', author_id=26)
    series28 = Series(name='The Green Bone Saga', author_id=27)
    series29 = Series(name='The Poppy War', author_id=28)
    series30 = Series(name='The Daevabad Trilogy', author_id=29)
    series31 = Series(name='The Divine Cities', author_id=30)
    series32 = Series(name='A Song of Ice and Fire', author_id=31)
    series33 = Series(name='The First Law', author_id=32)


    db.session.add_all([series1, series2, series3, series4, series5, series6, series7, series8, series9, series10, series11])
    db.session.add_all([series12, series13, series14, series15, series16, series17, series18, series19, series20, series21, series22])
    db.session.add_all([series23, series24, series25, series26, series27, series28, series29, series30, series31, series32, series33])
    db.session.commit()

def undo_series():
    if environment == 'production':
        db.session.execute(text(f'TRUNCATE {SCHEMA}.series RESTART IDENTITY CASCADE;'))
    else:
        db.session.execute(text('DELETE FROM series;'))
    db.session.commit()
