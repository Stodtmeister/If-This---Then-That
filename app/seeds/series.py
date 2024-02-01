from app.models import db, Series, environment, SCHEMA
from sqlalchemy.sql import text

def seed_series():
    series1 = Series(name='The Wheel of Time')
    series2 = Series(name='The Stormlight Archive')
    series3 = Series(name='Mistborn')
    series4 = Series(name='The Kingkiller Chronicle')
    series5 = Series(name='The First Law')
    series6 = Series(name='The Broken Empire')
    series7 = Series(name='The Lightbringer')
    series8 = Series(name='The Witcher')
    series9 = Series(name='The Inheritance Cycle')
    series10 = Series(name='The Dark Tower')
    series11 = Series(name='The Dresden Files')
    series12 = Series(name='The Powder Mage')
    series13 = Series(name='The Demon Cycle')
    series14 = Series(name='The Black Company')
    series15 = Series(name='The Malazan Book of the Fallen')
    series16 = Series(name='The Chronicles of Narnia')
    series17 = Series(name='The Earthsea Cycle')
    series18 = Series(name='The Broken Earth')
    series19 = Series(name='The Books of Babel')
    series20 = Series(name='The Licanius Trilogy')
    series21 = Series(name='The Lightbringer')
    series22 = Series(name='The Witcher')
    series23 = Series(name='The Inheritance Cycle')
    series24 = Series(name='The Dark Tower')
    series25 = Series(name='The Lord of the Rings')
    series26 = Series(name='Harry Potter')
    series27 = Series(name='Gentleman Bastard')
    series28 = Series(name='The Green Bone Saga')
    series29 = Series(name='The Poppy War')
    series30 = Series(name='The Daevabad Trilogy')
    series31 = Series(name='The Divine Cities')
    series32 = Series(name='A Song of Ice and Fire')
    series33 = Series(name='The First Law')


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
