import React from 'react'
import { Outlet } from 'react-router-dom'

export default function LayoutMobile() {
  return (
    <div className='bg-gray-200 h-dvh max-h-dvh'>
      <div className='max-w-md bg-white mx-auto h-dvh max-h-dvh overflow-y-auto relative'>
        <main>
          <Outlet/>
        </main>
      </div>
    </div>
    
  )
} 
