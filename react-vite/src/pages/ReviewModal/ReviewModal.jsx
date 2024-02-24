import { useDispatch, useSelector } from 'react-redux'
import './ReviewModal.css'
import OpenModalButton from '../../components/OpenModalButton/OpenModalButton'
import ReviewModalComponent from '../../components/ReviewModalComponent/ReviewModalComponent'
import ReviewContainer from '../../components/ReviewContainer/ReviewContainer'
import { useEffect, useState } from 'react'
import { thunkGetUserById } from '../../redux/users'

export default function ReviewModal({ bookId, averageRating }) {
  const reviews = useSelector((state) => state.reviews[bookId].reviews)
  const user = useSelector((state) => state.session.user)
  let browsing = 'browsing'
  let firstToReview = 'notFirst'
  let reviewedPreviously = 'no-reviews'
  let loggedIn = user?.id ? 'logged-in' : 'logged-out'
  const rev = reviews.length === 1 ? 'review' : 'reviews'

  const [users, setUsers] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUsers = async () => {
      const usersById = {};
      for (const rev of reviews) {
        const user = await dispatch(thunkGetUserById(rev.userId));
        usersById[user.id] = user;
      }
      setUsers(usersById);
    };

    fetchUsers();
  }, [dispatch, reviews]);

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

  // console.log('AVG', averageRating);
  // console.log('REVIEWS', reviews)
  // console.log('BROWSING', browsing)


  return (
    <div className='review-modal-content'>
      <h1 className="review-title">Reviews</h1>
      <div className="spot-review">
        <div className='review-header'>
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
            buttonText='Add a review'
            modalComponent={<ReviewModalComponent bookId={bookId}/>}
          />
        </div>
        <div className={`${firstToReview} ${browsing}`}>
          <p>Be the first to post a review!</p>
        </div>
        {reviews.reverse().map(rev => (
          <ReviewContainer key={rev.id} user={user} rev={rev} bookId={bookId} userName={users[rev.userId]?.username}/>
        ))}
      </div>
    </div>
  )
}
