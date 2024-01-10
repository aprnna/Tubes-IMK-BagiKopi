import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/api'
import { useAuth } from '../contexts/auth-context'

export default function Profile() {
  const user = useAuth()
  const [updateUser, setUpdateUser] = useState({
    email: user.email,
    name: '',
    age: '',
  })
  async function getUser(){
    const { data, error } = await supabase
    .from('users')
    .select()
    .eq('id', user.id)
    .single()
    if(error) return alert(error.message)
    setUpdateUser({
      ...updateUser,
      name: data.name,
      age: data.age,
    })
  }
  useEffect(() => {
    getUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  async function handleLogout(e){
    e.preventDefault()
    const { error } = await supabase.auth.signOut()
    if(error) return alert(error.message)
  }
  async function handleUpdateProfile(e){
    e.preventDefault()
    const { error }= await supabase
    .from('users')
    .update({
      name: updateUser.name,
      age: updateUser.age,
    })
    .eq('id', user.id)
    if (error) return alert(error.message)
    alert('Profile updated!')
  }

  function handleChange(e){
    setUpdateUser({
      ...updateUser,
      [e.target.name]: e.target.value
    })
  }
  return (
    <section className='p-4 space-y-4'>
      <h1 className='font-bold text-xl'>Profile</h1>
      <h3>{user ? user.email : "Tidak ada"}</h3>
      <form onSubmit={handleUpdateProfile} className='flex flex-col space-y-4'>
        <input name='email' type='text' placeholder='Email' value={updateUser.email} onChange={handleChange} className='input-text'/>
        <input name='name' type='text' placeholder='Name' value={updateUser.name} onChange={handleChange} className='input-text'/>
        <input name='age' type='number' placeholder='Age' value={updateUser.age} onChange={handleChange} className='input-text'/>
        <button className='btn-primary'>Update Profile</button>
      </form>
      <button className='btn-primary' onClick={handleLogout}>Log Out</button>
    </section>
    
  )
}
