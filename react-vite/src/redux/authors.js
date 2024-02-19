const GET_AUTHORS = 'GET_AUTHORS'
const AUTHOR_BY_ID = 'AUTHOR_BY_ID'
const ADD_AUTHOR = 'ADD_AUTHOR'
const ADD_BOOK_TO_AUTHOR = 'ADD_BOOK_TO_AUTHOR'

export const getAuthors = (authors) => {
  return {
    type: GET_AUTHORS,
    authors,
  }
}

export const getAuthorById = (data) => {
  return {
    type: AUTHOR_BY_ID,
    data,
  }
}

export const addAuthor = (author) => {
  return {
    type: ADD_AUTHOR,
    author,
  }
}

export const addBookToAuthor = (book) => {
  return {
    type: ADD_BOOK_TO_AUTHOR,
    book,
  }
}

export const thunkGetAuthors = () => async (dispatch) => {
  const response = await fetch('/api/authors/')
  if (response.ok) {
    const data = await response.json()
    dispatch(getAuthors(data))
  }
}

export const thunkAuthorById = (authorId) => async (dispatch) => {
  const response = await fetch(`/api/authors/${authorId}`)
  if (response.ok) {
    const data = await response.data()
    dispatch(getAuthorById(data))
  }
}

export const thunkAddAuthor = (author) => async (dispatch) => {
  try {
    const response = await fetch('/api/authors/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(author),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.errors)
    }
    const data = await response.json()
    dispatch(addAuthor(data))
  } catch (error) {
    console.error('Error adding author:', error)
    return error
  }
}

export const thunkAddBookToAuthor = (book) => async (dispatch) => {
  try {
    const response = await fetch(`/api/authors/${book.author_id}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.errors)
    }
    const data = await response.json()
    console.log('DATA', data);
    dispatch(addBookToAuthor(data))
  } catch (error) {
    console.error('Error adding book to author:', error)
    return error
  }
}

const initialState = {}

export default function authorsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AUTHORS:
      return { ...state, authors: action.authors.authors }
    case AUTHOR_BY_ID:
      return state
    case ADD_AUTHOR:
      return { ...state, authors: [...state.authors, action.author] }
    case ADD_BOOK_TO_AUTHOR:
      return {
        ...state,
        authors: state.authors.map(author =>
          author.id === action.book.author_id
            ? { ...author, books: [...author.books, action.book] }
            : author
        )
      }
    default:
      return state
  }
}
