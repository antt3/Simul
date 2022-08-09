from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class AddChannel(FlaskForm):
    title = StringField('title', validators=[DataRequired(message='required')])
    description = StringField('description')
