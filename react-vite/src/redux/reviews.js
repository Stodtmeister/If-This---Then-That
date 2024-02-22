const GET_REVIEWS = 'GET_REVIEWS';

export const getReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews
  }
}

export const thunkGetReviews = (bookId) => async (dispatch) => {
    const response = await fetch(`/api/books/${bookId}/reviews`);

    if (!response.ok) {
      throw response;
    }

    const reviews = await response.json();
    dispatch(getReviews(reviews));
    return reviews
}

export default function reviewsReducer(state = {}, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return { ...state, reviews: action.reviews.reviews };
    default:
      return state;
  }
}
