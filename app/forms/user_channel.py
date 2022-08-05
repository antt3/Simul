from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class AddUserToChannel(FlaskForm):

    user_id = IntegerField('song', validators=[DataRequired(message='required')])
    channel_id = IntegerField('channel', validators=[DataRequired(message='required')])