@author_routes.route('/')
def get_authors():
    authors = Author.query.all()
    return {"authors": [author.to_dict() for author in authors]}


#author
def to_dict(self):
    return {
        'id': self.id,
        'name': self.name,
        'series': [series.to_dict(include_author=False) for series in self.series],
    }
#series
def to_dict(self, include_author=True):
    data = {
        'id': self.id,
        'name': self.name,
        'author_id': self.author_id,
        'books': [book.to_dict(include_author=False) for book in self.books],
    }
    if include_author:
        data['author'] = self.author.to_dict(include_series=False)
#books
def to_dict(self, include_author=True, include_boards=True):
    data = {
        'id': self.id,
        'title': self.title,
        'cover': self.cover,
        'genre': self.genre,
        'authorId': self.author_id,
        'seriesId': self.series_id,
        'reviews': [review.to_dict() for review in self.reviews],
        # 'author': self.author.to_dict(),
        # 'boards': [board.to_dict() for board in self.boards],
        # 'recommendations': [recommendation.to_dict() for recommendation in self.recommendations],
    }
    # if include_author:
    #     data['author'] = self.author.to_dict()
    # if include_boards:
    #     data['boards'] = [board.to_dict(include_books=False) for board in self.boards]
    return data
# #reviews
# def to_dict(self, include_user=True, include_book=True):
#     data = {
#         'id': self.id,
#         'userId': self.user_id,
#         'bookId': self.book_id,
#         'review': self.review,
#         'stars': self.stars,
#         'createdAt': self.created_at,
#         'updatedAt': self.updated_at,
#         # 'user': self.user.to_dict(),
#         # 'book': self.book.to_dict(),
#     }
#     if include_user:
#         data['user'] = self.user.to_dict(include_reviews=False)
#     if include_book:
#         data['book'] = self.book.to_dict(include_reviews=False)
#     return data
# #boards
# def to_dict(self, include_books=True):
#     data = {
#         'id': self.id,
#         'name': self.name,
#         'userId': self.user_id,
#         'created_at': self.created_at,
#         'updated_at': self.updated_at,
#         # 'user': self.user.to_dict(),
#         # 'books': [book.to_dict() for book in self.books],
#     }
#     if include_books:
#         data['books'] = [book.to_dict(include_boards=False) for book in self.books]
#     return data
# #recommendations
# def to_dict(self):
#     return {
#         'id': self.id,
#         'books': [book.to_dict(include_boards=False) for book in self.books],
#     }

# #user
# def to_dict(self, include_reviews=True, include_tbr=True):
#     data = {
#         'id': self.id,
#         'firstName': self.first_name,
#         'lastName': self.last_name,
#         'username': self.username,
#         'email': self.email,
#         # 'tbr': [board.id for board in self.tbr],
#         # 'reviews': [review.id for review in self.reviews],
#     }
#     if include_reviews:
#         data['reviews'] = [review.to_dict(include_user=False) for review in self.reviews]
#     if include_tbr:
#         data['tbr'] = [board.to_dict(include_books=False) for board in self.tbr]
