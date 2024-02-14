import React from 'react'
import { Outlet} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export default function LayoutDesktop() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
      <Outlet/>
    </>
  )
}
