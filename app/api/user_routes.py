from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db
from app.models.db import User
from .app.forms import SignUpForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:user_id>')
@login_required
def user(user_id):
    user = User.query.get(user_id)
    return user.to_dict()


# @user_routes.route('/<int:user_id>', methods=['PUT'])
# @login_required
# def update_user(user_id):
#     # print('--------channel_id: ', channel_id, '------------')
#     user = User.query.get(user_id)
#     # print('--------channel.to_dict(): ', channel.to_dict(), '------------')
#     form = SignUpForm()
#     # print('--------form.data: ', form.data, '------------')
#     user.email = form.data['title']
#     user.full_name = form.data['description']
#     db.session.commit()
#     return user.to_dict()
