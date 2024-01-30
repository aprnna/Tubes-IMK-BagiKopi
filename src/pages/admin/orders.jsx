import React, { useState,useEffect } from 'react'
import { getDayDate } from '../../utils/processDate'
import { supabase } from '../../lib/api'
import formatRupiah from '../../utils/formatRupiah'

export default function Orders() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [searchData, setSearchData] = useState([])
  useEffect(()=>{
    async function getTransactions(){
      const { data } = await supabase.from('transactions').select('*,users(name)').order('created_at',{ascending:false})
      setTransactions(data)
      setLoading(false)
    }
    getTransactions()
  },[])
  function handleSearch(e) {
    setSearch(e.target.value);
    setSearchData(transactions.filter((transaction) => transaction.users.name.toLowerCase().includes(search.toLowerCase())));
    console.log(searchData)
  }
  const columns = ['OrderID', 'Tanggal', 'Nama Pembeli', 'Total Pembelian','Status']
  return (
    <section className='p-4 space-y-5'>
      <section>
        <h1 className='font-bold text-xl'>List Users</h1>
      </section>
      <section className='flex items-center justify-end'>
        <input type="text" placeholder='Search name user' className='input-text' onChange={handleSearch}/>
      </section>
      <section className='p-4'>
        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                {columns.map((column,index)=>(
                  <th key={index} className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 ">
                      {column}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!loading && (search === ''? transactions?.map((transaction) => {
                let isCanceled = false
                if (transaction.status ==='canceled') {
                  isCanceled = true
                }
                return (
                  <tr key={transaction.id} className="even:bg-gray-100">
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        # {transaction.id}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {getDayDate(transaction.created_at)}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {transaction.users.name}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {formatRupiah(transaction.total)}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className={`block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 p-2 px-4 w-fit rounded-md ${isCanceled?'bg-red-300':'bg-green-300'}`}>
                        {isCanceled ? 'Pesanan Gagal':'Pesanan Berhasil'}
                      </p>
                    </td>
                  </tr>
                )
              }):searchData?.map((transaction) => {
                let isCanceled = false
                if (transaction.status ==='canceled') {
                  isCanceled = true
                }
                return (
                  <tr key={transaction.id} className="even:bg-gray-100">
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        # {transaction.id}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {getDayDate(transaction.created_at)}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {transaction.users.name}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {formatRupiah(transaction.total)}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className={`block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 p-2 px-4 w-fit rounded-md ${isCanceled?'bg-red-300':'bg-green-300'}`}>
                        {isCanceled ? 'Pesanan Gagal':'Pesanan Berhasil'}
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
