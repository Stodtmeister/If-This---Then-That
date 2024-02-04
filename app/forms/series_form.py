from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class SeriesForm(FlaskForm):
    series = StringField('series', validators=[DataRequired(), Length(min=1, max=50)])
