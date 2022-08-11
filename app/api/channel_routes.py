from copyreg import constructor
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db
from app.models.db import User
from app.models.db import Channel
# from app.models.db import Users_Channels
from app.forms.channel import AddChannel
# from app.forms.user_channel import AddUserToChannel


channel_routes = Blueprint('channels', __name__)


@channel_routes.route('/')
# @login_required
def channels():
    # print('-------Being Called:----------')
    channels = Channel.query.all()
    # print('-------channels: ', channels,'----------')
    return {'channels': [channel.to_dict() for channel in channels]}


# @channel_routes.route('/users/<int:channel_id>')
# @login_required
# def channel_users(channel_id):
#     users = User.query.join(Users_Channels).join(Channel).filter(Channel.id == channel_id).all()
#     db.session.commit()
#     # print('-------channels: ', channels,'----------')
#     return {'users': [user.to_dict() for user in users]}


@channel_routes.route('/', methods=['POST'])
@login_required
def add_channel():
    form = AddChannel()

    channel = Channel(
        title=form.data['title'],
        description=form.data['description'],
        user_id=current_user.id
    )
    db.session.add(channel)
    db.session.commit()
    # print('------New Channel Created: ', channel.to_dict(), '----------')
    return channel.to_dict()


@channel_routes.route('/add-user/<int:channel_id>/<int:user_id>')
@login_required
def add_user(channel_id,user_id):
    channel = Channel.query.get(channel_id)
    user = User.query.get(user_id)
    # print('---')
    # print('---')
    # print('---')
    if user in channel.users:
        print('already has user')
    else:
        channel.users.append(user)
    # print('---')
    # print('---')
    # print('---')
    # print('---')
    # print('---')
    db.session.commit()
    return('-------------User Added--------------')


@channel_routes.route('/delete-user/<int:channel_id>/<int:user_id>')
@login_required
def delete_user(channel_id,user_id):
    channel = Channel.query.get(channel_id)
    user = User.query.get(user_id)
    # print('---')
    # print('---')
    # print('---')
    if user in channel.users:
        channel.users.remove(user)
    else:
        print('already removed user')
    # print('---')
    # print('---')
    # print('---')
    # print('---')
    # print('---')
    db.session.commit()
    return('User Removed')


@channel_routes.route('/<int:channel_id>', methods=['DELETE'])
@login_required
def delete_channel(channel_id):
    channel = Channel.query.get(channel_id)
    print('-------channel: ', channel,'----------')
    # if channel.user_id != current_user.id:
    #     return jsonify({'error': 'You do not have permission to delete this channel'})
    db.session.delete(channel)
    db.session.commit()
    return("Channel Deleted")


@channel_routes.route('/<int:channel_id>', methods=['PUT'])
@login_required
def update_channel(channel_id):
    # print('--------channel_id: ', channel_id, '------------')
    channel = Channel.query.get(channel_id)
    # print('--------channel.to_dict(): ', channel.to_dict(), '------------')
    form = AddChannel()
    # print('--------form.data: ', form.data, '------------')
    channel.title = form.data['title']
    channel.description = form.data['description']
    db.session.commit()
    return channel.to_dict()