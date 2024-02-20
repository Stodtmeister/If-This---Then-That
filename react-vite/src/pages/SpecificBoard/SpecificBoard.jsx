import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkDeleteBook, thunkGetBoardById } from '../../redux/boards'
import './SpecificBoard.css'
import Book from '../Book/Book'

export default function SpecificBoard() {
  const { boardId } = useParams()
  const location = useLocation()
  const boardName = location.state?.boardName
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const books = useSelector((state) => state.boards.boardBooks[boardId])
  // const books = useSelector(
  //   (state) => state.boards.boardBooks[boardId] || { books: [] }
  // )
  const [bookCovers, setBookCovers] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    dispatch(thunkGetBoardById(boardId))
  }, [boardId, dispatch])

  async function fetchBookCover(book) {
    if (book.cover) {
      setBookCovers((prev) => ({ ...prev, [book.id]: book.cover }))
      console.log('ALREADY HAS A COVER')
      return Promise.resolve() // Resolve immediately for books that already have a cover
    } else {
      console.log('FETCHING BOOK COVER')
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
          book.title
        )}`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data.items) {
        const coverImageLink = data.items[0].volumeInfo.imageLinks.thumbnail
        setBookCovers((prev) => ({ ...prev, [book.id]: coverImageLink }))
        await fetch(`/api/books/${book.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ coverImageLink }),
        })
      }
    }
  }

  useEffect(() => {
    setIsLoading(true)
    if (books?.books) {
      Promise.all(books.books.map(fetchBookCover)).then(() => {
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [books])

  function deleteBook(boardId, bookId) {
    dispatch(thunkDeleteBook(boardId, bookId))
  }

  return (
    <div className="page">
      {isLoading ? (
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
          <h2>Loading...</h2>
        </div>
      ) : (
        <>
          <h2 className="board-title">{boardName}</h2>
          <div className="book-container">
            {books?.books?.length > 0 ? (
              books.books.map((book, index) => (
                <div key={book.id} className="book-info">
                  <img
                    className="cover-img"
                    src={bookCovers[book.id] || book.cover}
                    alt="book cover"
                    title={book.title}
                    onClick={() =>
                      navigate(`/books/${book.id}`, {
                        state: { coverImage: bookCovers[book.id] || book.cover, bookTitle: book.title},
                      })
                    }
                  />
                  <button
                    className="delete-book"
                    onClick={() => deleteBook(boardId, book.id)}
                  >
                    delete
                  </button>
                </div>
              ))
            ) : (
              <p>No books found.</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
