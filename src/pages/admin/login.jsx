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
    if (error) return alert('Email atau password salah');
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
    <section className='h-screen w-screen grid grid-cols-1 md:grid-cols-2 '>
      <div className=' bg-background order-2 flex justify-center items-center'>
        <img src='/assets/logo1.png' alt="logobagi" className="justify-self-center h-[40%]" />
      </div>
      <section className='bg-white rounded-md shadow-md py-10 px-5 w-full order-1 flex items-center justify-center'>
        <div className='w-full max-w-md space-y-3'>
          <img src="/assets/MiniLogo2.png" alt="logo" className='h-[40px]'/>
          <h1 className='font-bold text-2xl'>Selamat Datang di Bagi Kopi</h1>
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
        </div>
      </section>
    </section>
  );
}
