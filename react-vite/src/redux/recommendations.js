const GET_RECS = "GET_RECS"
const ADD_REC = "ADD_REC"
const GET_RECS_ERROR = "GET_RECS_ERROR"
const UPVOTE_RECOMMENDATION = 'UPVOTE_RECOMMENDATION';


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

const addRec = (recommendation) => {
  return {
    type: ADD_REC,
    recommendation
  }
}

const upvoteRecommendation = (recId) => {
  return {
    type: UPVOTE_RECOMMENDATION,
    recId,
  }
}

export const thunkAddRec = (data) => async (dispatch) => {
  try {
    const response = await fetch(`/api/books/${data.book_id}/recommendations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(addRec(data));
    }
  }
  catch (error) {
    console.error('Exception caught in thunkAddRec:', error.toString());
  }
}

export const thunkUpvoteRecommendation = (bookId, recId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/books/${bookId}/recommendations/${recId}`, {
      method: 'PUT',
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(upvoteRecommendation(recId, data.new_vote_count));
    } else {
      console.error('Failed to upvote recommendation:', response.statusText);
    }
  } catch (error) {
    console.error('Exception caught in thunkUpvoteRecommendation:', error.toString());
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

export default function recReducer(state = {}, action) {
  switch (action.type) {
    case GET_RECS: {
      const newRec = { ...state.recommendations};
      if (action.recommendations && Array.isArray(action.recommendations.recommendations)) {
        action.recommendations.recommendations.forEach(rec => {
          if (newRec[rec.bookId] && !newRec[rec.bookId].some(existingRec => existingRec.recommendationId === rec.recommendationId)) {
            newRec[rec.bookId].push(rec);
          } else {
            newRec[rec.bookId] = [rec];
          }
        })
      }

      return { ...state, recommendations: newRec }
    }
    case GET_RECS_ERROR:
      return { ...state, error: action.error }
    case ADD_REC: {
      const newRec = state.recommendations ? { ...state.recommendations } : {};
      if (newRec[action.recommendation.bookId]) {
        newRec[action.recommendation.bookId] = [...newRec[action.recommendation.bookId], action.recommendation];
      } else {
        newRec[action.recommendation.bookId] = [action.recommendation];
      }
      return { ...state, recommendations: newRec }
    }
    case UPVOTE_RECOMMENDATION: {
      const newRec = { ...state.recommendations };
      const bookId = Object.keys(newRec).find(bookId => newRec[bookId].some(rec => rec.recommendationId === action.recId));
      const recIndex = newRec[bookId].findIndex(rec => rec.recommendationId === action.recId);
      newRec[bookId] = [
        ...newRec[bookId].slice(0, recIndex),
        {
          ...newRec[bookId][recIndex],
          votes: newRec[bookId][recIndex].votes + 1,
          hasUpvoted: true,
        },
        ...newRec[bookId].slice(recIndex + 1)
      ];
      return { ...state, recommendations: newRec }
    }
    // case UPVOTE_RECOMMENDATION: {
    //   const newRec = { ...state.recommendations };
    //   const bookId = Object.keys(newRec).find(bookId => newRec[bookId].some(rec => rec.recommendationId === action.recId));
    //   const recIndex = newRec[bookId].findIndex(rec => rec.recommendationId === action.recId);
    //   newRec[bookId] = [
    //     ...newRec[bookId].slice(0, recIndex),
    //     {
    //       ...newRec[bookId][recIndex],
    //       votes: newRec[bookId][recIndex].votes + 1
    //     },
    //     ...newRec[bookId].slice(recIndex + 1)
    //   ];
    //   return { ...state, recommendations: newRec }
    // }
    default:
      return state
  }
}
