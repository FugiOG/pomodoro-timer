import React, { FC, useState } from 'react'
import SettingsModal from './SettingsModal'

const Navbar: FC = () => {
  const [showSettings, setShowSettings] = useState<boolean>(false)


  return (
    <>
      <nav className='navbar'>
          <div className="nav-wrapper px-1">
              <a href="/" className="brand-logo left">Pomodoros</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><button className='timer-settings-btn' onClick={() => setShowSettings(true)}>Settings</button></li>
                  <li><a href="collapsible.html">About</a></li>
              </ul>
          </div>
      </nav>
      <SettingsModal/>
    </>
  )
}

export default Navbar
