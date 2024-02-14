import React, { useState } from 'react'
import { supabase } from '../lib/api'
import { Button } from '@tremor/react'

export default function ResetPassword() {
  const [password,setPassword] = useState({
    password:'',
    confirmPassword:''
  })
  async function handleResetPassword(e){
    e.preventDefault()
    if (password.password !== password.confirmPassword) return alert("Password doesn't match")
    const { data, error } = await supabase.auth.updateUser({ password: password.password })
    console.log(data,error)
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
      <section className="bg-white rounded-b-md shadow-md p-10 w-full max-w-md rounded-t-3xl">
        <h1 className="font-bold text-xl text-center mb-4">Register</h1>
        <form onSubmit={handleResetPassword} className="flex flex-col space-y-3">
          <input name="password" type="text" placeholder="New password" className="input-text" onChange={handleChange} required/>
          <input name="confirmPassword" type="text" placeholder="Confirm new password" className="input-text" onChange={handleChange} required/>
          <Button type="submit" className="bg-blue-500 text-white rounded-md p-2">Reset Password</Button>
        </form>
      </section>
    </div>
  )
}
