from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .book import book_recommendation


# class Recommendation(db.Model):
#     __tablename__ = 'recommendations'

#     if environment == 'production':
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     books = db.relationship('Book', secondary=book_recommendation, back_populates='recommendations')

#     def __repr__(self):
#         return f'<Recommendation {self.id} {self.title}>'

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'books': [book.to_dict(include_boards=False) for book in self.books],
#         }

class Recommendation(db.Model):
    __tablename__ = 'recommendations'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    book_recommendations = db.relationship('BookRecommendation', back_populates='recommendation')

    def __repr__(self):
        return f'<Recommendation {self.id}>'

    def to_dict(self, include_books=True):
        data = {
            'id': self.id,
        }
        if include_books:
            data['books'] = [br.book.to_dict(include_boards=False, include_recommendations=False, include_reviews=False) for br in self.book_recommendations]
        return data

    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'books': [br.book.to_dict(include_boards=False, include_recommendations=False, include_reviews=False) for br in self.book_recommendations],
    #     }
