from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, User, Channel, Channel_message
from app.forms import ChannelMessageForm, EditChannelMessageForm
import datetime

channel_message_routes = Blueprint("channel_messages", __name__)


def errors_list(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            message = f'{field} is {error}.'
            errorMessages.append(message.capitalize())
    return errorMessages


@channel_message_routes.route("/<int:channel_id>")
@login_required
def get_messages(channel_id):
    # print('-------------Here!!!!---------')
    channel_messages = Channel_message.query.filter(Channel_message.channel_id == channel_id)
    # print('-------------channel_messages: ', channel_messages, '---------')
    return {
        "channel_messages":[message.to_dict() for message in channel_messages]
    }


@channel_message_routes.route("/", methods=["POST"])
@login_required
def new_message():
    # print('--------Here----------')
    form = ChannelMessageForm()
    # print('--------Here2----------')
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('--------Here3----------')
    if form.validate_on_submit():
        # print('--------Here4----------')
        form_message = form.data["message"]
        data = request.json
        # print('-----------data: ', data, '--------')
        channelId = data['channel_id']
        newMessage = Channel_message(
            message = form_message,
            user_id = current_user.id,
            channel_id = channelId,
            edited=False,
            created_at = datetime.datetime.now())
        db.session.add(newMessage)
        db.session.commit()
        return{
            "channel_message": newMessage.to_dict()
        }
    # print('--------Here(Failed) ----------')
    return {'Message Failed To Post'}, 401


@channel_message_routes.route("/<int:message_id>", methods=["PUT"])
@login_required
def edit_message(message_id):
    # print('--------Here: ', message_id,'----------')
    # print('--------Here2----------')
    form = EditChannelMessageForm()
    # print('--------Here4----------')
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # print('--------Here5----------')
        edit_message = Channel_message.query.get(message_id)
        edit_message.message = form.data["message"]
        edit_message.edited=True
        edit_message.created_at=form.data["created_at"]
        db.session.commit()
        return {'channel_message': edit_message.to_dict()}
    # print('--------Here3----------')
    return {'errors': errors_list(form.errors)}, 401

@channel_message_routes.route("/<int:message_id>", methods=["DELETE"])
@login_required
def delete_message(message_id):
        message = Channel_message.query.get(message_id)

        db.session.delete(message)
        db.session.commit()

        return { "message": message_id }