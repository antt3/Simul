const GET_DMS = "messages/GET_DMS";
const ADD_EDIT_DM = "messages/ADD_EDIT_DM";
const DELETE_DM = "messages/DELETE_DM";


export const actionGetMessages = (messages) => {
	return {
		type: GET_DMS,
		messages
	};
};

export const actionAddEditMessage = (message) => {
	// console.log('---------ActionMessage: ', message, '--------');

	return {
		type: ADD_EDIT_DM,
		message
	};
};

export const actionDeleteMessage = (messageId) => {
	// console.log('----------messageId: ', messageId, '-------------');
	return {
		type: DELETE_DM,
		payload: messageId
	};
};


export const thunkGetMessages = (userId) => async (dispatch) => {
	// console.log('---------here---------');
	const res = await fetch(`/api/direct-messages/${userId}`);
	if (res.ok) {
		const data = await res.json();
		// console.log('---------data1: ', data, '---------');
		dispatch(actionGetMessages(data.direct_messages));
		return data.direct_messages;

	} else {
		const data = await res.json();
		// console.log('---------data2: ', data, '---------');
		if (data.errors) {
			return data.errors;
		}
	}
};

export const thunkAddMessage = (message, ref_id) => async () => {
	// console.log('---------Params: ', JSON.stringify({message, ref_id}), '-----------')
	
	const res = await fetch(`/api/direct-messages/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({message, ref_id})
	});
	if (res.ok) {
		const data = await res.json();
		return data.direct_message

	} else {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	}
};

export const thunkEditMessage = (message, created_at, message_id) => async () => {
	// console.log('---------Params: ', JSON.stringify({message}), '-----------')
	const res = await fetch(`/api/direct-messages/${message_id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({message, created_at}),
	});
	if (res.ok) {
		const data = await res.json();
		actionAddEditMessage(data);
		// console.log("----------EditData: ", data, '----------');
		return data

	} else {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	}
};

export const thunkRemoveMessage = (messageId) => async (dispatch) => {
	const res = await fetch(`/api/direct-messages/${messageId}`, {
		method: "DELETE",
	});
	if (res.ok) {
		// const data = await res.json();
		// dispatch(actionDeleteMessage(messageId));
		const response = await res.json();
		await dispatch(actionDeleteMessage(response.message));
		return response.message;

	} else {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	}
};


const directMessagesReducer = (state = {}, action) => {

	let newState;

	switch (action.type) {

		case GET_DMS:
			newState = {};
			action.messages.forEach((message) => {
				newState[message.id] = message;
			});
			return newState;

		case ADD_EDIT_DM:
			newState = { ...state };
			newState[action.message.id] = action.message;
			return newState;

		case DELETE_DM:
            newState = { ...state };
                delete newState[action.payload];
            return newState;

		default:
			return state;
	}
}

export default directMessagesReducer;