import { useDispatch, useSelector } from "react-redux";
import { thunkAddBook, thunkGetBoards } from "../../redux/boards";
import { useEffect } from "react";
import { toast } from "react-toastify";
import './AddToBoard.css'

export default function AddToBoard({ bookId, setClickedBookId, mainBook }) {
  // console.log(bookId, 'BOOKID');
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
    <div className={`board-choices ${mainBook ? 'main-book': ''}`}>
      <select className={`the-select ${mainBook ? 'main-book' : ''}`} onChange={(e) => {
        const selectedBoardId = Number(e.target.value);
        const selectedBoard = boards.find(board => board.id === selectedBoardId);
        if (selectedBoard) {
          handleMoveBook(selectedBoard.id, selectedBoard.name);
        }
      }}>
        <option value="">Select a board</option>
        {boards?.map((board) => (
          <option key={board.id} value={board.id}>Add to {board.name}</option>
        ))}
      </select>
      <button className="cancel-choices" onClick={() => setClickedBookId(null)}>X</button>
    </div>
  )
}
