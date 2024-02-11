import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import './NewBoardModal.css'
import { useNavigate } from 'react-router-dom'

export default function NewBoardModal() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { closeModal } = useModal()

  return (
    <h1>New Board</h1>
  )
}
