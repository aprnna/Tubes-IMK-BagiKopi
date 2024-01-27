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
    <section>
      <label htmlFor="after">
        <p>After</p>
        <input type="date" name="after" defaultValue={afterDate} onChange={(e)=>setAfterDate(e.target.value)}/>
      </label>
      <label htmlFor="before">
        <p>Before</p>
        <input type="date" name="before" defaultValue={beforeDate} onChange={(e)=>setBeforeDate(e.target.value)}/>
      </label>
      <section>Total Uang yang didapat: {formatRupiah(totalTransaction)}</section>
      <section>Total Order: {orderLog?.length}</section>
    </section>
  )
}
