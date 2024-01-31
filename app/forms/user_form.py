from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class UserForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired(), Length(min=1, max=50)])
    last_name = StringField('last_name', validators=[DataRequired(), Length(min=1, max=50)])
    username = StringField('username', validators=[DataRequired(), Length(min=1, max=50)])
    email = StringField('email', validators=[DataRequired(), Length(min=1, max=255)])
    password = StringField('password', validators=[DataRequired(), Length(min=1, max=255)])
