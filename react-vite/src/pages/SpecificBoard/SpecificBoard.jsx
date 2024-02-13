import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetBoardById } from '../../redux/boards'
import './SpecificBoard.css'

export default function SpecificBoard() {
  const { boardId } = useParams()
  const dispatch = useDispatch()
  const books = useSelector((state) => state.boards.boardBooks[boardId])
  const [bookCovers, setBookCovers] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    dispatch(thunkGetBoardById(boardId))
  }, [boardId, dispatch])

  async function fetchBookCover(book) {
    if (book.cover) {
      setBookCovers((prev) => ({ ...prev, [book.id]: book.cover }));
      console.log('ALREADY HAS A COVER');
      return Promise.resolve(); // Resolve immediately for books that already have a cover
    } else {
      console.log('FETCHING BOOK COVER');
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(book.title)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.items) {
        const coverImageLink = data.items[0].volumeInfo.imageLinks.thumbnail;
        setBookCovers((prev) => ({ ...prev, [book.id]: coverImageLink }));
        await fetch(`/api/books/${book.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ coverImageLink }),
        });
      }
    }
  }

  useEffect(() => {
    setIsLoading(true);
    if (books?.books) {
      Promise.all(books.books.map(fetchBookCover)).then(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [books]);

  return (
    <div>
    {isLoading ? (<div>Loading...</div>) : (
      <>
        <h1>SpecificBoard {boardId}</h1>
        {books?.books?.length > 0 ? (
          books.books.map((book) => (
            <div key={book.id}>
              <img
                className="cover-img"
                src={bookCovers[book.id] || book.cover}
                alt="book cover"
                title={book.title}
              />
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </>
    )}
  </div>
  )
}
