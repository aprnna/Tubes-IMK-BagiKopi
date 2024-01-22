import { Link } from "react-router-dom"
import { supabase } from "../lib/api"

export default function DetailProfile() {
    async function handleLogout(e) {
        e.preventDefault()
        const { error } = await supabase.auth.signOut()
        if (error) return alert(error.message)
    }
    return (
        <section class='bg-white'>
            <div class="w-full h-48 bg-[#006eb9] relative">
                <button><img src='\images\backarrow.png' alt='back' width="35" class="absolute ml-4 -mt-2" /></button>
                <img src='\images\profilepicture.jpg' alt='back' width="75" class="absolute rounded-full ml-14 mt-8" />
                <p class="absolute text-lg text-white font-semibold ml-14 mt-28">Hello, Apriana</p>
                <Link to='/profile-edit'><img src='\images\edit.png' alt='edit' width="15" class="absolute ml-[180px] mt-[125px]" /></Link>
            </div>
            <div class="max-w-lg h-20 border bg-white mx-auto mt-4 p-5 ml-4 mr-4 rounded-t-lg">
                <div class="relative">
                    <img src='\images\telephone-call.png' alt="phone" width="35" class="absolute" />
                    <p class="absolute font-light text-base ml-12 -top-2">Nomor Telepon</p>
                    <p class="absolute font-bold text-base text-[#4171b9] ml-12 top-4">+62 87652 6523 46</p>
                </div>
            </div>
            <div class="max-w-lg h-20 border bg-white mx-auto p-5 ml-4 mr-4">
                <div class="relative">
                    <img src='\images\email.png' alt="phone" width="35" class="absolute" />
                    <p class="absolute font-light text-base ml-12 -top-2">Email</p>
                    <p class="absolute font-bold text-base text-[#4171b9] ml-12 top-4">putyouremail@gmail.com</p>
                </div>
            </div>
            <div class="max-w-lg h-20 border bg-white mx-auto p-5 ml-4 mr-4 rounded-b-lg shadow-lg">
                <div class="relative">
                    <img src='\images\place.png' alt="phone" width="35" class="absolute" />
                    <p class="absolute font-light text-base ml-12 -top-2">Alamat Kediaman</p>
                    <p class="absolute font-bold text-base text-[#4171b9] ml-12 top-4">Jl. Soekarno Hatta No.12</p>
                </div>
            </div>
            <div class="w-full p-4">
                <button class="h-12 w-full bg-[#c93827] mt-4 rounded-xl text-white text-lg font-bold" onClick={(e)=> handleLogout(e)}>Log Out</button>
            </div>
        </section>
    )
}