from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class BoardForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=1, max=50)])
    user_id = IntegerField('user_id', validators=[DataRequired()])
