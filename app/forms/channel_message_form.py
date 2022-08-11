from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class ChannelMessageForm(FlaskForm):
    message = StringField(
        "message",
        validators=[DataRequired(message="required")])