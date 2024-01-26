import React, { useState,useEffect } from 'react'
import { getDayDate } from '../../utils/processDate'
import { supabase } from '../../lib/api'
export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [searchData, setSearchData] = useState([])
  useEffect(()=>{
    async function getUsers(){
      const { data } = await supabase.from('users').select()
      setUsers(data)
      setLoading(false)
    }
    getUsers()
  },[])
  function handleSearch(e) {
    setSearch(e.target.value);
    setSearchData(users.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())));
  }
  return (
    <section className='p-4'>
      <section>
        <h1>List Users</h1>
      </section>
      <section className='flex items-center justify-between'>
        <input type="text" placeholder='Search name user' className='input-text' onChange={handleSearch}/>
      </section>
      <section className='p-4'>
        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Name
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Phone
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Email
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Terdaftar
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading && (search === ''? users?.map((user) => {
                return (
                  <tr key={user.id} className="even:bg-gray-100">
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {user.name}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {user.email}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {user.phone}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {getDayDate(user.created_at)}
                      </p>
                    </td>
                  </tr>
                )
              }):searchData?.map((user) => {
                return (
                  <tr key={user.id} className="even:bg-gray-100">
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {user.name}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {user.email}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {user.phone}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {getDayDate(user.created_at)}
                      </p>
                    </td>
                  </tr>
                )
              }))}
            </tbody>
          </table>
        </div>
      </section>
      
    </section>
  )
}
