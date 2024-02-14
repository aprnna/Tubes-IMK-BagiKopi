import React from 'react'
import { Outlet, useLocation} from 'react-router-dom'
import { Icon } from '@iconify/react'
import { NavLink } from 'react-router-dom'

export default function Layout() {
  const location = useLocation()
  const userNav = [
    {
      name:'Home',
      link:'/',
      path1:'/assets/logo2.png',
      path2:'/assets/logo2in.png'
    },
    {
      name:'Menu',
      link:'/product-list',
      icon:'circum:coffee-cup'
    },
    {
      name:'Pesanan',
      link:'/history-transaction',
      icon:'lets-icons:order-fill'
    },
    {
      name:'Profile',
      link:'/profile',
      icon:'mingcute:user-2-fill'
    }
  ]
  return (
    <div>
      <div className='min-h-dvh'>
        <Outlet/>
      </div>
      <nav className='bg-white flex z-10 bottom-0 sticky justify-between px-4 text-center pt-3'>
        {userNav.map((item,index)=>{
          let isActive = item.link === '/' ? false : location.pathname.startsWith(item.link)
          if (item.link === '/' && location.pathname === '/') isActive = true
          return (
          <NavLink to={item.link} key={index} className={ isActive ? "text-accent3 font-bold" : ""}>
            <div className='flex items-center justify-between flex-col'>
              {item.icon ?<Icon icon={item.icon} className='text-3xl'/>:<img src={isActive ? item.path1 : item.path2} alt='logo' className='h-7 w-7'/>}
              <p>{item.name}</p>
            </div>
          </NavLink>
        )})}
      </nav>
    </div>
  )
}
