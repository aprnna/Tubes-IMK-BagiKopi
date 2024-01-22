import React from 'react'
import { useAuth } from '../contexts/auth-context'
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
      <div class="w-full h-56 bg-cover overflow-auto relative" style={bgBanner}>
        <button class="w-11 h-11 bg-[#32acff] rounded-full absolute top-3 right-3  hidden">
          <img src='\images\bell.png' alt='bell' width="25" class="absolute inset-0 top-2 left-2.5" />
        </button>
      </div>
      <div class="max-w-lg border bg-white rounded-xl mx-auto shadow-lg p-5 relative -top-6 mr-2 ml-2">
        <p class="font-medium text-lg">Halo {user.signIn ? user.name :''}, ingin pesan apa hari ini?</p>
      </div>
      <div class="flex">
        <div class="w-1/2 border h-28 bg-white rounded-xl mx-auto shadow-lg p-5 relative mr-2 ml-2 text-center">
          <img src='\images\creamy.png' alt='Pickup' width="50" class="absolute top-7" />
          <p class="font-medium text-xl absolute inset-0 top-10 left-3">Pickup</p>
        </div>
        <div class="w-1/2 border h-28 bg-white rounded-xl mx-auto shadow-lg p-5 relative mr-2 ml-2 text-center">
          <img src='\images\copy.png' alt='Pickup' width="50" class="absolute top-7" />
          <p class="font-medium text-xl absolute inset-0 top-10 left-5">Pesanan</p>
        </div>
      </div>
      <div class="max-w-lg h-36 rounded-xl shadow-lg mr-2 ml-2 mt-4 bg-cover" style={bgPicture1}></div>
      <div class="max-w-lg h-36 rounded-xl shadow-lg mr-2 ml-2 mt-4 bg-cover" style={bgPicture2}></div>
    </section>
  )
}
