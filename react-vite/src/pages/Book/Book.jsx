import { useLocation, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./Book.css"
import { thunkGetRecs } from "../../redux/recommendations"

export default function Book() {
  const { bookId } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const coverImage = location.state.coverImage
  const recommendations = useSelector((state) => state.recommendations)

  console.log('RECOMMENDATIONS', recommendations);

  useEffect(() => {
    dispatch(thunkGetRecs(bookId))
  }, [dispatch])

  return (
    <>
      <h1>Book {bookId}</h1>
      <img src={coverImage} alt={`Cover of book ${bookId}`} />
    </>
  )
}
