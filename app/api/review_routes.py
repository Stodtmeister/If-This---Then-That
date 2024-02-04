from flask import Blueprint, request, abort, jsonify
from flask_login import login_required, current_user
from app.models import Review, Book, db
from app.forms import ReviewForm
from .auth_routes import validation_errors_to_error_messages


review_routes = Blueprint('review', __name__)


"""
Get all reviews for a book.

Parameters:
bookId (int): The ID of the book to get reviews for.

Returns:
dict: A dictionary with a key 'reviews' and a value that is a list of dictionaries,
each representing a review for the book.
"""
@review_routes.route('/<int:bookId>/reviews', methods=['GET'])
def get_reviews(bookId):
    book = Book.query.get(bookId)

    if book is None:
        return {"errors": ["Book not found"]}

    reviews = [review.to_dict(include_books=False, include_user=False) for review in book.reviews]
    return {'reviews': reviews}


"""
Handles the submission of a new book review.

Parameters:
bookId (int): The ID of the book to which the review is being added.

Returns:
A JSON response containing the data of the newly created review if the form
validation is successful, or an error message if the book is not found or the form
validation fails.
"""
@review_routes.route('/<int:bookId>/reviews', methods=["POST"])
@login_required
def submit_review(bookId):
    book = Book.query.get(bookId)

    if book is None:
        return {"errors": ["Book not found"]}

    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_review = Review(
            user_id=current_user.id,
            book_id=book.id,
            review=form.data['review'],
            stars=form.data['stars'],
        )

        book.reviews.append(new_review)
        db.session.commit()

        return jsonify(new_review.to_dict(include_books=False)), 201

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400
