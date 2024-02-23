const GET_RECS = "GET_RECS"
const ADD_REC = "ADD_REC"
const GET_RECS_ERROR = "GET_RECS_ERROR"
export const UPVOTE_RECOMMENDATION = 'UPVOTE_RECOMMENDATION';
export const DOWNVOTE_RECOMMENDATION = 'DOWNVOTE_RECOMMENDATION';

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

export const thunkAddRec = (data) => async (dispatch) => {
  console.log('THUNK DATA:', data);
  try {
    const response = await fetch(`/api/books/${data.book_id}/recommendations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(getRecs(data));
    }
  }
  catch (error) {
    console.error('Exception caught in thunkAddRec:', error.toString());
  }
}



export const upvoteRecommendation = (recId) => ({
  type: UPVOTE_RECOMMENDATION,
  payload: recId,
});

export const downvoteRecommendation = (recId) => ({
  type: DOWNVOTE_RECOMMENDATION,
  payload: recId,
});

export const thunkUpvoteRecommendation = (bookId, recId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/books/${bookId}/recommendations/${recId}`, {
      method: 'PUT',
    });
    if (response.ok) {
      dispatch(upvoteRecommendation(recId));
    } else {
      console.error('Failed to upvote recommendation:', response.statusText);
    }
  } catch (error) {
    console.error('Exception caught in thunkUpvoteRecommendation:', error.toString());
  }
}

// export const thunkDownvoteRecommendation = (recId) => async (dispatch) => {
//   try {
//     const response = await fetch(`/api/recommendations/${recId}/downvote`, {
//       method: 'PUT',
//     });
//     if (response.ok) {
//       dispatch(downvoteRecommendation(recId));
//     } else {
//       console.error('Failed to downvote recommendation:', response.statusText);
//     }
//   } catch (error) {
//     console.error('Exception caught in thunkDownvoteRecommendation:', error.toString());
//   }
// }

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
        // console.log('FROM REC REDUCER:', action.recommendations.recommendations);
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
      const newRec = { ...state.recommendations};
      if (newRec[action.payload.bookId]) {
        newRec[action.payload.bookId].push(action.payload);
      } else {
        newRec[action.payload.bookId] = [action.payload];
      }
      return { ...state, recommendations: newRec }
    }
    case UPVOTE_RECOMMENDATION: {
      const rec = state.recommendations[action.payload];
      return {
        ...state,
        recommendations: {
          ...state.recommendations,
          [action.payload]: {
            ...rec,
            votes: rec.votes + 1,
          },
        },
      };
    }
    default:
      return state
  }
}
