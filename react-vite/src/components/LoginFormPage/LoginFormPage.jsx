import { useState } from 'react'
import { thunkLogin } from '../../redux/session'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import './LoginForm.css'

function LoginFormPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  if (sessionUser) return <Navigate to="/" replace={true} />

  const handleSubmit = async (e) => {
    e.preventDefault()

    const serverResponse = await dispatch(
      thunkLogin({
        email,
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
      <h1 className="site-title">If This Then That</h1>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form onSubmit={handleSubmit} className="login-form">
        <fieldset>
          <legend>Log In</legend>
          <label className="signup-label">
            Email:
            <br />
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
            Password:
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </label>
          {errors.password && <p>{errors.password}</p>}
          <button className='login-btn' type="submit">Log In</button>
        </fieldset>
      </form>
    </>
  )
}

export default LoginFormPage
