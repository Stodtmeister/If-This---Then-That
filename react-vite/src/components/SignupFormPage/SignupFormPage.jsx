import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { thunkSignup } from '../../redux/session'
import './SignupForm.css'
import LoginFormPage from '../LoginFormPage/LoginFormPage'

function SignupFormPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sessionUser = useSelector((state) => state.session.user)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const [clicked, setClicked] = useState(false)

  if (sessionUser) return <Navigate to="/" replace={true} />

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          'Confirm Password field must be the same as the Password field',
      })
    }

    const serverResponse = await dispatch(
      thunkSignup({
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        email,
        username,
        password,
      })
    )

    if (serverResponse) {
      setErrors(serverResponse)
    } else {
      navigate('/boards')
    }
  }

  return (
    <>
      {/* <h1 className="site-title">If This Then That</h1> */}
      {clicked && <LoginFormPage />}
      {!clicked && (
        <>
      {errors.server && <p className='error'>{errors.server}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <fieldset>
          <legend>Sign Up</legend>
          <div className='first-and-last'>
            <label className='signup-label'>
              First Name:
              <input
                type="text"
                ref={firstNameRef}
                className="form-input first-name"
                required
              />
            </label>
            <label className='signup-label last'>
              Last Name:
              <input
                type="text"
                ref={lastNameRef}
                className="form-input last-name"
                required
              />
            </label>
          </div>
          <label className="signup-label">
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </label>
          {errors.email && <p className='error'>{errors.email}</p>}
          <label className="signup-label">
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              required
            />
          </label>
          {errors.username && <p className='error'>{errors.username}</p>}
          <label className="signup-label">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </label>
          {errors.password && <p className='error'>{errors.password}</p>}
          <label className="signup-label">
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              required
            />
          </label>
          {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
          <button type="submit" className="login-btn">Submit</button>
          <div className='note-container'>
            <p className='signup-note'>Note: Already have an account?</p>
            <button className='signup-btn' onClick={() => setClicked(true)}>Log in</button>
          </div>
        </fieldset>
      </form>
        </>

      )}
    </>
  )
}

export default SignupFormPage
