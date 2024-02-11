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

export const getBoardById = (books, boardId) => {
  return {
    type: BOARD_BY_ID,
    books,
    boardId
  }
}

export const thunkGetBoards = () => async (dispatch) => {
  const response = await fetch('/api/boards/');
  if (response.ok) {
    const data = await response.json();
    dispatch(getBoards(data));
  }
}

export const thunkGetBoardById = (boardId) => async (dispatch) => {
  const response = await fetch(`/api/boards/${boardId}/books`)

  if (response.ok) {
    const data = await response.json()
    console.log('BOARD BY ID', data);
    dispatch(getBoardById(data, boardId))
  } else {
    console.log('ERROR (thunkGetBoardById)')
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

const initialState = { boards: [], boardBooks: {} };

export default function boardsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOARDS:
      // console.log('BOARD REDUCER', action.boards);
      return { ...state, boards: action.boards.boards };
    // case BOARD_BY_ID: {
    //   const newState = {
    //     ...state,
    //     boards: state.boards.map(board => {
    //       if (board.id === action.boardId) {
    //         console.log('Updating board:', board);
    //         const updatedBoard = { ...board, ...action.books};
    //         console.log('Updated board:', updatedBoard);
    //         return updatedBoard;
    //       }
    //       return board;
    //     })
    //   };
    //   console.log('New State:', newState);
    //   return newState;
    // }
    case BOARD_BY_ID: {
      const newState = {
        ...state,
        boardBooks: {
          ...state.boardBooks,
          [action.boardId]: action.books
        },
        boards: state.boards.map(board => {
          if (board.id === action.boardId) {
            console.log('Updating board:', board);
            const updatedBoard = { ...board, ...action.books};
            console.log('Updated board:', updatedBoard);
            return updatedBoard;
          }
          return board;
        })
      };
      console.log('New State:', newState);
      return newState;
    }
    case ADD_BOARD:
      return { ...state, boards: [...state.boards, action.board] }
    default:
      return state;
  }
}
