import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { thunkGetBoards, thunkGetBoardById } from '../../redux/boards'
import OpenModalButton from '../../components/OpenModalButton/OpenModalButton'
import NewBoardModal from '../../components/NewBoardModal/NewBoardModal'
import './Boards.css'

export default function Boards() {
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)
  const boards = useSelector((state) => state.boards.boards)
  const navigate = useNavigate()

  const closeMenu = () => setShowMenu(false)

  async function handleClick(id) {
    await dispatch(thunkGetBoardById(id))
    navigate(`/boards/${id}`)
  }

  useEffect(() => {
    dispatch(thunkGetBoards())
  }, [dispatch])

  return (
    <div className="boards-container">
      <h1>Boards</h1>
      <OpenModalButton
        buttonText="Add board"
        onItemClick={closeMenu}
        modalComponent={<NewBoardModal />}
      />
      <div className="boards-grid">
        {boards?.map((board, index) => (
          <div
            key={board.id}
            className="board"
            onClick={() => handleClick(board.id)}
          >
            {board.name}
          </div>
        ))}
      </div>
    </div>
  )
}
