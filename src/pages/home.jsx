import React from 'react'
import { supabase } from '../lib/api'
export default function Home() {
  async function getUser(){
    const { data: { user } } = await supabase.auth.getUser()
    // console.log(user)
  }
  getUser()
  return (
    <section className='h-[110vh] bg-white'>
      <h1 className='text-center'>Home</h1>
    </section>
  )
}
