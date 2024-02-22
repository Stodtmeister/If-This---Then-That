export default function AddBook({ authorName, bookRef, seriesRef, genre, setGenre, handleBookSubmit}) {
  return (
    <>
      <div className="new-book-rec">
        <div className='book-rec-title'>
          <h2 className="rec-title">Add a book from {authorName}</h2>
          {/* <label htmlFor="book-title">Add a book from author: {authorName}</label> */}
          <input className="autosuggestInput need-margin" type="text" name='book-title' placeholder="Enter book title..." ref={bookRef} required/>
        </div>
        <div className="series-and-select">
          <input className="autosuggestInput input-series" type="text" placeholder='Enter the series... (Optional)' ref={seriesRef} />
          <select id="genre-select" name="genre" value={genre} onChange={e => setGenre(e.target.value)} required>
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
      </div>
      <button className="add-book-rec" onClick={handleBookSubmit} type="button">Add Book</button>
    </>
  )
}
