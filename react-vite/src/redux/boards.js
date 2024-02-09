const GET_BOARDS = 'GET_BOARDS';
const ADD_BOARD = 'ADD_BOARD'
const BOARD_BY_ID = 'BOARD_BY_ID'

export const getBoards = (boards) => {
  return {
    type: GET_BOARDS,
    boards
  }
}

export const addBoard = (board) => {
  return {
    type: ADD_BOARD,
    board
  }
}

export const getBoardById = (books) => {
  return {
    type: BOARD_BY_ID,
    books
  }
}

export const thunkGetBoards = () => async (dispatch) => {
  const response = await fetch('/api/boards/');
  if (response.ok) {
    const data = await response.json();
    dispatch(getBoards(data));
  }
}

export const thunkAddBoard = (data) => async (dispatch) => {
  const response = await fetch('/api/boards/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(addBoard(data))
  } else {
    console.log('ERROR (thunkAddBoard)')
  }
}

const initialState = { boards: [] };

export default function boardsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOARDS:
      // console.log('BOARD REDUCER', action.boards);
      return { ...state, boards: action.boards.boards };
    case ADD_BOARD:
      return { ...state, boards: [...state.boards, action.board] }
    default:
      return state;
  }
}
