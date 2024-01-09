import { useState } from "react"
import { supabase } from "../lib/api"
export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function handleRegister(e){
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    console.log(data,error)
  }
  return (
    <section>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input type="text" className="input-text" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" className="input-text" onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit" className='btn-primary'>Login</button>
      </form>
    </section>
  )
}
