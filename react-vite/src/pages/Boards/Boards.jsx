import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { thunkGetBoards, thunkEditBoard, thunkDeleteBoard } from '../../redux/boards'
import OpenModalButton from '../../components/OpenModalButton/OpenModalButton'
import NewBoardModal from '../../components/NewBoardModal/NewBoardModal'
import './Boards.css'

export default function Boards() {
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [editingBoardId, setEditingBoardId] = useState(null)
  const [newBoardName, setNewBoardName] = useState('')
  const boards = useSelector((state) => state.boards.boards)
  const navigate = useNavigate()

  const closeMenu = () => setShowMenu(false)

  function handleEdit(boardId) {
    setEditingBoardId(boardId)
    setNewBoardName(boards.find(board => board.id === boardId).name)
  }

  function handleSave() {
    dispatch(thunkEditBoard(editingBoardId, { name: newBoardName }))
    setEditingBoardId(null)
    setNewBoardName('')
    setShowOptions(false)
  }

  function handleDelete(id) {
    dispatch(thunkDeleteBoard(id))
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
        {boards?.map((board) => (
          <div
            key={board.id}
            className="board"
            onClick={() => navigate(`/boards/${board.id}`)}
            >
            {editingBoardId === board.id ? (
              <input
                type="text"
                value={newBoardName}
                onChange={e => setNewBoardName(e.target.value)}
                onClick={e => e.stopPropagation()}
              />
            ) : (
              board.name
            )}
            <i
              className="fa-solid fa-ellipsis-vertical"
              onClick={(e) => {
                e.stopPropagation()
                setShowOptions(!showOptions)
              }}
            ></i>
            {showOptions && (
              <div className="board-options">
                {editingBoardId === board.id ? (
                  <button className='save-board-btn' onClick={(e) => {
                    e.stopPropagation()
                    handleSave()
                  }}>Save</button>
                ) : (
                  <button className='edit-board-btn' onClick={(e) => {
                    e.stopPropagation()
                    handleEdit(board.id)
                  }}>Edit</button>
                )}
                <button className='delete-board-btn' onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(board.id)
                }}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
