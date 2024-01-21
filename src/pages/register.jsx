import { useState } from "react";
import { supabase } from "../lib/api";
import { Link } from "react-router-dom";
import logobagi from '../assets/logo1.jpg';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    confirmPassword: '',
  });

  async function handleRegister(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) return alert(error.message);

    await supabase
      .from('users')
      .update({
        name: formData.fullName,
        phoneNumber: formData.phoneNumber,
      })
      .eq('id', data.user.id)
      .then(() => alert('Profile updated!'))
      .catch(error => alert(error.message));
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center p-10">
      <div
        className="rounded-t-md overflow-hidden"
        style={{ backgroundColor: '#0077f9', width: '100%', maxHeight: '50%', position: 'relative' }}
      >
        <img
          src={logobagi}
          alt="logobagi"
          className="w-full h-full object-cover"
          style={{ backgroundColor: '#0077f9' }}
        />
      </div>

      <section
        className="bg-white rounded-b-md shadow-md p-10 w-full max-w-md"
      >
        <h1 className="font-bold text-xl text-center mb-4">Register</h1>
        <form onSubmit={handleRegister} className="flex flex-col space-y-3">
          <input name="email" type="text" placeholder="Email" className="input-text" onChange={handleChange} />
          <input name="fullName" type="text" placeholder="Full Name" className="input-text" onChange={handleChange} />
          <input name="phoneNumber" type="tel" placeholder="Phone Number" className="input-text" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" className="input-text" onChange={handleChange} />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" className="input-text" onChange={handleChange} />
          <button type="submit" className="btn-primary">Register</button>
        </form>
        <p className="mt-4">Sudah Memiliki Account? <Link to="/login" className="font-bold">Log in</Link></p>
      </section>
    </div>
  );
}
