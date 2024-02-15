const GET_RECS = "GET_RECS"
const GET_RECS_ERROR = "GET_RECS_ERROR"

const getRecsError = (error) => {
  return {
    type: GET_RECS_ERROR,
    error
  }
}

const getRecs = (recommendations) => {
  return {
    type: GET_RECS,
    recommendations
  }
}

export const thunkGetRecs = (bookId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/books/${bookId}/recommendations`)
    if (response.ok) {
      const data = await response.json()
      dispatch(getRecs(data))
    } else {
      dispatch(getRecsError(`Failed to fetch recommendations: ${response.statusText}`))
    }
  } catch (error) {
    dispatch(getRecsError(`Exception caught in thunkGetRecs: ${error.toString()}`))
  }
}

// const initialState = { recommendations: [] }
export default function recReducer(state = {}, action) {
  switch (action.type) {
    case GET_RECS:
      return { ...state, recommendations: action.recommendations.recommendations }
    case GET_RECS_ERROR:
      return { ...state, error: action.error }
    default:
      return state
  }
}
