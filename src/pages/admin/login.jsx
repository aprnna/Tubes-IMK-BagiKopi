import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/api';


export default function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true)
    const { data,error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    }).finally(()=> setLoading(false));
    if (error) return alert(error.message);
    const { data:userData } = await supabase.from('users').select().eq('id', data.user.id).single();
    console.log(userData);
    if (userData.role !== 'admin'){
      await supabase.auth.signOut();
      return alert('Anda bukan admin');
    } 
    navigate('/admin/dashboard');
    window.location.reload();
  }

  return (
    <section className='h-screen flex justify-center items-center gap-5 flex-col md:flex-row space-y-4 px-2 bg-[#0077f9]'>
      <div className='flex justify-center items-center h-1/2 bg-[#0077f9]'>
        <img src='/assets/logo1.jpg' alt="logobagi" className="w-full h-full object-cover" />
      </div>
      <section className='bg-white rounded-md shadow-md py-10 px-5 w-full max-w-md'>
        <h1 className='font-bold text-xl text-center mb-4'>Login</h1>
        <form onSubmit={handleLogin} className='flex flex-col space-y-3'>
          <input
            type="text"
            placeholder='Email'
            className="input-text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder='Password'
            className="input-text"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className='btn-primary'>
            {loading ? 'Loading..' : 'Login'}
          </button>
        </form>
      </section>
    </section>
  );
}
