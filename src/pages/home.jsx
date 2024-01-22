import React from 'react'
import { useAuth } from '../contexts/auth-context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlassWater, faFileLines } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
export default function Home() {
  const user = useAuth()
  const bgBanner = {
    backgroundImage:
      "url(/images/banner.jpg)"
  }
  const bgPicture1 = {
    backgroundImage:
      "url(/images/picture1.jpg)"
  }
  const bgPicture2 = {
    backgroundImage:
      "url(/images/picture2.jpg)"
  }
  return (
    <section className='h-[110vh] bg-white'>
      <div class="w-full h-56 bg-cover overflow-auto relative" style={bgBanner}/>
      <div class="max-w-lg border bg-white rounded-xl mx-auto shadow-lg p-5 relative -top-6 mr-2 ml-2">
        <p class="font-medium text-md">Halo {user.signIn ? user.name :''}, ingin pesan apa hari ini?</p>
      </div>
      <div class="flex gap-2 mx-2">
        <Link to='/product-list' class="border bg-white rounded-xl shadow-lg p-5 flex justify-center items-center gap-4 flex-1">
          <FontAwesomeIcon icon={faGlassWater}/>
          <p class="font-medium text-xl">Pickup</p>
        </Link>
        <Link to='/history-transactions' class="border bg-white rounded-xl shadow-lg p-5 flex justify-center items-center gap-4 flex-1">
          <FontAwesomeIcon icon={faFileLines}/>
          <p class="font-medium text-xl">Pesanan</p>
        </Link>
      </div>
      <div class="max-w-lg h-36 rounded-xl shadow-lg mr-2 ml-2 mt-4 bg-cover" style={bgPicture1}></div>
      <div class="max-w-lg h-36 rounded-xl shadow-lg mr-2 ml-2 mt-4 bg-cover" style={bgPicture2}></div>
    </section>
  )
}
