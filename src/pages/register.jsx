import { useState } from "react";
import { supabase } from "../lib/api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  async function handleRegister(e) {
    e.preventDefault();
    if (!formData.email || !formData.fullName || !formData.phoneNumber || !formData.password || !formData.confirmPassword) return alert('Mohon isi semua data');
    if (formData.password !== formData.confirmPassword) return alert('Password tidak sama');
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) return alert(error.message);

    await supabase
      .from('users')
      .update({
        name: formData.fullName,
        phone: formData.phoneNumber,
        email: formData.email,
      })
      .eq('id', data.user.id)
      .then(() => navigate('/login'))
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
          src='/assets/logo1.jpg'
          alt="logobagi"
          className=" object-cover h-4/5"
        />
      </div>
      <section className="bg-white rounded-b-md shadow-md p-10 w-full max-w-md rounded-t-3xl">
        <h1 className="font-bold text-xl text-center mb-4">Register</h1>
        <form onSubmit={handleRegister} className="flex flex-col space-y-3">
          <input name="email" type="text" placeholder="Email" className="input-text" onChange={handleChange} required/>
          <input name="fullName" type="text" placeholder="Full Name" className="input-text" onChange={handleChange} required/>
          <input name="phoneNumber" type="text" inputmode="numeric" pattern="\d*" placeholder="Phone Number" className="input-text" onChange={handleChange} required/>
          <input name="password" type="password" placeholder="Password" className="input-text" onChange={handleChange} required/>
          <input name="confirmPassword" type="password" placeholder="Confirm Password" className="input-text" onChange={handleChange} required/>
          <button type="submit" className="btn-primary">Register</button>
        </form>
        <p className="mt-4">Sudah Memiliki Account? <Link to="/login" className="font-bold text-accent3">Login disini</Link></p>
      </section>
    </div>
  );
}
