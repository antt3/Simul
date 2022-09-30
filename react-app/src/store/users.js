const GET_USERS = "users/GET_USERS";

const actionGetUsers = (users) => {
	return {
		type: GET_USERS,
		users
	};
};

export const thunkGetUsers = () => async (dispatch) => {
	// console.log('Being Called.')
	const res = await fetch("/api/users/");
	// console.log('-------res: ', res, '-------')
	const channels = await res.json();
	if (res.ok) dispatch(actionGetUsers(channels));
	return res;
};

const usersReducer = (state = {}, action) => {
	const newState = { ...state };
	switch (action.type) {
		case GET_USERS:
			// console.log('-----------Reducer: ', action.channels.channels, '-------------')
			action.users.users.forEach((user) => {
				newState[user.id] = user;
			});
    
			return newState;
    default:
        return state
    }
};

export default usersReducer;