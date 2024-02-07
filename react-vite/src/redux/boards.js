const GET_BOARDS = 'GET_BOARDS';

export const getBoards = (boards) => {
  return {
    type: GET_BOARDS,
    boards
  }
}

export const thunkGetBoards = () => async (dispatch) => {
  const response = await fetch('/api/boards/');
  if (response.ok) {
    const data = await response.json();
    dispatch(getBoards(data));
  }
}

const initialState = { boards: [] };

export default function boardsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOARDS:
      console.log('BOARD REDUCER', action.boards);
      return { ...state, boards: action.boards.boards };
    default:
      return state;
  }
}
