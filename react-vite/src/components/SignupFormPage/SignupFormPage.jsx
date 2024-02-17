import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { thunkSignup } from '../../redux/session'

function SignupFormPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sessionUser = useSelector((state) => state.session.user)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})

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
        email,
        username,
        password,
      })
    )

    if (serverResponse) {
      setErrors(serverResponse)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="login-background">
      <h1 className="site-title">If This Then That</h1>
      {/* <section className="logo-container">
        <div className="container">
          <div className="circle">
            {[...Array(21)].map((_, i) => (
              <span key={i} style={{ '--i': i }}></span>
            ))}
          </div>
          <div className="circle">
            {[...Array(21)].map((_, i) => (
              <span key={i} style={{ '--i': i }}></span>
            ))}
          </div>
        </div>
      </section> */}
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <fieldset>
          <legend>Sign Up</legend>
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
          {errors.email && <p>{errors.email}</p>}
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
          {errors.username && <p>{errors.username}</p>}
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
          {errors.password && <p>{errors.password}</p>}
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
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          <button type="submit" className="login-btn">Submit</button>
          <div className='note-container'>
            <p className='signup-note'>Note: Already have an account?</p>
            <button className='signup-btn' onClick={() => navigate('/')}>Log in</button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default SignupFormPage
