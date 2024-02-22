import { useEffect, useState } from 'react'
import './BookReviews.css'
import { useDispatch } from 'react-redux'
import { thunkGetReviews } from '../../redux/reviews'
import StarRating from '../StarRating/StarRating'

export default function BookReviews({ bookId }) {
  const dispatch = useDispatch()
  const [reviews, setReviews] = useState([])
  const [averageRating, setAverageRating] = useState(0)

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await dispatch(thunkGetReviews(bookId))
      setReviews(response.reviews)
    }
    fetchReviews()
  }, [dispatch, bookId])

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const avgRating = getAverageRating(reviews)
      setAverageRating(avgRating)
    }
  }, [reviews])

  function getAverageRating(reviews) {
    if (!Array.isArray(reviews) || reviews.length === 0) return 0
    const ratings = reviews.map((review) => review.stars)
    const averageRating = ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length
    return averageRating
  }

  function openReviews() {
    console.log('Open reviews')
  }

  return (
    <div className='star-container' onClick={openReviews}>
      <StarRating rating={averageRating} />
    </div>
  )
}
