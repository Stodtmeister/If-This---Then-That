import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useNavigate } from 'react-router-dom'
import { thunkAddBoard } from '../../redux/boards'
import { useState } from 'react'
import './NewBoardModal.css'

export default function NewBoardModal() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.session.user.id)
  const [boardName, setBoardName] = useState('')
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal()


  async function handleSubmit(e) {
    e.preventDefault()

    const serverResponse = await dispatch(
      thunkAddBoard({
        name: boardName,
        userId: user
      })
    )

    if (serverResponse) {
      setErrors(serverResponse)
    }
    closeModal()
  }

  return (
    <div className='new-board'>
      <h2 className='new-board-title'>Add a new board</h2>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form onSubmit={handleSubmit}>
        <fieldset className='new-field'>
          <label className="signup-label">
            Name
            <input
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              className="form-input"
              required
              />
            <button type="submit" className='new-btn'>+</button>
          </label>
        </fieldset>
      </form>
    </div>
  )
}
