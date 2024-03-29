import React from 'react'
import { useAuth } from '../contexts/auth-context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMugSaucer, faFileLines } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
export default function Home() {
  const user = useAuth()
  const bgBanner = {
    backgroundImage:
      "url(/images/banner2.png)"
  }
  const bgPicture1 = {
    backgroundImage:
      "url(/images/banner3.png)"
  }
  const bgPicture2 = {
    backgroundImage:
      "url(/images/banner4.png)"
  }
  return (
    <section className='bg-white'>
      <div className="w-full h-56 bg-contain bg-no-repeat bg-[#0069DC] bg-top" style={bgBanner}/>
      <div className="max-w-lg border bg-white rounded-xl mx-auto shadow-lg p-5 relative -top-6 mr-2 ml-2">
        <p className="font-medium text-md">Halo {user.signIn ? user.name :''}, ingin pesan apa hari ini?</p>
      </div>
      <div className="flex gap-2 mx-2 h-28">
        <Link to='/product-list' className="border bg-white rounded-xl shadow-lg p-5 flex justify-center items-center gap-4 flex-1">
          <FontAwesomeIcon icon={faMugSaucer} size='xl'/>
          <p className="font-medium text-xl">Pickup</p>
        </Link>
        <Link to='/history-transaction' className="border bg-white rounded-xl shadow-lg p-5 flex justify-center items-center gap-4 flex-1">
          <FontAwesomeIcon icon={faFileLines} size='xl'/>
          <p className="font-medium text-xl">Pesanan</p>
        </Link>
      </div>
      <div className="max-w-lg h-32 rounded-xl shadow-lg mr-2 ml-2 mt-4 bg-contain bg-[#0077F9] bg-no-repeat bg-bottom" style={bgPicture1}></div>
      <div className="max-w-lg h-32 rounded-xl shadow-lg mr-2 ml-2 mt-4 bg-contain bg-[#0069DC] bg-no-repeat bg-bottom" style={bgPicture2}></div>
    </section>
  )
}
