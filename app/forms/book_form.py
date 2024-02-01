from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Length
from app.api.aws import ALLOWED_EXTENSIONS

class BookForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(min=1, max=50)])
    cover = FileField("cover", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    genre = StringField('genre', validators=[DataRequired(), Length(min=1, max=50)])
    author_id = IntegerField('author_id', validators=[DataRequired()])
