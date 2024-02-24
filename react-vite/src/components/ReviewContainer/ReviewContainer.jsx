import { useSelector } from "react-redux"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import ReviewModalComponent from "../ReviewModalComponent/ReviewModalComponent"
import './ReviewContainer.css'
import DeleteModal from "../DeleteModal/DeleteModal"

export default function ReviewContainer({ user, rev, bookId, userName }) {
  const users = useSelector((state) => state.session)
  // const reviews = useSelector((state) => state.reviews[bookId])
  function formatDate(date) {
    const originalDate = new Date(date)
    const options = { year: 'numeric', month: 'short' }
    return originalDate.toLocaleDateString('en-US', options)
  }


  function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  return (
    <div className="review-container">
      <div className="review-info">
        <div className="user-review">
          <div className="profile">
            <i
              style={{ color: randomColor() }}
              className="fas fa-user-circle fa-2xl"
            />
          </div>
          <div className="name-and-date">
            <p className="first-name">{userName}</p>
            <p>{formatDate(rev.createdAt)}</p>
          </div>
        </div>
        <p>{rev.review}</p>
        <div></div>
      </div>
      {user?.id === rev.userId && (
        <>
        {/* {console.log('REV REVIEW', rev.review)} */}
          <OpenModalButton
            id='update-review'
            buttonText='Update'
            modalComponent={<ReviewModalComponent bookId={bookId} updating={true} reviewId={rev.id} theReview={rev.review} />}
            // modalComponent={<ReviewModal spotId={spotId} updating={true} name1={name} name2={rev.Spot?.name} reviewId={rev.id} />}
          />
          <OpenModalButton
            id="delete-review"
            buttonText="Delete"
            modalComponent={<DeleteModal bookId={bookId} reviewId={rev.id} />}
          />
        </>
      )}
    </div>
  )
}
