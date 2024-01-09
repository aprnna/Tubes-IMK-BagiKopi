import React from 'react'
import { supabase } from '../lib/api'
export default function Home() {
  async function getUser(){
    const { data: { user } } = await supabase.auth.getUser()
    console.log(user)
  }
  getUser()
  return (
    <section>
      <h1>Home</h1>
    </section>
  )
}
