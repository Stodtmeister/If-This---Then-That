// import OpenModalButton from '../OpenModalButton/OpenModalButton'
import { useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import './ReviewModalComponent.css'
import { thunkAddReview, thunkEditReview } from '../../redux/reviews'

export default function ReviewModalComponent({ bookId, updating, reviewId, theReview }) {
  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState(theReview || '')
  const [errors, setErrors] = useState({})
  let disabled = true

  if (review && !Object.keys(errors).length) disabled = false;

  useEffect(() => {
    const validation = {}
    if (review && review.length < 10) {
      validation.review = 'Review must be at least 10 characters'
    }
    if (rating === 0) {
      validation.rating = 'Must select at least one star'
    }
    setErrors(validation)
  }, [review, rating])

  // useEffect(() => {
  //   setReview(theReview);
  // }, [theReview]);

  function handleStarClick(clickedRating) {
    setRating(clickedRating);
  }

  function handleStarHover(hoveredRating) {
    setHoveredRating(hoveredRating);
  }

  function handleMouseLeave() {
    setHoveredRating(0);
  }

  async function handleSubmit() {
    if (updating) {
      const updated = dispatch(thunkEditReview(bookId, { id: reviewId, review, stars: rating }))
      console.log("updated", updated);
      // await dispatch(editReviewThunk(reviewId, { review, stars: rating } ))
    } else {
      // console.log('review', { review, stars: rating});
      await dispatch(thunkAddReview(bookId, { review, stars: rating }))
    }

    closeModal()
  }

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= (hoveredRating || rating) ? 'filled' : ''}`}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
        >
          &#9733;
        </span>
      )
    }

    return stars;
  };

  return (
    <>
      <form id="review-form" className='review-modal-content' onSubmit={handleSubmit}>
        {updating && <h4>Update your review</h4>}
        {!updating && <h4>Add a review</h4>}
        {errors.error && <div className="msg">{errors}</div>}
        <textarea
          id="review-text"
          cols="30"
          rows="8"
          placeholder="Leave your review here..."
          value={review}
          onChange={e => setReview(e.target.value)}
        />
        <div className="rating-container">
          <div className="star-ratings" onMouseLeave={handleMouseLeave}>
            {renderStars()}
          </div>
          <p>Stars</p>
        </div>
        <button disabled={disabled} type="submit">Submit Your Review</button>
      </form>
    </>
  );
}
