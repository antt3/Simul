from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class EditChannelMessageForm(FlaskForm):
    message = StringField(
        "message",
        validators=[DataRequired(message="required")])
    created_at = StringField(
        "created_at",
        validators=[DataRequired(message="required")])
