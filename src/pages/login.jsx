import React, { useState } from 'react'
import { supabase } from '../lib/api'
import { useNavigate } from 'react-router-dom'

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
    <section>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="text" className="input-text" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" className="input-text" onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit" className='btn-primary'>Login</button>
      </form>
    </section>
  )
}
