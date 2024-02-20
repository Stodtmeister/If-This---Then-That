const GET_RECS = "GET_RECS"
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

// const initialState = { recommendations: [] }
export default function recReducer(state = {}, action) {
  switch (action.type) {
    case GET_RECS: {
      const newRecs = action.recommendations.recommendations.reduce((acc, rec) => {
        // Store the details of each recommendation by its unique ID
        acc.recommendations[rec.recommendationId] = rec;

        // Map each book to its recommendations
        if (!acc.books[rec.bookId]) {
          acc.books[rec.bookId] = [];
        }
        if (!acc.books[rec.bookId].includes(rec.recommendationId)) {
          acc.books[rec.bookId].push(rec.recommendationId);
        }

        return acc;
      }, { recommendations: { ...state.recommendations }, books: { ...state.books } });

      return { ...state, ...newRecs };
    }
    case GET_RECS_ERROR:
      return { ...state, error: action.error }
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
