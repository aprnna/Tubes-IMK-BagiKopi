import React, { useState } from 'react';
import { supabase } from '../lib/api';
import { useNavigate, Link } from 'react-router-dom';
import logobagi from '../assets/logo1.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) return alert(error.message);
    return navigate('/');
  }

  return (
    <section
      className='h-screen flex justify-center items-center flex-col space-y-4 p-10'
      style={{ backgroundColor: '#0077f9', margin: 0 }}
    >
      <div
        className='flex justify-center items-center h-1/2'
        style={{
          backgroundColor: '#0077f9',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '10px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <img src={logobagi} alt="logobagi" className="w-full h-full object-cover" />
      </div>

      <section
        className='bg-white rounded-md shadow-md p-10 w-full max-w-md'
        style={{ borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}
      >
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
            Login
          </button>
        </form>
        <p className="mt-4">
          Sudah memiliki akun?{' '}
          <Link to="/register" className='font-bold'>
            Register Disini
          </Link>
        </p>
      </section>
    </section>
  );
}
