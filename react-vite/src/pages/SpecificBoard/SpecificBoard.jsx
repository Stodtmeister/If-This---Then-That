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

  useEffect(() => {
    dispatch(thunkGetBoardById(boardId))
  }, [boardId, dispatch])

  useEffect(() => {
    if (books?.books) {
      books.books.forEach((book) => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(book.title)}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            if (data.items) {
              const coverImageLink = data.items[0].volumeInfo.imageLinks.thumbnail
              setBookCovers(prev => ({ ...prev, [book.id]: coverImageLink }))
            }
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      })
    }
  }, [books])

  // useEffect(() => {
  //   if (books?.books) {
  //     books.books.forEach((book) => {
  //       fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(book.title)}`)
  //         .then(response => response.json())
  //         .then(data => {
  //           if (data.items) {
  //             const coverImageLink = data.items[0].volumeInfo.imageLinks.thumbnail
  //             setBookCovers(prev => ({ ...prev, [book.id]: coverImageLink }))
  //           }
  //         })
  //     })
  //   }
  // }, [books])

  return (
    <div>
      <>
        <h1>SpecificBoard {boardId}</h1>
        {books?.books?.length > 0 ? (
          books.books.map((book) => (
            <div key={book.id}>
              {/* <p>{book.title}</p> */}
              <img className='cover-img' src={bookCovers[book.id] || book.cover} alt="book cover" title={book.title} />
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </>
    </div>
  )
}
