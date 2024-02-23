import { useSelector } from 'react-redux'
import './ReviewModal.css'
import OpenModalButton from '../../components/OpenModalButton/OpenModalButton'
import ReviewModalComponent from '../../components/ReviewModalComponent/ReviewModalComponent'
import ReviewContainer from '../../components/ReviewContainer/ReviewContainer'

export default function ReviewModal({ bookId, averageRating }) {
  const reviews = useSelector((state) => state.reviews[bookId].reviews)
  const user = useSelector((state) => state.session.user)
  let browsing = 'browsing'
  let firstToReview = 'notFirst'
  let reviewedPreviously = 'no-reviews'
  let loggedIn = user?.id ? 'logged-in' : 'logged-out'
  const rev = reviews.length === 1 ? 'review' : 'reviews'

  console.log('USER', user)

  reviews.forEach((review) => {
    if (user?.id === review.userId) {
      browsing = 'owner'
    } else {
      if (!reviews.length) {
        firstToReview = 'first'
      }
      reviews.forEach((rev) => {
        if (rev.userId === user?.id) reviewedPreviously = 'already-reviewed'
      })
    }
  })

  console.log('AVG', averageRating);
  console.log('REVIEWS', reviews)
  console.log('BROWSING', browsing)

  return (
    <>
      <h1 className="review-title">Reviews</h1>
      <div className="spot-review">
        <div>
          <span className="star-icon">&#9733;</span>
          <span className={reviews.length > 0 ? 'hide' : 'show'}>New</span>
          <span className={reviews.length > 0 ? 'show' : 'hide'}>
            <span className='bold'>{averageRating.toPrecision(2)} </span>
            <span className="review-dot">&#183;</span>
            <span className="bold">
              {reviews.length} {rev}
            </span>
          </span>
        </div>
        <div className={`${reviewedPreviously} ${browsing} ${loggedIn}`}>
        <OpenModalButton
          buttonText='Post Your Review'
          modalComponent={<ReviewModalComponent bookId={bookId} />}
        />
      </div>
        <div className={`${firstToReview} ${browsing}`}>
          <p>Be the first to post a review!</p>
        </div>
        {reviews.reverse().map(rev => (
        <ReviewContainer key={rev.id} user={user} rev={rev} />
      ))}
      </div>
      {/* {reviews.map((review) => {
        return (
          <div key={review.id}>
            <h3>{review.review}</h3>
            <p>{review.stars}</p>
          </div>
        )
      })} */}
    </>
  )
}
