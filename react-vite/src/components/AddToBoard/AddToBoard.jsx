import { useDispatch, useSelector } from "react-redux";
import { thunkAddBook, thunkGetBoards } from "../../redux/boards";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AddToBoard({ bookId, setClickedBookId }) {
  const dispatch = useDispatch()
  const boards = useSelector((state) => state.boards.boards)

  useEffect(() => {
    dispatch(thunkGetBoards())
  }, [dispatch])

  const handleMoveBook = (boardId, name) => {
    dispatch(thunkAddBook(boardId, bookId))
    setClickedBookId(null)
    toast.success(`Book added to your board: ${name}!`)
  }

  return (
    <>
      <h2>My Boards</h2>
      <div>
        {boards?.map((board) => (
          <div key={board.id}>
            <button onClick={() => handleMoveBook(board.id, board.name)}>Add to {board.name}</button>
          </div>
        ))}
      </div>
    </>
  )
}
