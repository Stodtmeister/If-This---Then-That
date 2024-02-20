import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { thunkGetBoards, thunkEditBoard, thunkDeleteBoard } from '../../redux/boards'
import OpenModalButton from '../../components/OpenModalButton/OpenModalButton'
import NewBoardModal from '../../components/NewBoardModal/NewBoardModal'
import './Boards.css'
import { thunkGetAllBooks } from '../../redux/books'

export default function Boards() {
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)
  const [showOptions, setShowOptions] = useState(null)
  const [editingBoardId, setEditingBoardId] = useState(null)
  const [newBoardName, setNewBoardName] = useState('')
  const boards = useSelector((state) => state.boards.boards)
  const navigate = useNavigate()
  const closeMenu = () => setShowMenu(false)
  // const [loading, setLoading] = useState(true)
  // const [bookCovers, setBookCovers] = useState({})
  // const { books } = useSelector((state) => state.books)
  // const {books} = useSelector((state) => state.books)
  // const hasFetchedBookCovers = useRef(false);
  

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

  //! Original
  useEffect(() => {
    dispatch(thunkGetBoards())
    // dispatch(thunkGetAllBooks()).then(() => setLoading(false))
  }, [dispatch])

  // useEffect(() => {
  //   dispatch(thunkGetBoards())
  //   dispatch(thunkGetAllBooks()).then(() => {
  //     console.log('hasFetchedBookCovers.current:', hasFetchedBookCovers.current);
  //     if (!hasFetchedBookCovers.current && books) {
  //       Object.values(books).forEach(fetchBookCover);
  //     }
  //     setLoading(false);
  //     hasFetchedBookCovers.current = true;
  //   });
  // }, [dispatch]);
  // useEffect(() => {
  //   dispatch(thunkGetBoards())
  //   console.log('hasFetchedBookCovers.current:', hasFetchedBookCovers.current);
  //   if (!hasFetchedBookCovers.current) {
  //     dispatch(thunkGetAllBooks()).then(() => {
  //       if (books) {
  //         Object.values(books).forEach(fetchBookCover);
  //       }
  //       setLoading(false);
  //       hasFetchedBookCovers.current = true;
  //     });
  //   }
  // }, [dispatch]);

  // if (loading) {
  //   return <h2>Loading...</h2>
  // }

  return (
    <div className="boards-container">
      <h2 className='board-headers'>My Boards</h2>
      <div className="boards-grid">
        {boards?.map((board) => (
          <div
            key={board.id}
            className="board"
            onClick={() => navigate(`/boards/${board.id}`, { state: { boardName: board.name } })}
            >
            {editingBoardId === board.id ? (
              <input
                type="text"
                value={newBoardName}
                onChange={e => setNewBoardName(e.target.value)}
                className='form-input2'
                onClick={e => e.stopPropagation()}
              />
            ) : (
              board.name
            )}
            <i
              className="fa-solid fa-ellipsis-vertical"
              onClick={(e) => {
                e.stopPropagation()
                setShowOptions(showOptions === board.id ? null : board.id)
              }}
            ></i>
            {showOptions === board.id && (
              <div className="board-options">
                {editingBoardId === board.id ? (
                  <button id='save-board-btn' onClick={(e) => {
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
      <OpenModalButton
        buttonText={<i className="fa-solid fa-plus"></i>}
        onItemClick={closeMenu}
        modalComponent={<NewBoardModal />}
      />
    </div>
  )
}
