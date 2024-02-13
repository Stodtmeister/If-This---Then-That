import { useLocation, useParams } from "react-router-dom"
import "./Book.css"

export default function Book() {
  const { bookId } = useParams()
  const location = useLocation()
  const coverImage = location.state.coverImage

  return (
    <>
      <h1>Book {bookId}</h1>
      <img src={coverImage} alt={`Cover of book ${bookId}`} />
    </>
  )
}
