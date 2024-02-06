from flask import Blueprint, request, abort
from flask_login import login_required, current_user
from app.models import Board, Book, db
from app.forms import BoardForm
from .auth_routes import validation_errors_to_error_messages


board_routes = Blueprint("board", __name__)

"""
Fetches all boards associated with the currently logged-in user from the database.

Returns:
dict: A dictionary with a key 'boards' and a value being a list of dictionaries, each representing a board, if boards are found.
tuple: A tuple where the first element is a dictionary with a key 'message' and a value being "User currently has no boards",
    and the second element is the status code 404, if no boards are found.
"""
@board_routes.route("/", methods=["GET"])
@login_required
def get_user_board():
    user_boards = Board.query.filter_by(user_id=current_user.id).all()

    if user_boards:
        return {"boards": [boards.to_dict(include_books=False) for boards in user_boards]}, 200
    else:
        return abort(404, {"message": "User currently has no boards"})


"""
Handles POST requests to create a new board.

Returns:
tuple: A tuple where the first element is a dictionary representation of the newly created board and the second element is the status code 201, if the form data is valid.
tuple: A tuple where the first element is a dictionary with a key 'errors' and a value being a list of form validation error messages, and the second element is the status code 400, if the form data is not valid.
"""
@board_routes.route("/", methods=["POST"])
@login_required
def create_board():
    form = BoardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_board = Board(name=form.data["name"], user_id=current_user.id)
        db.session.add(new_board)
        db.session.commit()

        return new_board.to_dict(), 201

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


"""
Handles PUT requests to edit an existing board.

Parameters:
boardId (int): The id of the board to be edited.

Returns:
tuple: A tuple where the first element is a dictionary representation of the updated board and the second element is the status code 201, if the form data is valid.
tuple: A tuple where the first element is a dictionary with a key 'errors' and a value being a list of form validation error messages, and the second element is the status code 400, if the form data is not valid.
tuple: A tuple where the first element is a dictionary with a key 'errors' and a value being a list containing the string "Board not found", and the second element is the status code 404, if no Board with the given boardId exists.
"""
@board_routes.route("/<int:boardId>", methods=["PUT"])
@login_required
def edit_board(boardId):
    board = Board.query.get(boardId)

    if board is None:
        return {"errors": ["Board not found"]}, 404

    form = BoardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        board.name = form.data["name"]
        db.session.commit()

        return board.to_dict(), 201

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


"""
Handles DELETE requests to delete an existing board.

Parameters:
boardId (int): The id of the board to be deleted.

Returns:
tuple: A tuple where the first element is a dictionary with a key 'message' and a value being a string indicating the board has been deleted, and the second element is the status code 200, if the board is successfully deleted.
tuple: A tuple where the first element is a dictionary with a key 'errors' and a value being a list of error messages, and the second element is the status code 404, if no Board with the given boardId exists.
tuple: A tuple where the first element is a dictionary with a key 'errors' and a value being a list containing the string "Unauthorized", and the second element is the status code 403, if the current user is not the owner of the Board.
"""
@board_routes.route("/<int:boardId>", methods=["DELETE"])
@login_required
def delete_board(boardId):
    board = Board.query.get(boardId)

    if board is None:
        return {"errors": ["Board not found"]}, 404

    if current_user.id != board.user_id:
        return {"errors": ["Unauthorized"]}, 403

    db.session.delete(board)
    db.session.commit()

    return {"message": f"'{board.name}' has been deleted"}


"""
Handles GET requests to fetch all books associated with a specific board.

Parameters:
boardId (int): The id of the board whose books are to be fetched.

Returns:
tuple: A tuple where the first element is a dictionary with a key 'books' and a value being a list of dictionaries representing the books, and the second element is the status code 200, if the board exists.
tuple: A tuple where the first element is a dictionary with a key 'errors' and a value being a list containing the string "Board not found", and the second element is the status code 404, if no Board with the given boardId exists.
"""
@board_routes.route("/<int:boardId>/books", methods=["GET"])
@login_required
def get_board_books(boardId):
    board = Board.query.get(boardId)

    if board is None:
        return {"errors": ["Board not found"]}, 404

    books = [book.to_dict(include_author=False, include_boards=False, include_reviews=False, include_recommendations=False) for book in board.books]

    return {"books": books}, 200


"""
Add a book to a board.

Parameters:
boardId (int): The ID of the board to add the book to.
bookId (int): The ID of the book to add to the board.

Returns:
dict: A dictionary representation of the book that was added to the board.
int: A status code indicating the result of the operation (201 if successful, 404 if not).
"""
@board_routes.route("/<int:boardId>/books/<int:bookId>", methods=["POST"])
@login_required
def add_book_to_board(boardId, bookId):
    board = Board.query.get(boardId)
    book = Book.query.get(bookId)

    if board is None:
        return {"errors": ["Board not found"]}, 404

    if book is None:
        return {"errors": ["Book not found"]}, 404

    board.books.append(book)
    db.session.commit()

    return book.to_dict(include_author=False, include_reviews=False, include_recommendations=False), 201


"""
Remove a book from a board.

Parameters:
boardId (int): The ID of the board to remove the book from.
bookId (int): The ID of the book to remove from the board.

Returns:
dict: A dictionary with a success message if the book was removed successfully.
"""
@board_routes.route("/<int:boardId>/books/<int:bookId>", methods=["DELETE"])
@login_required
def remove_book_from_board(boardId, bookId):
    board = Board.query.get(boardId)
    book = Book.query.get(bookId)

    if board is None:
        return {"errors": ["Board not found"]}, 404

    if book is None:
        return {"errors": ["Book not found"]}, 404

    board.books.remove(book)
    db.session.commit()

    return {"message": "Book removed from board"}
