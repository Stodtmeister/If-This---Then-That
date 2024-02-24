import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import './DeleteModal.css'
import { thunkDeleteReview } from "../../redux/reviews";

export default function DeleteModal({ bookId, reviewId }) {
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  async function handleDelete() {
    await dispatch(thunkDeleteReview(bookId, reviewId))
    closeModal()
  }

  return (
    <div className="delete-modal">
      <h3>Confirm Delete</h3>
      <div className="button-container">
        <button className="yes" onClick={handleDelete}>Yes</button>
        <button className="no" onClick={closeModal}>No</button>
      </div>
    </div>
  )
}
