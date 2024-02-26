import { NavLink } from 'react-router-dom'
import ProfileButton from './ProfileButton'
import './Navigation.css'
import { useState } from 'react'

function Navigation() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark-theme')
  }

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="logo">
          <div className="nav-link">
            <span className="link-text">If/Then</span>
            <i className="fa-solid fa-angles-right fa-xl"></i>
          </div>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/boards">
            <i className="fa-solid fa-dragon fa-xl"></i>
            <span className="link-text">Boards</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/authors">
            <i className="fa-solid fa-pencil fa-xl"></i>
            <span className="link-text">Authors</span>
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <div className="nav-link" onClick={toggleTheme}>
            <i className={`fa-solid fa-${isDark ? 'moon' : 'sun'} fa-xl`}></i>
            <span className="link-text">Mode</span>
          </div>
        </li> */}
        <li className="nav-item">
          <ProfileButton />
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
