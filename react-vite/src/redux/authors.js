const GET_AUTHORS = 'GET_AUTHORS'
const AUTHOR_BY_ID = 'AUTHOR_BY_ID'

export const getAuthors = (authors) => {
  return {
    type: GET_AUTHORS,
    authors
  }
}

export const getAuthorById = (data) => {
  return {
    type: AUTHOR_BY_ID,
    data
  }
}

export const thunkGetAuthors = () => async (dispatch) => {
  const response = await fetch('/api/authors/')
  if (response.ok) {
    const data =  await response.json()
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

const initialState = {}

export default function authorsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AUTHORS:
      return { ...state, authors: action.authors.authors }
    case AUTHOR_BY_ID:
      return state
    default:
      return state
  }
}
