const GET_ALL_BOOKS = 'GET_ALL_BOOKS';

const getAllBooks = (books) => {
  return {
    type: GET_ALL_BOOKS,
    books
  }
}

export const getBooksError = (error) => {
  return {
    type: 'GET_BOOKS_ERROR',
    error
  }
}

export const thunkGetAllBooks = () => async (dispatch) => {
  try {
    const response = await fetch('/api/books')
    if (response.ok) {
      const data = await response.json()
      dispatch(getAllBooks(data))
    } else {
      dispatch(getBooksError(`Failed to fetch books: ${response.statusText}`))
    }
  } catch (error) {
    dispatch(getBooksError(`Exception caught in thunkGetAllBooks: ${error.toString()}`))
  }
}

const initialState = {}

export default function booksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_BOOKS: {
      const normalizedBooks = action.books.books.reduce((acc, book) => {
        acc[book.id] = book;
        return acc;
      }, {});

      return { ...state, books: normalizedBooks };
    }
    default:
      return state
  }
}
