import React, { useState } from 'react'
import { supabase } from '../lib/api'
import { Button } from '@tremor/react'

export default function ForgetPassword() {
  const [email,setEmail] = useState('')
  const [loading,setLoading] = useState(false)
  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    const { data, error } = await supabase.auth.resetPasswordForEmail(email,{
      redirectTo: 'http://localhost:3000/reset-password'
    }).then(()=>setLoading(false))
    console.log(data,error)
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
      <section className="bg-white rounded-b-md shadow-md p-10 w-full max-w-md rounded-t-3xl">
        <h1 className="font-bold text-xl text-center mb-4">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input name="email" type="text" placeholder="Email" className="input-text" onChange={(e)=>setEmail(e.target.value)} required/>
          <Button type="submit" className="bg-blue-500 text-white rounded-md p-2">{loading ? 'Loading...':'Reset Password'}</Button>
        </form>
      </section>
    </div>
  )
}
