import { useState } from "react"
import { supabase } from "../lib/api"
import { Link } from "react-router-dom"

export default function Register() {
  const [formData, setFormData] = useState({
    email:'',
    password:'',
    name:'',
    age:0,
  })

  async function handleRegister(e){
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })
    if(error) return alert(error.message)
    await supabase
    .from('users')
    .update({
      name: formData.name,
      age: formData.age,
    })
    .eq('id', data.user.id)
    .then(() => alert('Profile updated!'))
    .catch(error => alert(error.message))
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  return (
    <section className='h-screen flex justify-center flex-col space-y-4 p-10'>
      <h1 className='font-bold text-xl text-center'>Register</h1>
      <form onSubmit={handleRegister} className='flex flex-col space-y-3 w-full'>
        <input name="email" type="text" placeholder="Email" className="input-text" onChange={handleChange} />
        <input name="name" type="text" placeholder="Name" className="input-text" onChange={handleChange} />
        <input name="age" type="number" placeholder="Age" className="input-text" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="input-text" onChange={handleChange} />
        <button type="submit" className='btn-primary'>Register</button>
      </form>
      <p>Already have an account? <Link to="/login" className="font-bold">Sign in</Link></p>
    </section>
  )
}
