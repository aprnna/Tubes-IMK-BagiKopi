import React, { useState } from 'react'
import { supabase } from '../lib/api'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  
  async function handleLogin(e){
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    if(error) return alert(error.message)
    return navigate('/')
  }
    
  return (
    <section className='h-screen flex justify-center flex-col space-y-4 p-10'>
      <h1 className='font-bold text-xl text-center'>Login</h1>
      <form onSubmit={handleLogin} className='flex flex-col space-y-3 w-full'>
        <input type="text" placeholder='Email' className="input-text" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder='Password' className="input-text" onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit" className='btn-primary'>Login</button>
      </form>
      <p>Don't have an account? <Link to="/register" className='font-bold'>Sign Up</Link></p>
    </section>
  )
}
