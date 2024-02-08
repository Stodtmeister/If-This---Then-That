import { useDispatch, useSelector } from 'react-redux';
import './Boards.css'
import { useEffect } from 'react';
import { thunkGetBoards } from '../../redux/boards';

export default function Boards() {
  const dispatch = useDispatch();
  const boards = useSelector(state => state.boards.boards);
  const user = useSelector(state => state.session.user);

  console.log('USER', user);
  console.log('BOARDS', boards);

  // boards.forEach(board => {
  //   console.log("BOARD", board)
  // })

  useEffect(() => {
    dispatch(thunkGetBoards());
  }, [dispatch]);

  return (
    <div className="Boards">
      <h1>Boards</h1>
      <ul>
        {boards?.map(board => (
          <>
          {console.log("BOARD", board)}
          <li key={board.id}>{board.name}</li>
          </>
        ))}
      </ul>
    </div>
  )
}
