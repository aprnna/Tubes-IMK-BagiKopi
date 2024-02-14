import React from 'react'
import { PuffLoader } from 'react-spinners'
export default function Loading() {
  return (
    <div className='h-screen flex justify-center items-center'>
      <PuffLoader color='#006EB9'/>
    </div>
  )
}
