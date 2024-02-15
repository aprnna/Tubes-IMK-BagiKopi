import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/api'
import { useAuth } from '../contexts/auth-context'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

export default function Profile() {
  const user = useAuth()
  const [updateUser, setUpdateUser] = useState({
    email: user.email,
    name: '',
    phone: '',
  })
  async function getUser() {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', user.id)
      .single()
    if (error) return toast.error(error.message)
    setUpdateUser({
      ...updateUser,
      name: data.name,
      phone: data.phone,
    })
  }
  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleUpdateProfile(e) {
    e.preventDefault()
    const { error } = await supabase
      .from('users')
      .update({
        name: updateUser.name,
        phone: updateUser.phone,
      })
      .eq('id', user.id)
    if (error) return toast.error(error.message)
    toast.success('Profile updated!')
    window.location.reload()
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
      <div className="w-full bg-[#006eb9] text-center py-4">
        <Link to='/profile'>
          <FontAwesomeIcon icon={faArrowLeft} size='lg' className='text-white absolute left-5' />
        </Link>
        <p className="text-xl text-white">Profile Saya</p>
      </div>
      <div className="w-full h-auto">
        <div className="h-28 rounded-full w-28 bg-cover mx-auto" style={bgPicture2}>
          {/* <button>
            <img src='\images\gallery.png' alt='edit' width="20" class="absolute bottom-2 right-2" />
          </button> */}
        </div>
        <div className="w-full h-96">
          <form onSubmit={handleUpdateProfile} className='w-full px-10 space-y-10'>
            <label>
              <p className="font-light text-lg text-[#a7a7a7]">Nama</p>
              <input name='name' type='text' placeholder='Name' value={updateUser.name} onChange={handleChange} className='input-text' />
            </label>
            <label>
              <p className="font-light text-lg text-[#a7a7a7]">Email</p>
              <input name='email' type='email' placeholder='Email' value={updateUser.email} disabled onChange={handleChange} className='input-text' />
            </label>
            <label>
              <p className="font-light text-lg text-[#a7a7a7]">Nomor Handphone</p>
              <input name='phone' type='text' placeholder='Nomor Handphone' value={updateUser.phone} inputMode='numeric' pattern="\d*" onChange={handleChange} className='input-text' />
            </label>
            <button className='btn-primary w-full'>Simpan</button>
          </form>
        </div>
      </div>
    </section>
  )
}
