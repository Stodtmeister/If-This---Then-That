import { useState } from 'react'
import Select from 'react-select'

export default function AddBook({
  authorInfo,
  authorName,
  bookRef,
  seriesRef,
  genre,
  setGenre,
  handleBookSubmit,
  error,
  setAuthorHasBook,
  setModalIsOpen,
}) {
  const [foundBook, setFoundBook] = useState(false)
  const [newBook, setNewBook] = useState(false)

  const options = authorInfo.series.flatMap((series) =>
    series.books.map((book) => ({
      value: book.id,
      label: book.title,
      image: book.cover,
    }))
  )

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#380000', // Change the background color
      color: '#aaa', // Change the color of the text
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#f8b500', // Change the color of the selected value
    }),
  }

  const formatOptionLabel = ({ value, label, image }) => (
    <div style={{ display: 'flex', alignItems: 'center', height: '90px' }}>
      <img
        className="book-select"
        src={image}
        alt={label}
        style={{
          width: '60px',
          height: '90px',
          marginRight: '10px',
          borderRadius: '5px',
          marginBottom: '10px',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '13px' }}>{label}</span>
      </div>
    </div>
  )

  return (
    <>
      {/* {console.log('AUTHOR INFO', authorInfo.series)} */}
      <div className="new-book-rec">
        <div className="book-rec-title">
          <h2 className="rec-title">Add a recommendation</h2>
          {error.message && <p className="error">{error.message}</p>}
          {!newBook && (
            <Select
              options={options}
              formatOptionLabel={formatOptionLabel}
              styles={customStyles}
              onChange={(selectedOption) => {
                if (selectedOption) {
                  setFoundBook(true)
                  setAuthorHasBook(selectedOption)
                }
              }}
              placeholder={`Select a book from ${authorInfo.name}...`}
            />
          )}
          {foundBook ? (
            <button
              className='add-book-rec'
              onClick={(e) => {
                handleBookSubmit(e)
              }}
            >
              Add book
            </button>
          ) : (
            <>
              {!newBook && (
                <>
                  <p className="unable">
                    Unable to find the book youre looking for?
                  </p>
                  <button
                    className="add-book-rec"
                    onClick={() => setNewBook(!newBook)}
                    >
                    {' '}
                    Add Book
                  </button>
                </>
              )}
            </>
          )}
          {newBook && !foundBook && (
            <>
              <input
                className="autosuggestInput need-margin"
                type="text"
                name="book-title"
                placeholder={`Enter a title by ${authorName}...`}
                ref={bookRef}
                required
              />
              <div className="series-and-select">
                <input
                  className="autosuggestInput input-series"
                  type="text"
                  placeholder="Enter the series... (Optional)"
                  ref={seriesRef}
                />
                <select
                  id="genre-select"
                  name="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  required
                >
                  <option value="">Genre*</option>
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
              <button
                className="add-book-rec"
                onClick={(e) => {
                  handleBookSubmit(e)
                }}
                type="button"
              >
                Add Book
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
