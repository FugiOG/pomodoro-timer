import classNames from 'classnames'
import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

interface BurgerMenuProps {
    setShowSettings: (value: boolean) => void
    isActive: boolean
    setIsActive: (value: boolean) => void
}

const BurgerMenu: FC<BurgerMenuProps> = ({setShowSettings, isActive, setIsActive}) => {
  return (
    <div className={classNames('menu', {'active': isActive})} onClick={() => setIsActive(false)}>
      <div className={classNames("menu__content", {'active': isActive})} onClick={e => e.stopPropagation()}>
        <div className="menu__header">Menu</div>
        <ul>
            <li><button className='timer-settings-btn' onClick={() => setShowSettings(true)}>Settings</button></li>
            <li><NavLink to="/about" className={({ isActive }) => classNames('about-link', {'active': isActive})}>About</NavLink></li>
        </ul>
      </div>
    </div>
  )
}

export default BurgerMenu
