import { useState } from "react";
import { supabase } from "../lib/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    if (!formData.email || !formData.fullName || !formData.phoneNumber || !formData.password || !formData.confirmPassword) return toast.warn('Mohon isi semua data');
    if (formData.password !== formData.confirmPassword) return toast.warn('Password tidak sama');
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) return toast.error(error.message);

    await supabase
      .from('users')
      .update({
        name: formData.fullName,
        phone: formData.phoneNumber,
        email: formData.email,
      })
      .eq('id', data.user.id)
      .then(() => navigate('/login'))
      .catch(error => toast.error(error.message));
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
          className=" object-cover h-full"
        />
      </div>
      <section className="bg-white rounded-b-md shadow-md p-5 px-12 w-full max-w-md rounded-t-3xl">
        <form onSubmit={handleRegister} className="flex flex-col space-y-3">
          <label className="text-sm">
            <p>Email</p>
            <input name="email" type="text" placeholder="example@gmail.com" className="input-text" onChange={handleChange} required/>
          </label>
          <label>
            <p>Nama Panjang</p>
            <input name="fullName" type="text" placeholder="John Doe" className="input-text" onChange={handleChange} required/>
          </label>
          <label>
            <p>Nomor telpon</p>
            <input name="phoneNumber" type="text" inputmode="numeric" pattern="\d*" placeholder="08XXXXXXX" className="input-text" onChange={handleChange} required/>
          </label>
          <label>
            <p>Password</p>
            <input name="password" type="password" placeholder="*******" className="input-text" onChange={handleChange} required/>
          </label>
          <label>
            <p>Konfirmasi password</p>
            <input name="confirmPassword" type="password" placeholder="********" className="input-text" onChange={handleChange} required/>
          </label>
          <button type="submit" className="btn-primary">Register</button>
        </form>
        <p className="mt-4 text-center pb-5">Sudah Memiliki Account? <Link to="/login" className="font-bold text-accent3">Login disini</Link></p>
      </section>
    </div>
  );
}
