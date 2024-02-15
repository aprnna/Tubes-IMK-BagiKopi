import React, { useState } from 'react'
import { supabase } from '../lib/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [password,setPassword] = useState({
    password:'',
    confirmPassword:''
  })
  async function handleResetPassword(e){
    e.preventDefault()
    if (password.password !== password.confirmPassword) return toast.error("Password tidak sama")
    const { data } = await toast.promise(
      supabase.auth.updateUser({ password: password.password }),
      {
        pending: 'Sedang diproses...',
        success: 'Berhasil. Silahkan login.',
        error: 'Gagal. Coba lagi.'
      }
    )
    if (data) return navigate('/login')
  }
  const handleChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className="h-screen flex flex-col justify-center items-center  bg-[#0077f9]">
      <div className="rounded-t-md overflow-hidden w-full h-full flex justify-center items-center">
        <img
          src='/assets/logo1.jpg'
          alt="logobagi"
          className=" object-cover h-4/5"
        />
      </div>
      <section className="bg-white rounded-b-md shadow-md p-10 w-full h-full max-w-md rounded-t-3xl">
        <form onSubmit={handleResetPassword} className="flex flex-col space-y-3">
          <label>
            <p>Password baru</p>
            <input name="password" type="password" placeholder="*******" className="input-text" onChange={handleChange} required/>
          </label>
          <label>
            <p>Konfirmasi password baru</p>
            <input name="confirmPassword" type="password" placeholder="*******" className="input-text" onChange={handleChange} required/>
          </label>
          <button type="submit" className="btn-primary">Reset Password</button>
        </form>
      </section>
    </div>
  )
}
