import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { thunkGetBoardById } from '../../redux/boards'
import './SpecificBoard.css'

export default function SpecificBoard() {
  const { boardId } = useParams()
  const dispatch = useDispatch()
  const books = useSelector((state) => state.boards.boardBooks[boardId])

  useEffect(() => {
    dispatch(thunkGetBoardById(boardId))
  }, [boardId, dispatch])

  return (
    <div>
      <>
        <h1>SpecificBoard {boardId}</h1>
        {books?.books?.length > 0 ? (
          books.books.map((book) => (
            <div key={book.id}>
              <p>{book.title}</p>
              <img src={book.cover} alt="book cover" />
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </>
    </div>
  )
}
