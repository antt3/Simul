from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, User, Channel, Channel_message
from app.forms import ChannelMessageForm
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


@channel_message_routes.route("/<int:messageId>", methods=["PUT", "DELETE"])
@login_required
def edit_delete_message(messageId):

    if request.method == "PUT":
        form = ChannelMessageForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            edit_message = Channel_message.query.get(messageId)
            edit_message.message = form.data["message"]
            edit_message.edited=True
            db.session.commit()
            return { "message": edit_message.to_dict() }

        return {'errors': errors_list(form.errors)}, 401

    if request.method == "DELETE":
        message = Channel_message.query.get(messageId)

        db.session.delete(message)
        db.session.commit()

        return { "message": "Deleted Successfully" }