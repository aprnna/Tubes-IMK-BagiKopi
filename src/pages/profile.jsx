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
  async function getUser() {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', user.id)
      .single()
    if (error) return alert(error.message)
    setUpdateUser({
      ...updateUser,
      name: data.name,
      age: data.age,
    })
  }
  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // async function handleLogout(e) {
  //   e.preventDefault()
  //   const { error } = await supabase.auth.signOut()
  //   if (error) return alert(error.message)
  // }
  async function handleUpdateProfile(e) {
    e.preventDefault()
    const { error } = await supabase
      .from('users')
      .update({
        name: updateUser.name,
        age: updateUser.age,
      })
      .eq('id', user.id)
    if (error) return alert(error.message)
    alert('Profile updated!')
  }

  function handleChange(e) {
    setUpdateUser({
      ...updateUser,
      [e.target.name]: e.target.value
    })
  }
  const bgPicture2 = {
    backgroundImage:
      "url(/images/profilepicture.jpg)"
  }
  return (
    <section className='space-y-4'>
      <div class="w-full h-16 bg-[#006eb9] relative top-3">
        <button>
          <img src='\images\backarrow.png' alt='back' width="40" class="absolute top-3 left-3" />
        </button>
        <p class="text-2xl top-3.5 left-40 text-[#FFFFFF] absolute">Profile Saya</p>
      </div>
      <div class="w-full h-auto relative">
        <div class="h-28 rounded-full relative w-28 bg-cover top-9 left-40" style={bgPicture2}>
          <button>
            <img src='\images\gallery.png' alt='edit' width="20" class="absolute bottom-2 right-2" />
          </button>
        </div>
        <div class="w-full h-96 mt-14 relative">
          <form onSubmit={handleUpdateProfile} className='relative'>
            <p class="ml-7 mt-4 font-light text-lg text-[#a7a7a7]">Nama</p>
            <input name='name' type='text' placeholder='Name' value={updateUser.name} onChange={handleChange} className='input-text w-96 h-auto ml-7 mt-1' />
            <p class="ml-7 mt-4 font-light text-lg text-[#a7a7a7]">Alamat</p>
            <input name='age' type='text' placeholder='Alamat' onChange={handleChange} className='input-text w-96 h-auto ml-7 mt-1' />
            <p class="ml-7 mt-4 font-light text-lg text-[#a7a7a7]">Jenis Kelamin</p>
            <input name='name' type='text' placeholder='Jenis Kelamin' onChange={handleChange} className='input-text w-96 h-auto ml-7 mt-1' />
            <p class="ml-7 mt-4 font-light text-lg text-[#a7a7a7]">Tanggal Lahir</p>
            <input name='age' type='date' placeholder='Tanggal Lahir' onChange={handleChange} className='input-text w-96 h-auto ml-7 mt-1' />
            <p class="ml-7 mt-4 font-light text-lg text-[#a7a7a7]">Nomor Handphone</p>
            <input name='name' type='text' placeholder='Nomor Handphone' onChange={handleChange} className='input-text w-96 h-auto ml-7 mt-1' />
            <button className='ml-7 mt-7 w-96 h-12 bg-[#4171b9] rounded-lg text-white font-semibold text-lg'>Simpan</button>
          </form>
        </div>
      </div>
    </section>
  )
}
