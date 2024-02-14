import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/api'
import formatRupiah from '../../utils/formatRupiah'
export default function Dashboard() {
  const [beforeDate, setBeforeDate] = useState('2024-01-30')
  const [afterDate, setAfterDate] = useState('2024-01-01')
  const [transactionLog, setTransactionLog] = useState([])
  const [orderLog, setOrderLog] = useState([])
  const [loading,setLoading] = useState(true)
  const totalTransaction = transactionLog?.reduce((total, item) => total + item.total, 0);

  useEffect(() => {
    async function getTransactionLog(){
      const { data } = await supabase.from('transactions').select().gte('created_at', afterDate).lte('created_at', beforeDate)
      setTransactionLog(data)
    }
    async function getOderLog(){
      const { data } = await supabase.from('orders').select().eq('oncart', false).gte('created_at', afterDate).lte('created_at', beforeDate)
      setOrderLog(data)
      setLoading(false)
    }
    getTransactionLog()
    getOderLog()
  },[afterDate, beforeDate])
  if (loading) return <h1>Loading...</h1>
  return (
    <section className='p-5'>
      <section>
        
      </section>
      <section className='flex gap-5 shadow-md w-fit p-5 rounded-lg'>
        <label htmlFor="after">
          <p>After</p>
          <input type="date" name="after" defaultValue={afterDate} onChange={(e)=>setAfterDate(e.target.value)}/>
        </label>
        <label htmlFor="before">
          <p>Before</p>
          <input type="date" name="before" defaultValue={beforeDate} onChange={(e)=>setBeforeDate(e.target.value)}/>
        </label>
      </section>
      <section className='flex gap-5'>
        <div className='shadow-md w-fit p-5 rounded-lg'>
          <h1 className='font-bold text-lg'>Total Uang yang didapat:</h1>
          <h1 className='text-green-500 font-bold'>{formatRupiah(totalTransaction)}</h1>
        </div>
        <div className='shadow-md w-fit p-5 rounded-lg'>
          <h1 className='font-bold text-lg'>Total Order: </h1>
          <h1 className='font-bold'>{orderLog?.length}</h1>
        </div>
      </section>
    </section>
  )
}
