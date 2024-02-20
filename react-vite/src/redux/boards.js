const GET_BOARDS = 'GET_BOARDS'
const ADD_BOARD = 'ADD_BOARD'
const BOARD_BY_ID = 'BOARD_BY_ID'
const EDIT_BOARD = 'EDIT_BOARD'
const DELETE_BOARD = 'DELETE_BOARD'
const DELETE_BOOK = 'DELETE_BOOK'

export const getBoards = (boards) => {
  return {
    type: GET_BOARDS,
    boards,
  }
}

export const addBoard = (board) => {
  return {
    type: ADD_BOARD,
    board,
  }
}

export const editBoard = (board) => {
  return {
    type: EDIT_BOARD,
    board,
  }
}

export const deleteBoard = (boardId) => {
  return {
    type: DELETE_BOARD,
    boardId,
  }
}

export const getBoardById = (books, boardId) => {
  return {
    type: BOARD_BY_ID,
    books,
    boardId,
  }
}

export const deleteBook = (bookId, boardId) => {
  return {
    type: DELETE_BOOK,
    bookId,
  }
}

export const thunkDeleteBook = (boardId, bookId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/boards/${boardId}/books/${bookId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    dispatch({ type: 'DELETE_BOOK', boardId, bookId })
  } catch (error) {
    console.error('Failed to delete book:', error)
  }
}

export const thunkGetBoards = () => async (dispatch) => {
  const response = await fetch('/api/boards/')
  if (response.ok) {
    const data = await response.json()
    dispatch(getBoards(data))
  }
}

export const thunkGetBoardById = (boardId) => async (dispatch) => {
  const response = await fetch(`/api/boards/${boardId}/books`)

  if (response.ok) {
    const data = await response.json()
    dispatch(getBoardById(data, boardId))
  } else {
    console.log('ERROR (thunkGetBoardById)')
  }
}

export const thunkAddBoard = (data) => async (dispatch) => {
  const response = await fetch('/api/boards/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(addBoard(data))
  } else {
    console.log('ERROR (thunkAddBoard)')
  }
}

export const thunkEditBoard = (id, data) => async (dispatch) => {
  const response = await fetch(`/api/boards/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(editBoard(data))
  } else {
    console.log('ERROR (thunkEditBoard)')
  }
}

export const thunkDeleteBoard = (id) => async (dispatch) => {
  const response = await fetch(`/api/boards/${id}`, {
    method: 'DELETE',
  })

  if (response.ok) {
    dispatch(deleteBoard(id))
  } else {
    console.log('ERROR (thunkDeleteBoard)')
  }
}

const initialState = { boards: [], boardBooks: {} }

export default function boardsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOARDS:
      return { ...state, boards: action.boards.boards }
    case BOARD_BY_ID: {
      const newState = {
        ...state,
        boardBooks: {
          ...state.boardBooks,
          [action.boardId]: action.books,
        },
        boards: state.boards.map((board) => {
          if (board.id === action.boardId) {
            // console.log('Updating board:', board)
            const updatedBoard = { ...board, ...action.books }
            // console.log('Updated board:', updatedBoard)
            return updatedBoard
          }
          return board
        }),
      }
      return newState
    }
    case ADD_BOARD:
      return { ...state, boards: [...state.boards, action.board] }
    case EDIT_BOARD:
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id === action.board.id) {
            return action.board
          }
          return board
        }),
      }
    case DELETE_BOARD:
      return {
        ...state,
        boards: state.boards.filter((board) => board.id !== action.boardId),
      }
    case DELETE_BOOK:
      if (state.boardBooks[action.boardId]) {
        return {
          ...state,
          boardBooks: {
            ...state.boardBooks,
            [action.boardId]: {
              ...state.boardBooks[action.boardId],
              books: state.boardBooks[action.boardId].books.filter(
                (book) => book.id !== action.bookId
              ),
            },
          },
        }
      } else {
        return state
      }
    default:
      return state
  }
}
