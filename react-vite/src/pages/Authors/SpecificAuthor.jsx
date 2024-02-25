import React, { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { thunkAddBookToAuthor, thunkGetAuthors } from '../../redux/authors'
import './SpecificAuthor.css'

export default function SpecificAuthor() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { authorId } = useParams()
  const authors = useSelector((state) => state.authors.authors)
  const [author, setAuthor] = useState(null)
  const [bookCovers, setBookCovers] = useState({})
  const [clicked, setClicked] = useState(false)
  const bookRef = useRef(null)
  const [error, setError] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [selectedSeries, setSelectedSeries] = useState(null)
  const [genre, setGenre] = useState('')
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (!authors || refresh) {
      dispatch(thunkGetAuthors())
      setRefresh(false)
    }
  }, [dispatch, authors, refresh])

  const fetchBookCover = useCallback(async (book, authorName, fromHandleSubmit = false) => {
    const allBooks = author?.series?.flatMap((series) => series.books)
    if (fromHandleSubmit && allBooks.some(existingBook => existingBook.title === book.title)) {
      setError({ message: 'Author already has this book' })
      throw new Error('Author already has this book')
    }
    if (book.cover) {
      console.log('Has cover');
      setBookCovers((prev) => ({ ...prev, [book.id]: book.cover }))
      return Promise.resolve()
    } else {
      console.log('Fetch cover');
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
          book.title
        )}+inauthor:${encodeURIComponent(authorName)}`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (!data.items || !data.items.length) {
        setError({ message: 'No book found with that title' })
        throw new Error('No book found with that title')
      }
      if (data.items) {
        const coverImageLink = data.items[0].volumeInfo.imageLinks.thumbnail
        setBookCovers((prev) => ({ ...prev, [book.id]: coverImageLink }))

        if (!fromHandleSubmit) {
          await fetch(`/api/books/${book.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coverImageLink }),
          })
        }

        return { cover: coverImageLink }
      }

      return { cover: null }
    }
  }, [author, setBookCovers])

  useEffect(() => {
    if (authors) {
      const foundAuthor = authors.find((author) => String(author.id) === authorId)
      setAuthor(foundAuthor)

      //! Commented out because I think I don't need to fetch the book covers here
      // if (foundAuthor?.series) {
      //   foundAuthor.series.forEach((series) => {
      //     series.books.forEach((book) => fetchBookCover(book, foundAuthor.name))
      //   })
      // }
    }
  }, [authors, authorId])

  async function handleSubmit(e) {
    e.preventDefault()
    const bookTitle = bookRef.current.value
    const bookInfo = await fetchBookCover({title: bookTitle}, author.name, true)

    const newBook = {
      cover: bookInfo.cover,
      title: bookTitle,
      genre: genre,
      author_id: author.id,
      series_id: selectedSeries || 99,
    }

    dispatch(thunkAddBookToAuthor(newBook))
    setRefresh(true)
    bookRef.current.value = ''
    setClicked(!clicked)
  }

  return (
    <>
      <h2 className="author-title">{author?.name}</h2>
      <div className="author-books-container">
        {author?.series?.map((series) => (
          <div key={series.id} className="series">
            {series.name}
            <div className="books">
              {series?.books?.map((book) => (
                <img
                  key={book.id}
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
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="add-author">
        {!clicked ? (
          <>
            <p className="no-author">Can&apos;t find the book you&apos;re looking for?</p>
            <button className="add-author-button" onClick={() => setClicked(!clicked)}>Add Book</button>
          </>
        ) : (
          <form className="new-author-form" onSubmit={handleSubmit}>
            {error.message && <p className="error">{error.message}</p>}
            <div className="input-group">
              <input
                type="text"
                id="author-name"
                name="author-name"
                placeholder='Enter the book title...'
                ref={bookRef}
                required
              />
              <select id="genre" name="genre" value={genre} onChange={e => setGenre(e.target.value)} required>
                <option value="">Genre</option>
                <option value="fantasy">Fantasy</option>
                <option value="sci-fi">Sci-Fi</option>
                <option value="mystery">Mystery</option>
                <option value="thriller">Thriller</option>
                <option value="romance">Romance</option>
                <option value="horror">Horror</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="dropdown">
              <div
                className="pick-series"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
              >
                Click to select the series (optional)
              </div>
              <div className="series-container">
                {isOpen && author?.series?.map((series, index) => (
                  <React.Fragment key={index}>
                    <div
                      className="series-title"
                      onClick={() => setSelectedSeries(selectedSeries === series.id ? null : series.id)}
                    >
                      <p>{series.name}</p>
                      {selectedSeries === series.id && (<i className="fa-solid fa-check"></i>)}
                    </div>
                    {index !== author.series.length - 1 && (<span className="dot">{'\u00B7'}</span>)}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="new-author-btns">
              <button type="submit">Submit</button>
              <button onClick={() => {setClicked(!clicked), setIsOpen(false), setError({}), setGenre(''), setSelectedSeries(null)} }>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  )
}
