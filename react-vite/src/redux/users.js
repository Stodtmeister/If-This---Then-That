const GET_USER_BY_ID = 'GET_USER_BY_ID';

export const getUserById = (user) => {
  return {
    type: GET_USER_BY_ID,
    user
  };
}

export const thunkGetUserById = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    throw response;
  }
  const user = await response.json();
  dispatch(getUserById(user));
  return user;
}

export default function usersReducer(state = {}, action) {
  switch (action.type) {
    case GET_USER_BY_ID:
      return {
        ...state,
        [action.user.id]: action.user
      };
    default:
      return state;
  }
}
