from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws import ALLOWED_EXTENSIONS

class BookForm(FlaskForm):
    cover = FileField("cover", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
