from flask import Blueprint, request
from flask_login import login_required
from app.models import Author, db
from app.forms import AuthorForm
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy.exc import IntegrityError


author_routes = Blueprint("author", __name__)


@author_routes.route("/", methods=["GET"])
def get_authors():
    authors = Author.query.all()
    return {"authors": [author.to_dict() for author in authors]}


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
