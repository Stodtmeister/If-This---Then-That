import { useDispatch, useSelector } from 'react-redux'
import Autosuggest from 'react-autosuggest'
import './AddRecommendation.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import { thunkAddAuthor, thunkAddBookToAuthor, thunkGetAuthors } from '../../redux/authors'
import { thunkAddRec } from '../../redux/recommendations'

export default function AddRecommendation() {
  const dispatch = useDispatch()
  const authors = useSelector((state) => state.authors.authors)
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [clicked, setClicked] = useState(false)
  const [addAuthor, setAddAuthor] = useState(false)
  const [addBook, setAddBook] = useState(false)
  const [error, setError] = useState({})
  const authorRef = useRef(null)
  const bookRef = useRef(null)
  const seriesRef = useRef(null)
  const [newAuthorId, setNewAuthorId] = useState(null)
  const [newBookId, setNewBookId] = useState(null)
  const [genre, setGenre] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [bookCovers, setBookCovers] = useState({})
  const [author, setAuthor] = useState(null)


  useEffect(() => {
    dispatch(thunkGetAuthors())
  }, [dispatch])

  const handleSearchChange = (event, { newValue }) => {
    setSearchTerm(newValue)
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value))
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : authors.filter(
          (author) =>
            author.name.toLowerCase().slice(0, inputLength) === inputValue
        )
  }

  const getSuggestionValue = (suggestion) => {
    setSelectedAuthor(suggestion)
    return suggestion.name
  }

  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>

  const inputProps = {
    placeholder: 'Search for an author',
    value: searchTerm,
    onChange: handleSearchChange,
  }

  const theme = {
    container: 'autosuggest',
    input: 'autosuggestInput',
    suggestionsList: 'autosuggestSuggestionsList',
    suggestion: 'autosuggestSuggestion',
    suggestionHighlighted: 'autosuggestSuggestionHighlighted',
  }

  const fetchBookCover = useCallback(async (book, authorName, fromHandleSubmit = false) => {
    // const allBooks = author?.series.flatMap((series) => series.books)
    // if (fromHandleSubmit && allBooks.some(existingBook => existingBook.title === book.title)) {
    //   setError({ message: 'Author already has this book' })
    //   throw new Error('Author already has this book')
    // }
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
  }, [setBookCovers])

  useEffect(() => {
    if (searchTerm === '' || !authors.some(author => author.name === searchTerm)) {
      setSelectedAuthor(null)
    }
  }, [searchTerm, authors])

  async function handleAuthorSubmit() {
    let authorName = ''
    if (authorRef.current) {
      authorName = authorRef.current.value.trim()
    }
    const nameParts = authorName.split(' ')

    if (nameParts.length < 2) {
      setError({ formError: 'Please enter a first and last name' })
      return
    }

    console.log(selectedAuthor)
    if (!selectedAuthor) {
      setAuthorName(authorName)
      let author = { name: authorName, series: [] }
      const result = await dispatch(thunkAddAuthor(author))

      if (typeof result === 'object' && result.message) {
        setError({ formError: result.message })
        return
      } else {
        setNewAuthorId(result)
      }
    }

    if (authorRef.current) {
      authorRef.current.value = ''
    }
    setClicked(!clicked)
    setSearchTerm('')
  }

  async function handleBookSubmit(e) {
    e.preventDefault()
    const bookTitle = bookRef.current.value
    const series = seriesRef.current.value
    const bookInfo = await fetchBookCover({ title: bookTitle }, authorName, true)

    const newBook = {
      cover: bookInfo.cover,
      title: bookTitle,
      genre: genre,
      author_id: newAuthorId || selectedAuthor.id,
    }

    const result = await dispatch(thunkAddBookToAuthor(newBook))

    if (typeof result === 'object' && result.message) {
      setError({ formError: result.message })
      return
    } else {
      setNewBookId(result)
    }

    dispatch(thunkAddRec({ recommendation_id: newBookId, book_id: newBookId }))

    setClicked(false)
    bookRef.current.value = ''
    seriesRef.current.value = ''
    setAddBook(false)


  }


  return (
    <>
      {!clicked && !addBook ? (
        <button className="new-rec-btn" onClick={() => setClicked(!clicked)}>
          Add a new recommendation
        </button>
      ) : (
        <>
          {!addBook && (
            <>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                theme={theme}
              />
              <button onClick={() => setClicked(!clicked)}>Cancel</button>
            </>
          )}
          {!addBook && <p>Cant find author?</p>}
          {!addAuthor ? (
            <button onClick={() => setAddAuthor(true)}>Add Author</button>
          ) : (
            <form onSubmit={async (e) => {
              e.preventDefault()
              await handleAuthorSubmit()
              setAddBook(true)
            }}>
              {!addBook ? (
                <>
                  <input type="text" placeholder="Enter author name" ref={authorRef} />
                  <button type='submit' required>Add Author</button>
                  <button type='button' onClick={() => setAddAuthor(false)}>X</button>
                </>
              ) : (
                <>
                  <div className="new-book-rec">
                    <div className='book-rec-title'>
                      <label htmlFor="book-title">Add a book from author: {authorName}</label>
                      <input type="text" name='book-title' placeholder="Enter book title..." ref={bookRef} required/>
                      <input type="text" placeholder='Enter the series... (Optional)' ref={seriesRef} />
                    </div>
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
                  <button onClick={handleBookSubmit} type="button">Add Book</button>
                </>
              )}
            </form>
          )}
        </>
      )}
    </>
  )
}
