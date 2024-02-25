import { useDispatch, useSelector } from 'react-redux'
import Autosuggest from 'react-autosuggest'
import { useCallback, useEffect, useRef, useState } from 'react'
import { thunkAddAuthor, thunkAddBookToAuthor, thunkGetAuthors } from '../../redux/authors'
import { thunkAddRec } from '../../redux/recommendations'
import { useParams } from 'react-router-dom'
import AddBook from '../AddBook/AddBook'
import Modal from 'react-modal'
import { defaultCover } from '../../../images/defaultBookCover.png'
import './AddRecommendation.css'

export default function AddRecommendation() {
  const { bookId } = useParams()
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
  const [foundAuthor, setFoundAuthor] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [authorHasBook, setAuthorHasBook] = useState({})


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
    placeholder: 'Search for an author by first name...',
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

  const fetchBookCover = useCallback(
    async (book, authorName, fromHandleSubmit = false) => {
      const allBooks = selectedAuthor?.series.flatMap((series) => series.books)
      if (
        fromHandleSubmit &&
        allBooks?.some((existingBook) => existingBook.title === book.title)
      ) {
        setError({ message: 'Author already has this book' })
        throw new Error('Author already has this book')
      }

      if (book.cover) {
        console.log('Has cover')
        setBookCovers((prev) => ({ ...prev, [book.id]: book.cover }))
        return Promise.resolve()
      } else {
        console.log('Fetch cover')
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
          const coverImageLink = data.items[0].volumeInfo.imageLinks?.thumbnail || defaultCover
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
    },
    [selectedAuthor, setBookCovers]
  )

  useEffect(() => {
    if (
      searchTerm === '' ||
      !authors.some((author) => author.name === searchTerm)
    ) {
      setSelectedAuthor(null)
    } else {
      //! added
      setSelectedAuthor(authors.find((author) => author.name === searchTerm))
    }
  }, [searchTerm, authors])

  async function handleAuthorSubmit() {
    console.log(
      'FROM HANDLE AUTHOR SUBMIT',
      selectedAuthor,
      'found author',
      foundAuthor
    )
    let authorName = ''
    if (authorRef.current) {
      console.log('authorref current?');
      authorName = authorRef.current.value.trim()
    }
    const nameParts = authorName.split(' ')

    if (nameParts.length < 2) {
      setError({ formError: 'Please enter a first and last name' })
      return
    }

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

    setAuthor(authorRef.current.value)
    if (authorRef.current) {
      authorRef.current.value = ''
    }
    setClicked(!clicked)
    setSearchTerm('')
  }

  async function handleBookSubmit(e) {
    e.preventDefault()

    // if (authorHasBook) {
    //   console.log('AUTHOR HAS BOOK', authorHasBook);
    // } else {
    //   console.log('AUTHOR HAS NO BOOK', authorHasBook);
    // }

    if (Object.keys(authorHasBook).length > 0) {
      try {
        await dispatch(thunkAddRec({ recommendation_id: authorHasBook.value, book_id: Number(bookId) }))

      } catch (error) {
        console.error('Exception caught in handleBookSubmit:', error.toString())
      }

      return
    }

    const bookTitle = bookRef.current.value
    const series = seriesRef.current.value
    let bookInfo

    if (selectedAuthor) {
      bookInfo = await fetchBookCover(
        { title: bookTitle },
        selectedAuthor.name,
        true
      )
    } else {
      bookInfo = await fetchBookCover({ title: bookTitle }, authorName, true)
    }

    let newBook = {}
    if (selectedAuthor) {
      newBook = {
        cover: bookInfo.cover,
        title: bookTitle,
        genre: genre,
        author_id: selectedAuthor.id,
        //? Might need a series_id
      }
    } else {
      newBook = {
        cover: bookInfo.cover,
        title: bookTitle,
        genre: genre,
        author_id: newAuthorId,
        //? Might need a series_id
      }
    }

    const result = await dispatch(thunkAddBookToAuthor(newBook))
    if (typeof result === 'object' && result.message) {
      setError({ formError: result.message })
      return
    } else {
      setNewBookId(result)
    }

    dispatch(thunkAddRec({ recommendation_id: result, book_id: Number(bookId) }))

    setClicked(false)
    bookRef.current.value = ''
    seriesRef.current.value = ''
    setAddBook(false)
  }

  return (
    <>
      {!clicked && !addBook ? (
        <button
          className="new-rec-btn"
          onClick={() => {
            setClicked(!clicked)
            setModalIsOpen(true)
          }}
        >
          Add a new recommendation
        </button>
      ) : (
        <Modal
          appElement={document.getElementById('root')}
          isOpen={modalIsOpen}
          className={{
            base: 'add-rec-modal',
            afterOpen: 'ReactModal__Content--after-open',
            beforeClose: 'ReactModal__Content--before-close',
          }}
          overlayClassName={{
            base: 'add-rec-modal-overlay',
            afterOpen: 'ReactModal__Overlay--after-open',
            beforeClose: 'ReactModal__Overlay--before-close',
          }}
          closeTimeoutMS={400}
          onRequestClose={() => {
            setClicked(false)
            setModalIsOpen(false)
          }}
        >
          <>
            {!addBook && !addAuthor && (
              <>
                <h2 className="rec-title">Add a recommendation</h2>
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputProps}
                  theme={theme}
                />
                {/* <button onClick={() => setClicked(!clicked)}>Cancel</button> */}
              </>
            )}
            {!addBook && !addAuthor && (
              <div className="rec-options">
                <div className="unfound-author">
                  <p className="search-result">Cant find author?</p>
                  {/* {selectedAuthor && <p className='error'>Add a book</p>} */}
                  <button
                    disabled={selectedAuthor}
                    onClick={() => setAddAuthor(true)}
                  >
                    Add Author
                  </button>
                </div>
                <div className="found-author">
                  <p className="search-result">Found Author?</p>
                  <button
                    onClick={() => (
                      setFoundAuthor(true),
                      setAddBook(true),
                      setAddAuthor(false)
                    )}
                  >
                    Add Book
                  </button>
                </div>
              </div>
            )}
            {!addAuthor ? (
              <>
                {foundAuthor && (
                  <AddBook
                    authorInfo={selectedAuthor}
                    authorName={selectedAuthor.name}
                    bookRef={bookRef}
                    seriesRef={seriesRef}
                    genre={genre}
                    setGenre={setGenre}
                    handleBookSubmit={handleBookSubmit}
                    error={error}
                    setAuthorHasBook={setAuthorHasBook}
                    setModalIsOpen={setModalIsOpen}
                  />
                )}
              </>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  await handleAuthorSubmit()
                  setAddBook(true)
                }}
              >
                {!addBook ? (
                  <div className="add-rec-author">
                    <h2 className="rec-title">Add author</h2>
                    <input
                      className="autosuggestInput"
                      type="text"
                      placeholder="Enter author first and last name..."
                      ref={authorRef}
                    />
                    <button
                      className="add-new-author-rec"
                      type="submit"
                      required
                    >
                      Add Author
                    </button>
                  </div>
                ) : (
                  <AddBook
                    authorInfo={selectedAuthor}
                    authorName={authorName}
                    bookRef={bookRef}
                    seriesRef={seriesRef}
                    genre={genre}
                    setGenre={setGenre}
                    handleBookSubmit={handleBookSubmit}
                    error={error}
                    setAuthorHasBook={setAuthorHasBook}
                    setModalIsOpen={setModalIsOpen}
                    addedAuthor={author}
                  />
                )}
              </form>
            )}
            <button
              className="cancel-rec"
              onClick={() => {
                setClicked(false)
                setFoundAuthor(false)
                setAddAuthor(false)
                setSearchTerm('')
                setGenre('')
                setModalIsOpen(false)
                setAddBook(false)
                setError({})
              }}
            >
              Cancel
            </button>
          </>
        </Modal>
      )}
    </>
  )
}
