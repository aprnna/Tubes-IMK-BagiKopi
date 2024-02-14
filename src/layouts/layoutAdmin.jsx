import React from 'react'
import { Link, Outlet, useLocation} from 'react-router-dom'
import { Icon } from '@iconify/react';

export default function LayoutAdmin() {
  const location = useLocation();
  const navItem  = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: 'ic:round-dashboard'
    },
    {
      name: 'Menu',
      path: '/admin/products',
      icon: 'mdi:food'
    },
    {
      name: 'Pesanan',
      path: '/admin/orders',
      icon: 'ph:receipt-fill'
    },
    {
      name: 'Users',
      path: '/admin/users',
      icon: 'iconamoon:profile-fill'
    }
  ]
  return (
    <main className='w-screen'>
      <div className='grid grid-cols-[1fr_85vw] min-h-screen'>
        <aside className='bg-background p-2 space-y-5'>
          <img src="/assets/MiniLogo.png" alt="logo" className='p-5'/>
          <div className='space-y-1'>
            {navItem.map((item,index)=>{
              const isActive = location.pathname.startsWith(item.path)
              return(
              <Link key={index} to={item.path}  className={`py-2 px-5 flex items-center gap-5 hover:bg-white hover:text-accent1 font-semibold rounded-xl ${isActive ? "text-accent1 bg-white" : "text-white"}`}>
                <Icon icon={item.icon} className='h-6 w-6'/>
                {item.name}
              </Link>
            )})}
          </div>
        </aside>
        <section className='p-4 bg-background2'>
          <Outlet/>
        </section>
      </div>
    </main>
  )
}
