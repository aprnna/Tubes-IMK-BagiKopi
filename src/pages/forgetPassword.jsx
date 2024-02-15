import React, { useState } from 'react'
import { supabase } from '../lib/api'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function ForgetPassword() {
  const [email,setEmail] = useState('')
  const [loading,setLoading] = useState(false)
  async function handleSubmit(e){
    e.preventDefault()
    if (!email) return toast.warn('Masukan email terlebih dahulu')
    setLoading(true)
    await toast.promise(
      supabase.auth.resetPasswordForEmail(email,{
        redirectTo: 'https://tubes-imk-bagi-kopi.vercel.app/reset-password'
      }),
      { 
        pending: 'Sedang diproses...', 
        success: 'Berhasil. Cek email Anda.', 
        error: 'Gagal. Coba lagi nanti.' 
      }
    )
    setLoading(false)
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
      <section className="bg-white rounded-b-md shadow-md p-10 w-full h-[80vh] max-w-md rounded-t-3xl space-y-5">
        <div>
          <h1 className="font-bold text-xl text-center mb-4">Lupa Password</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <label>
              <p>Masukan Email</p>
              <input name="email" type="email" placeholder="example@gmail.com" className="input-text" onChange={(e)=>setEmail(e.target.value)}/>
            </label>
            <button type="submit" className="btn-primary">{loading ? 'Loading...':'Send'}</button>
          </form>
        </div>
        <div className='flex-col hidden'>
          <div className='flex items-center justify-center'>
            <hr className='border-black w-full mx-5'/>
            <p>Atau</p>
            <hr className='border-black w-full mx-5'/>
          </div>
        </div>
        <Link className='btn-light justify-center hidden' to='/register'>Register</Link>
      </section>
    </div>
  )
}
