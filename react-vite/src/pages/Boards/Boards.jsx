import { useDispatch, useSelector } from 'react-redux';
import './Boards.css'
import { useEffect, useState } from 'react';
import { thunkGetBoards } from '../../redux/boards';
import OpenModalMenuItem from '../../components/Navigation/OpenModalMenuItem';
import LoginFormModal from '../../components/LoginFormModal';

export default function Boards() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const boards = useSelector(state => state.boards.boards);

  function newBoard() {

  }
  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    dispatch(thunkGetBoards());
  }, [dispatch]);

  return (
    <div className="boards-container">
      <h1>Boards</h1>
      <OpenModalMenuItem
        itemText="Add board"
        onItemClick={closeMenu}
        modalComponent={<LoginFormModal />}
      />
      <button onClick={newBoard}>Add New Board</button>
      <div className="boards-grid">
        {boards?.map((board, index) => (
          <div key={board.id} className="board">{board.name}</div>
        ))}
      </div>
    </div>
  )
}
