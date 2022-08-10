import classNames from 'classnames'
import React, { FC, useState } from 'react'
import {NavLink, Link} from 'react-router-dom'
import BurgerMenu from './BurgerMenu'
import Modal from './Modal'
import TimerSettings from './TimerSettings'

const Navbar: FC = () => {
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [menuActive, setMenuActive] = useState<boolean>(false);

  return (
    <>
      <nav className='navbar'>
          <div className="nav-wrapper px-1">
              <Link to="/" className="brand-logo left">Pomodoros</Link>
              <button className="dropdown-trigger right" onClick={() => setMenuActive(prev => !prev)}><i className="material-icons">menu</i></button>

              <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><button className='timer-settings-btn' onClick={() => setShowSettings(true)}>Settings</button></li>
                  <li><NavLink to="/about" className={({ isActive }) => classNames('about-link', {'active': isActive})}>About</NavLink></li>
              </ul>
          </div>
      </nav>
      <Modal setActive={setShowSettings} active={showSettings}>
        <TimerSettings setActive={setShowSettings}/>
      </Modal>
      {menuActive && <BurgerMenu isActive={menuActive} setIsActive={setMenuActive} setShowSettings={setShowSettings} />}
    </>
  )
}

export default Navbar
