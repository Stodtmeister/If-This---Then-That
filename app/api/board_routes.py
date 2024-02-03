from flask import Blueprint, request, abort
from flask_login import login_required, current_user
from app.models import Board, db
from app.forms import BoardForm
from .auth_routes import validation_errors_to_error_messages


board_routes = Blueprint("board", __name__)

"""
Fetches all boards associated with the currently logged-in user from the database.

The function queries the Board model for all boards where the user_id matches the id of the currently logged-in user.
If boards are found, it returns a dictionary with a key 'boards' and a value being a list of dictionaries, each representing a board.
If no boards are found, it aborts the request and returns a 404 error with a message "User currently has no boards".

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
        return {"boards": [boards.to_dict() for boards in user_boards]}, 200
    else:
        return abort(404, {"message": "User currently has no boards"})


"""
Handles POST requests to create a new board.

This function creates a new instance of the BoardForm and sets its CSRF token from the request's cookies.
If the form data is valid, it creates a new Board with the name and user_id from the form data, adds it to the database session, and commits the session.
The newly created board is then returned as a dictionary with a 201 status code.
If the form data is not valid, it returns a dictionary of form validation errors with a 400 status code.

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

This function fetches the Board with the given boardId from the database. If no such Board exists, it returns a 404 error.
A new instance of the BoardForm is created and its CSRF token is set from the request's cookies.
If the form data is valid, it updates the name of the fetched Board with the name from the form data and commits the changes to the database.
The updated board is then returned as a dictionary with a 201 status code.
If the form data is not valid, it returns a dictionary of form validation errors with a 400 status code.

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

This function fetches the Board with the given boardId from the database. If no such Board exists, it returns a 404 error.
If the current user is not the owner of the Board, it returns a 403 error.
Otherwise, it deletes the Board from the database and commits the changes.

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
