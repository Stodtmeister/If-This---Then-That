from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class AuthorForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=1, max=50)])
