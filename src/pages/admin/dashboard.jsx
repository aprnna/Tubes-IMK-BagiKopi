import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/api'
import formatRupiah from '../../utils/formatRupiah'

export default function Dashboard() {
  const [date, setDate] = useState(new Date())
  const [transactionLog, setTransactionLog] = useState([])
  const [orderLog, setOrderLog] = useState([])
  const [loading,setLoading] = useState(true)
  const totalTransaction = transactionLog?.reduce((total, item) => total + item.total, 0);

  useEffect(() => {
    async function getTransactionLog(){
      const { data } = await supabase.from('transactions').select()
      setTransactionLog(data)
      setLoading(false)
    }
    async function getOderLog(){
      const { data } = await supabase.from('orders').select().eq('oncart', false)
      setOrderLog(data)
    }
    getTransactionLog()
    getOderLog()
  },[])
  console.log(date)
  if (loading) return <h1>Loading...</h1>
  return (
    <section>
      <input type="date" name="" id="" onChange={(e)=>setDate(new Date(e.target.value))}/>
      <section>Total Uang yang didapat: {formatRupiah(totalTransaction)}</section>
      <section>Total Order: {orderLog.length}</section>
    </section>
  )
}
