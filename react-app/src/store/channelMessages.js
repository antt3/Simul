const GET_MESSAGES = "messages/GET_MESSAGES";
const ADD_EDIT_MESSAGE = "messages/ADD_EDIT_MESSAGE";
const DELETE_MESSAGE = "messages/DELETE_MESSAGE";


export const actionGetMessages = (messages) => {
	return {
		type: GET_MESSAGES,
		messages
	};
};

export const actionAddEditMessage = (message) => {
	console.log('---------Message: ', message, '--------');

	return {
		type: ADD_EDIT_MESSAGE,
		message
	};
};

export const actionDeleteMessage = (messageId) => {
	return {
		type: DELETE_MESSAGE,
		payload: messageId
	};
};


export const thunkGetMessages = (channelId) => async (dispatch) => {
	// console.log('---------here---------');
	const res = await fetch(`/api/channel-messages/${channelId}`);
	if (res.ok) {
		const data = await res.json();
		// console.log('---------data1: ', data, '---------');
		dispatch(actionGetMessages(data.channel_messages));
		return data.channel_messages;

	} else {
		const data = await res.json();
		// console.log('---------data2: ', data, '---------');
		if (data.errors) {
			return data.errors;
		}
	}
};

export const thunkAddMessage = (content, channel_id) => async (dispatch) => {
	console.log('---------Params: ', JSON.stringify({content, channel_id}), '-----------')
	
	const res = await fetch(`/api/channel-messages/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({content, channel_id})
	});
	if (res.ok) {
		const data = await res.json();
		dispatch(actionAddEditMessage(data.channel_message));
		return data.channel_message

	} else {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	}
};

export const thunkEditMessage = (message) => async (dispatch) => {
	const res = await fetch(`/api/channel-messages/${message.id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(message),
	});
	if (res.ok) {
		const data = await res.json();
		dispatch(actionAddEditMessage(data.channel_message));
		return data.channel_message;

	} else {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	}
};

export const thunkRemoveMessage = (messageId) => async (dispatch) => {
	const res = await fetch(`/api/channel-messages/${messageId}`, {
		method: "DELETE",
	});
	if (res.ok) {
		// const data = await res.json();
		dispatch(actionDeleteMessage(messageId));
		return messageId

	} else {
		const data = await res.json();
		if (data.errors) {
			return data.errors;

		}
	}
};


const channelMessagesReducer = (state = {}, action) => {

	let newState;

	switch (action.type) {

		case GET_MESSAGES:
			newState = {};
			action.messages.forEach((message) => {
				newState[message.id] = message;
			});
			return newState;

		case ADD_EDIT_MESSAGE:
			newState = { ...state };
			newState[action.message.id] = action.message;
			return newState;

		case DELETE_MESSAGE:
            newState = { ...state };
                delete newState[action.payload];

            return newState;

		default:
			return state;
	}
}

export default channelMessagesReducer;