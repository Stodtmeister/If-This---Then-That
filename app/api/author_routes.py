from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import Author, db
from app.forms import AuthorForm
from .auth_routes import validation_errors_to_error_messages


author_routes = Blueprint('author', __name__)


@author_routes.route('/')
def get_authors():
    authors = Author.query.all()
    return {"authors": [author.to_dict() for author in authors]}
