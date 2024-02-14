import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
export default function LayoutMobile() {
  return (
    <div className='bg-gray-200 h-dvh max-h-dvh'>
      <div className='max-w-md bg-white mx-auto h-dvh max-h-dvh overflow-y-auto relative'>
        <main>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
          />
          <Outlet/>
        </main>
      </div>
    </div>
    
  )
} 
