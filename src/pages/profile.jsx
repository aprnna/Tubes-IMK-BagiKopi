import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/api'

export default function Profile() {
  const [user, setUser] = useState({})
  async function getUser(){
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }
  useEffect(() => {
    getUser()
  }, [])
  async function handleLogout(e){
    e.preventDefault()
    const { error } = await supabase.auth.signOut()
    if(error) return alert(error.message)
  }
  return (
    <section>
      <h1>profile</h1>
      <h3>{user ? user.email : "Tidak ada"}</h3>
      <button onClick={handleLogout}>Log Out</button>
    </section>
    
  )
}
