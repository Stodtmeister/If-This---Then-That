from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class ReviewForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    book_id = IntegerField('book_id', validators=[DataRequired()])
    review = StringField('review', validators=[DataRequired(), Length(min=1, max=500)])
    stars = IntegerField('stars', validators=[DataRequired()])
    
