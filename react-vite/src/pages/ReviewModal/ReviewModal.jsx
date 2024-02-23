import { useSelector } from 'react-redux'

export default function ReviewModal({ bookId }) {
  const reviews = useSelector(state => state.reviews[bookId].reviews)

  reviews.forEach(review => {
    console.log('test', review);
  })


  return (
    <>
      <h1>Reviews</h1>
      {reviews.map(review => {
        return (
          <div key={review.id}>
            <h3>{review.review}</h3>
            <p>{review.stars}</p>
          </div>
        )
        })
      }
    </>
  )
}
