from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class ReviewForm(FlaskForm):
    review = StringField('review', validators=[DataRequired(), Length(min=1, max=500)])
    stars = IntegerField('stars', validators=[DataRequired()])
