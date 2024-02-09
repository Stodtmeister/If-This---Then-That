import { useDispatch, useSelector } from 'react-redux';
import './Boards.css'
import { useEffect } from 'react';
import { thunkGetBoards } from '../../redux/boards';

export default function Boards() {
  const dispatch = useDispatch();
  const boards = useSelector(state => state.boards.boards);

  useEffect(() => {
    dispatch(thunkGetBoards());
  }, [dispatch]);

  // return (
  //   <div className=".boards-container">
  //     <h1>Boards</h1>
  //       {boards?.map((board, index) => (
  //         <div key={board.id} className="boards">{board.name}</div>
  //       ))}
  //   </div>
  // )
  return (
    <div className="boards-container">
      <h1>Boards</h1>
      <div className="boards-grid">
        {boards?.map((board, index) => (
          <div key={board.id} className="board">{board.name}</div>
        ))}
      </div>
    </div>
  )
}
