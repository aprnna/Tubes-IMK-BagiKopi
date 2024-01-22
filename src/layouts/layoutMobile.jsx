import React from 'react'
import { Outlet } from 'react-router-dom'

export default function LayoutMobile({children}) {
  return (
    <div className='bg-gray-200 h-dvh max-h-screen'>
      <div className='max-w-md bg-white mx-auto h-screen max-h-screen overflow-y-auto relative'>
        <main>
          <Outlet/>
        </main>
      </div>
    </div>
    
  )
} 
