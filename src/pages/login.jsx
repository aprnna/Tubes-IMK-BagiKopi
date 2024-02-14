import React, { useState } from 'react';
import { supabase } from '../lib/api';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    }).finally(()=> setLoading(false));
    if (error) return toast.error('Email atau password salah');
    toast.success('Login Berhasil');
    navigate('/');
    window.location.reload();
  }

  return (
    <section className='h-screen flex justify-center items-center flex-col space-y-4 bg-[#0077f9]'>
      <div className='flex justify-center items-center h-1/2 bg-[#0077f9]'>
        <img src='/assets/logo1.jpg' alt="logobagi" className="w-full h-full object-cover" />
      </div>
      <section className='bg-white rounded-md shadow-md p-10 pb-20 w-full max-w-md rounded-t-3xl'>
        <form onSubmit={handleLogin} className='flex flex-col space-y-3'>
          <label>
            <p>Email</p>
            <input
              type="text"
              placeholder='Example@gmail.com'
              className="input-text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              placeholder='*********'
              className="input-text"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        
          <Link to='/forget-password' className='text-accent3 text-sm text-right'>Lupa password?</Link>
          <button type="submit" className='btn-primary'>
            {loading ? 'Loading..' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center">
          Sudah memiliki akun?{' '}
          <Link to="/register" className='font-bold text-accent3'>
            Register Disini
          </Link>
        </p>
      </section>
    </section>
  );
}
