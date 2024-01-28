import { Link } from "react-router-dom"
import { supabase } from "../lib/api"
import { useAuth } from "../contexts/auth-context"

export default function DetailProfile() {
    const user = useAuth()
    async function handleLogout(e) {
        e.preventDefault()
        const { error } = await supabase.auth.signOut()
        if (error) return alert(error.message)
    }
    return (
        <section className='bg-white'>
            <img src="/images/backgroundProfile.png" alt="backgroundProfile" className="w-full" />
            <div className="w-full h-48 flex flex-col justify-end p-5 absolute top-0">
                <div className="flex flex-col px-5">
                    <img src='/images/profilepicture.jpg' alt='back' width="75" className="rounded-full" />
                    <div className="flex gap-2">
                        <p className="text-lg text-white font-semibold">Hello, {user.name}</p>
                        <Link to='/profile-edit'><img src='/images/edit.png' alt='edit' width="15" /></Link>
                    </div>
                </div>
            </div>
            <div className="max-w-lg h-20 border bg-white mx-auto mt-4 p-5 ml-4 mr-4 rounded-t-lg">
                <div className="relative">
                    <img src='/images/telephone-call.png' alt="phone" width="35" className="absolute" />
                    <p className="absolute font-light text-base ml-12 -top-2">Nomor Telepon</p>
                    <p className="absolute font-bold text-base text-[#4171b9] ml-12 top-4">{user.phone}</p>
                </div>
            </div>
            <div className="max-w-lg h-20 border bg-white mx-auto p-5 ml-4 mr-4">
                <div className="relative">
                    <img src='/images/email.png' alt="phone" width="35" className="absolute" />
                    <p className="absolute font-light text-base ml-12 -top-2">Email</p>
                    <p className="absolute font-bold text-base text-[#4171b9] ml-12 top-4">{user.email}</p>
                </div>
            </div>
            <div className="max-w-lg h-20 border bg-white mx-auto p-5 ml-4 mr-4 rounded-b-lg shadow-lg hidden">
                <div className="relative">
                    <img src='/images/place.png' alt="phone" width="35" className="absolute" />
                    <p className="absolute font-light text-base ml-12 -top-2">Alamat Kediaman</p>
                    <p className="absolute font-bold text-base text-[#4171b9] ml-12 top-4">Jl. Soekarno Hatta No.12</p>
                </div>
            </div>
            <div className="w-full p-4">
                <button className="btn-danger w-full " onClick={(e)=> handleLogout(e)}>Log Out</button>
            </div>
        </section>
    )
}