import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkAddAuthor, thunkGetAuthors } from '../../redux/authors'
import { useNavigate } from 'react-router-dom'
import './Authors.css'

export default function Authors() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authors = useSelector((state) => state.authors.authors)
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [clicked, setClicked] = useState(false)
  const [error, setError] = useState({})
  const authorRef = useRef(null)
  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  )

  useEffect(() => {
    dispatch(thunkGetAuthors())
  }, [dispatch])

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const authorName = authorRef.current.value
    const nameParts = authorName.trim().split(' ')

    if (nameParts.length < 2) {
      setError({ formError: 'Please enter a first and last name' })
      return
    }

    const author = {
      name: authorName,
      series: [],
    }

    const result = await dispatch(thunkAddAuthor(author))

    if (typeof result === 'object' && result.message) { 
      setError({ formError: result.message })
      return
    }

    authorRef.current.value = ''
    setClicked(!clicked)
  }

  function countBooks(authors) {
    let totalBooks = 0
    authors.series.forEach((series) => (totalBooks += series.books.length))
    return totalBooks
  }

  const filteredAuthors = authors?.filter((author) => {
    const lastName = author.name.split(' ').pop()
    return lastName[0].toUpperCase() === selectedLetter
  })

  return (
    <>
      <h2 className="author-title" style={{ borderbottom: 'none' }}>
        Authors
      </h2>
      <p className="sorted">Sorted by last name</p>
      <div className="letter-buttons">
        {letters.map((letter) => (
          <button
            className="letter-button"
            key={letter}
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      {selectedLetter && (
        <>
          <div className="authors-list">
            {filteredAuthors.map((author) => (
              <li
                className="author-card"
                key={author.id}
                onClick={() => navigate(`/authors/${author.id}`)}
              >
                <div className="author-name">{author.name}</div>
                <div className="book-count">({countBooks(author)})</div>
              </li>
            ))}
          </div>
          <div className="add-author">
            {!clicked ? (
              <>
                <p className="no-author">
                  Can&apos;t find the author you&apos;re looking for?
                </p>
                <button
                  className="add-author-button"
                  onClick={() => setClicked(!clicked)}
                >
                  Add Author
                </button>
              </>
            ) : (
              <form className="new-author-form" onSubmit={handleSubmit}>
                <label htmlFor="author-name">Author Name:</label>
                {error?.formError && <p className="error">{error?.formError}</p>}
                <input
                  type="text"
                  id="author-name"
                  name="author-name"
                  ref={authorRef}
                  required
                />
                <div className="new-author-btns">
                  <button type="submit">Submit</button>
                  <button
                    onClick={() => {
                      setClicked(!clicked)
                      setError({})
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </>
      )}
    </>
  )
}
