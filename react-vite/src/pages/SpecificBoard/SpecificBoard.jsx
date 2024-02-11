import { useParams } from 'react-router-dom'
import './SpecificBoard.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';

// export default function SpecificBoard() {
//   const { boardId } = useParams()
//   const board = useSelector(state => state.boards)

//   console.log('BOARD????', board);


//   return (
//     <div>
//       <h1>SpecificBoard {boardId}</h1>
//     </div>
//   )
// }
export default function SpecificBoard() {
  const { boardId } = useParams();
  const board = useSelector(state => state.boards.boards.find(board => board.id === parseInt(boardId)));
  const books = useSelector(state => state.boards);

  console.log('BOOKS?????', books);

  useEffect(() => {
    console.log('Board!:', board);
  }, [board]);

  return (
    <div>
      <h1>SpecificBoard {boardId}</h1>
    </div>
  );
}
