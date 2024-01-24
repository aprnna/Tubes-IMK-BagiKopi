import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'

export default function Layout() {
  return (
    <div>
      <div className='min-h-dvh'>
        <Outlet/>
      </div>
      <Navbar/>
    </div>
  )
}
