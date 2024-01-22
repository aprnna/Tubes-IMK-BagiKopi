import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='bg-red-300 flex z-10 bottom-0 sticky'>
      <Link to='/'>Home</Link>
      <Link to='/product-list'>Menu</Link>
      <Link to='/history-transaction'>Pesanan</Link>
      <Link to='/profile'>Saya</Link>
    </nav>
  )
}
