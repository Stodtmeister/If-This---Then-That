from flask import Blueprint, request, abort, jsonify
from flask_login import login_required, current_user
from app.models import Review, Book, BookRecommendation, db
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


"""
Handles the editing of an existing book review.

Parameters:
bookId (int): The ID of the book whose review is being edited.
reviewId (int): The ID of the review to be edited.

Returns:
A JSON response containing the data of the updated review if the form validation is successful,
or an error message if the user is not the author of the review or the form validation fails.
"""
@review_routes.route('/<int:bookId>/reviews/<int:reviewId>', methods=["PUT"])
@login_required
def edit_review(bookId, reviewId):
    review = Review.query.get(reviewId)

    if review is None:
        return {"errors": ["Review not found"]}

    if current_user.id != review.user_id:
        return {"forbidden": "You can only edit your own reviews"}, 403

    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        review.review = form.data['review']
        review.stars = form.data['stars']

        db.session.commit()
        return jsonify(review.to_dict(include_books=False)), 201

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


"""
Handles the deletion of an existing book review.

Parameters:
bookId (int): The ID of the book whose review is being deleted.
reviewId (int): The ID of the review to be deleted.

Returns:
A JSON response with a success message if the review is successfully deleted, or an error message
if the user is not the author of the review or the review does not exist.
"""
@review_routes.route('/<int:bookId>/reviews/<int:reviewId>', methods=['DELETE'])
@login_required
def delete_review(bookId, reviewId):
    review = Review.query.get(reviewId)

    if review is None:
        return {"errors": ["Review not found"]}

    if current_user.id != review.user_id:
        return {"forbidden": "You can only edit your own reviews"}, 403

    db.session.delete(review)
    db.session.commit()

    return {"message": "This review has been deleted"}


@review_routes.route('/<int:bookId>/recommendations', methods=["GET"])
def get_recommendations(bookId):
    book = Book.query.get(bookId)

    if book is None:
        return {"errors": ["Book not found"]}

    recommendations = [br.to_dict(include_books=False, include_recommendations=False) for br in book.book_recommendations]

    return {'recommendations': recommendations}


@review_routes.route('/<int:bookId>/recommendations', methods=["POST"])
@login_required
def submit_recommendation(bookId):
    book = Book.query.get(bookId)

    if book is None:
        return {"errors": ["Book not found"]}

    data = request.get_json()
    recommendationId = data['recommendationId']

    recommendation = Book.query.get(recommendationId)
    # return {'recommendation': recommendation.to_dict(include_author=False, include_boards=False, include_reviews=False, include_recommendations=False, include_series=False)}

    if recommendation is None:
        return {"errors": ["Recommendation not found"]}, 404

    existing_recommendation = BookRecommendation.query.filter_by(
        book_id=bookId,
        recommendation_id=recommendationId
    ).first()

    if existing_recommendation is not None:
        return {"errors": ["This recommendation already exists"]}, 400

    book_recommendation = BookRecommendation(
        book_id=bookId,
        recommendation_id=recommendationId,
        votes=1
    )

    book.book_recommendations.append(book_recommendation)
    db.session.commit()

    book_recommendations_dicts = [br.to_dict(include_books=False, include_recommendations=False) for br in book.book_recommendations]

    return {"book_recommendations": book_recommendations_dicts}, 201
