from flask import Blueprint, request, abort
from flask_login import login_required
from app.models import Author, Book, Series, db
from app.forms import AuthorForm, BookForm
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy.exc import IntegrityError
from sqlalchemy import func


author_routes = Blueprint("author", __name__)


"""
Fetches all authors from the database.

Returns:
dict: A dictionary with a key 'authors' and a value being a list of dictionaries,
each representing an author.
"""
@author_routes.route("/", methods=["GET"])
def get_authors():
    authors = Author.query.all()
    authors.sort(key=lambda author: author.name.split(' ')[-1])
    return {"authors": [author.to_dict() for author in authors]}


"""
Fetches an author by their ID.

Parameters:
authorId (int): The ID of the author to fetch.

Returns:
dict: A dictionary representation of the author if found.
abort: A 404 error if the author is not found.
"""
@author_routes.route("/<int:authorId>", methods=["GET"])
def get_author_by_id(authorId):
    author = Author.query.get(authorId)

    if author:
        return author.to_dict(), 200
    else:
        return abort(404, {"message": "Author not found"})

"""
Creates a new author in the database.

The function validates the submitted form data, creates a new author if the validation is successful,
and commits the new author to the database. If an author with the same name already exists, it rolls back
the session and returns an error. If the form validation fails, it returns the validation errors.

Returns:
dict: A dictionary representation of the new author if the creation is successful.
dict: A dictionary with a key 'errors' and a value being an error message if the creation fails.
"""
@author_routes.route("/", methods=["POST"])
@login_required
def create_author():
    form = AuthorForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        author = Author(name=form.data["name"])
        db.session.add(author)
        try:
            db.session.commit()
            return author.to_dict()
        except IntegrityError:
            db.session.rollback()
            return {"errors": "An author with this name already exists."}, 400
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 401


"""
Add a new book to an author.

Parameters:
authorId (int): The ID of the author to whom the book will be added.

Returns:
dict: A dictionary representation of the author if the book is successfully added,
or a dictionary containing form validation error messages if the form data is invalid.
"""
@author_routes.route("/<int:authorId>/books", methods=["POST"])
@login_required
def add_book_to_author(authorId):
    author = Author.query.get(authorId)
    if not author:
        return abort(404, {"message": "Author not found"})

    form = BookForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        series_id = form.data.get("series_id")
        if not series_id:
            standalone_series = Series.query.get(999999)
            if not standalone_series:
                standalone_series = Series(id=999999, name="stand-alone", author_id=authorId)
                db.session.add(standalone_series)
                db.session.commit()

            series_id = 999999

        book = Book(
            title=form.data["title"],
            genre=form.data["genre"],
            cover=form.data["cover"],
            author_id=authorId,
            series_id=series_id,
        )

        author.books.append(book)
        db.session.add(book)
        db.session.commit()

        return author.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
