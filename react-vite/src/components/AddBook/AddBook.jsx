export default function AddBook({ authorName, bookRef, seriesRef, genre, setGenre, handleBookSubmit}) {
  return (
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
  )
}
