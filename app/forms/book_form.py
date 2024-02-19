from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Length, URL
from app.api.aws import ALLOWED_EXTENSIONS

class BookForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(min=1, max=50)])
    series_id = IntegerField('series_id')
    cover = StringField("cover", validators=[URL()])
    genre = StringField('genre', validators=[DataRequired(), Length(min=1, max=50)])
