import { useState } from 'react'
import { thunkLogin } from '../../redux/session'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import SignupFormPage from '../SignupFormPage/SignupFormPage'
import library from '../../../images/pexels-pixabay-256477.jpg'
import books from '../../../images/pexels-pixabay-207636.jpg'
import { Helmet } from 'react-helmet'
import './LoginForm.css'

function LoginFormPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [clicked, setClicked] = useState(false)

  if (sessionUser) return <Navigate to="/" replace={true} />

  function signUp() {
    navigate('/signup')
  }

  const handleSubmit = async (e, demo) => {
    e.preventDefault()

    let serverResponse
    if (demo) {
      serverResponse = await dispatch(
        thunkLogin({
          email: 'science@aa.io',
          password: 'password',
        })
      )
    } else {
      serverResponse = await dispatch(
        thunkLogin({
          email,
          password,
        })
      )
    }

    if (serverResponse) {
      setErrors(serverResponse)
    } else {
      navigate('/boards')
    }
  }

  return (
    <>
      <Helmet><title>If This Then That</title></Helmet>
      <Parallax pages={3}>
        <ParallaxLayer
          offset={0}
          speed={1}
          factor={5}
          style={{
            backgroundColor: 'black',
            backgroundSize: 'cover',
          }}
        />
        <ParallaxLayer
          offset={0}
          speed={1}
          factor={3}
          style={{
            backgroundImage: `url(${library})`,
            backgroundSize: 'contain',
          }}
        />
        <ParallaxLayer
          offset={2}
          speed={2}
          style={{
            backgroundImage: `url(${books})`,
            backgroundSize: 'cover',
          }}
        />
        <ParallaxLayer offset={0.1} factor={2} speed={0.2}>
          <h1 className="site-title">If This Then That</h1>
        </ParallaxLayer>
        <ParallaxLayer offset={1.1} speed={0.5}>
          <div>
            <h2 className="website-description">
              Having trouble knowing what to read next?
              <br />
              Discover a new favorite based on a book that you{"'"}ve enjoyed in
              the past.
              <br />
              <br />
              <span className="this-that">
                <i className="fa-solid fa-arrows-rotate"></i>
                If you liked this, then you{"'"}ll like that
              </span>
              <br />
              <br />
              Or make a recommendation that you think other readers will enjoy
              based on their enjoyment of a different book.
            </h2>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={2.15} speed={0.01}>
          {errors.length > 0 &&
            errors.map((message) => <p className='error' key={message}>{message}</p>)}
          {!clicked ? (
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
                {errors.email && <p className='error'>{errors.email}</p>}
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
                {errors.password && <p className='error'>{errors.password}</p>}
                <button className="login-btn" type="submit">
                  Submit
                </button>
                <div className="note-container">
                  <p className="signup-note">
                    Note: Sign up to create an account.
                  </p>
                  {/* <button className='signup-btn' onClick={signUp}>Sign up</button> */}
                  <button
                    className="signup-btn"
                    onClick={() => setClicked(true)}
                  >
                    Sign up
                  </button>
                  <button
                    className="signup-btn"
                    type="button"
                    onClick={(e) => handleSubmit(e, true)}
                  >
                    Demo User
                  </button>
                </div>
              </fieldset>
            </form>
          ) : (
            <SignupFormPage />
          )}
        </ParallaxLayer>
      </Parallax>
    </>
  )
}

export default LoginFormPage
