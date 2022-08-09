const GET_CHANNELS = "channels/GET_CHANNELS";
const ADD_CHANNEL = "channels/ADD_CHANNEL";
const EDIT_CHANNEL = "channels/EDIT_CHANNEL";
const DELETE_CHANNEL = "channels/DELETE_CHANNEL";

const actionGetChannels = (channels) => {
	return {
		type: GET_CHANNELS,
		channels
	};
};

const actionAddChannel = (channel) => {
	return {
		type: ADD_CHANNEL,
		channel
	};
};

const actionEditChannel = (channel) => {
	return {
		type: EDIT_CHANNEL,
		channel
	};
};

const actionDeleteChannel = (channelId) => {
	return {
		type: DELETE_CHANNEL,
		channelId
	};
};

export const thunkGetChannels = () => async (dispatch) => {
	// console.log('Being Called.')
	const res = await fetch("/api/channels/");
	// console.log('-------res: ', res, '-------')
	const channels = await res.json();
	if (res.ok) dispatch(actionGetChannels(channels));
	return res;
};


export const thunkAddChannel = (channel) => async (dispatch) => {
	const response = await fetch("/api/channels/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(channel),
	});
	const data = await response.json();
	dispatch(actionAddChannel(data));
	return data;
};

export const thunkEditChannel = (channel) => async (dispatch) => {
	console.log('----------Channel(Thunk): ', channel, '-------------');
	const response = await fetch(`/api/channels/${channel.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(channel),
	});

	const data = await response.json();
	dispatch(actionEditChannel(data));
	return data;
};

export const thunkDeleteChannel = (channelId) => async (dispatch) => {
	const response = await fetch(`/api/channels/${channelId}`, {
		method: "DELETE",
	});
	dispatch(actionDeleteChannel(channelId));
	return response;
};

const channelReducer = (state = {}, action) => {
	const newState = { ...state };
	switch (action.type) {
		case GET_CHANNELS:
			// console.log('-----------Reducer: ', action.channels.channels, '-------------')
			action.channels.channels.forEach((channel) => {
				newState[channel.id] = channel;
			});
			return newState;

		case ADD_CHANNEL:
			newState[action.channel.id] = action.channel;
			return newState;

		case EDIT_CHANNEL:
			newState[action.channel.id] = action.channel;
			// const eventList = newState.map(id => newState[id]);
			// eventList.push(action.payload)
			return newState;

		case DELETE_CHANNEL:
			// console.log('-----------Reducer: ', action.channels.channels, '-------------')
			delete newState[action.channelId];
			return newState;

		default:
			return state;
	}
};

export default channelReducer;
