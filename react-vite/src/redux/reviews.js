const GET_REVIEWS = 'GET_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'
const DELETE_REVIEW = 'DELETE_REVIEW'

export const getReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews,
  }
}

export const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    review,
  }
}

export const deleteReview = (bookId, reviewId) => {
  return {
    type: DELETE_REVIEW,
    bookId,
    reviewId,
  }
}

export const thunkGetReviews = (bookId) => async (dispatch) => {
  const response = await fetch(`/api/books/${bookId}/reviews`)

  if (!response.ok) {
    throw response
  }

  const reviews = await response.json()
  dispatch(getReviews({ bookId, reviews }))
  return reviews
}

export const thunkAddReview = (bookId, review) => async (dispatch) => {
  const response = await fetch(`/api/books/${bookId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  })

  if (!response.ok) {
    throw response
  }

  const newReview = await response.json()
  dispatch(addReview(newReview))
  return newReview
}

export const thunkDeleteReview = (bookId, reviewId) => async (dispatch) => {
  const response = await fetch(`/api/books/${bookId}/reviews/${reviewId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw response
  }

  dispatch(deleteReview(bookId, reviewId))
}

export default function reviewsReducer(state = {}, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        [action.reviews.bookId]: action.reviews.reviews,
      }
    case ADD_REVIEW:
      return {
        ...state,
        [action.review.bookId]: [...state[action.review.bookId], action.review],
      }
    // case DELETE_REVIEW:
    //   return {
    //     ...state,
    //     [action.reviewId.bookId]: state[action.reviewId.bookId].filter((review) => review.id !== action.reviewId)
    //   };
    case DELETE_REVIEW:
      return {
        ...state,
        [action.bookId]: {
          ...state[action.bookId],
          reviews: state[action.bookId].reviews.filter(
            (review) => review.id !== action.reviewId
          ),
        },
      }
    default:
      return state
  }
}
