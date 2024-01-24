import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { faHouse,faGlassWater,faFile,faUser } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
  return (
    <nav className='bg-white flex z-10 bottom-0 sticky justify-between px-4 text-center pt-3'>
      <NavLink to='/' className={({ isActive }) => isActive ? "text-accent3" : ""}>
        <FontAwesomeIcon icon={faHouse} size='xl' />
        <p>Home</p>
      </NavLink>
      <NavLink to='/product-list' className={({ isActive }) => isActive ? "text-accent3" : ""}>
        <FontAwesomeIcon icon={faGlassWater} size='xl' />
        <p>Menu</p>
      </NavLink>
      <NavLink to='/history-transaction' className={({ isActive }) => isActive ? "text-accent3" : ""}>
        <FontAwesomeIcon icon={faFile} size='xl' />
        <p>Pesanan</p>
      </NavLink>
      <NavLink to='/profile' className={({ isActive }) => isActive ? "text-accent3" : ""}>
        <FontAwesomeIcon icon={faUser} size='xl' />
        <p>Saya</p>
      </NavLink>
    </nav>
  )
}
