from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('already in use.')


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    # username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(message='required'), user_exists])
    full_name = StringField('full name', validators=[DataRequired(message='required')])
    team = StringField('team', validators=[DataRequired(message='required')])
    password = StringField('password', validators=[DataRequired(message='required')])