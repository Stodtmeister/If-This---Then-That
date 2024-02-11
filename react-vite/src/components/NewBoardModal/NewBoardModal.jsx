import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import './NewBoardModal.css'
import { useNavigate } from 'react-router-dom'
import { thunkAddBoard } from '../../redux/boards'
import { useState } from 'react'

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
    <>
      <h1>Add a new board</h1>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            required
          />
          <button type="submit">+</button>
        </label>
      </form>
    </>
  )
}
