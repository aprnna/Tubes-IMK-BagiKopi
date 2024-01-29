import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { faHouse,faGlassWater,faFile,faUser } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
 
  const userNav = [
    {
      name:'Home',
      link:'/',
      icon:faHouse
    },
    {
      name:'Menu',
      link:'/product-list',
      icon:faGlassWater
    },
    {
      name:'Pesanan',
      link:'/history-transaction',
      icon:faFile
    },
    {
      name:'Profile',
      link:'/profile',
      icon:faUser
    }
  ]

  return (
    <nav className='bg-white flex z-10 bottom-0 sticky justify-between px-4 text-center pt-3'>
      {userNav.map((item,index)=>(
        <NavLink to={item.link} key={index} className={({ isActive }) => isActive ? "text-accent3" : ""}>
          <FontAwesomeIcon icon={item.icon} size='xl' />
          <p>{item.name}</p>
        </NavLink>
      ))}

    </nav>
  )
}
