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
    <div className="h-screen flex flex-col justify-center items-center  bg-[#0077f9]">
      <div className="rounded-t-md overflow-hidden w-full h-full flex justify-center items-center">
        <img
          src={logobagi}
          alt="logobagi"
          className=" object-cover h-4/5"
        />
      </div>
      <section className="bg-white rounded-b-md shadow-md p-10 w-full max-w-md rounded-t-3xl">
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
