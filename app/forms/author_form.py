from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class AuthorForm(FlaskForm):
    # first_name = StringField('first_name', validators=[DataRequired(), Length(min=1, max=50)])
    # last_name = StringField('last_name', validators=[DataRequired(), Length(min=1, max=50)])
    author = StringField('author', validators=[DataRequired(), Length(min=1, max=50)])
