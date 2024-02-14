import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/api'
import formatRupiah from '../../utils/formatRupiah'
import { AreaChart } from '@tremor/react'
import { getTimeDate } from '../../utils/processDate'
import { Icon } from '@iconify/react'
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
      data.forEach(entry => {
        entry.date = getTimeDate(entry.created_at);
    });
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

  const dataFormatter = (number) => 
    `${formatRupiah(number)}`;

  if (loading) return <h1>Loading...</h1>
  return (
    <section className='space-y-8'>
      <section>
        <h1 className='font-bold text-xl'>Dashboard</h1>
      </section>
      <section className='grid grid-cols-4 grid-rows-4 gap-5'>
        <section className='bg-white p-4 col-span-2 row-span-2'>
          <AreaChart
            className="h-80"
            data={transactionLog}
            index="date"
            categories={['total']}
            colors={['indigo']}
            valueFormatter={dataFormatter}
            yAxisWidth={80}
            onValueChange={(v) => console.log(v)}
          />
        </section>
        <section className='flex flex-col shadow-md p-5 rounded-lg bg-white'>
          <div className='flex items-center gap-2'>
            <Icon icon='material-symbols:orders-outline-rounded' className='text-white bg-accent1 rounded-md text-2xl'/>
            <h1 className='font-bold text-xl'>Total Pesanan</h1>
          </div>
          <div className='flex items-center flex-1'>
            <h1 className='font-bold text-3xl'>{orderLog?.length}</h1>
          </div>
        </section>
        <section className='flex flex-col shadow-md p-5 rounded-lg bg-white'>
          <div className='flex items-center gap-2'>
            <Icon icon='solar:money-bag-linear' className='text-white bg-accent1 rounded-md text-2xl'/>
            <h1 className='font-bold text-xl'>Total Pembeli</h1>
          </div>
          <div className='flex items-center flex-1'>
            <h1 className='font-bold text-3xl'>{transactionLog.filter((trans)=>trans.status === 'success').length}</h1>
          </div>
        </section>
        <section className='flex flex-col shadow-md p-5 rounded-lg bg-white col-span-2'>
          <div className='flex items-center gap-2'>
            <Icon icon='solar:money-bag-linear' className='text-white bg-accent1 rounded-md text-2xl'/>
            <h1 className='font-bold text-xl'>Total Pengahasilan</h1>
          </div>
          <div className='flex items-center flex-1 justify-center'>
            <h1 className='font-bold text-3xl'>{formatRupiah(totalTransaction)}</h1>
          </div>
        </section>
        <section className='flex gap-5 shadow-md w-fit p-5 rounded-lg bg-white hidden'>
          <label htmlFor="after">
            <p>After</p>
            <input type="date" name="after" defaultValue={afterDate} onChange={(e)=>setAfterDate(e.target.value)}/>
          </label>
          <label htmlFor="before">
            <p>Before</p>
            <input type="date" name="before" defaultValue={beforeDate} onChange={(e)=>setBeforeDate(e.target.value)}/>
          </label>
        </section>
        <section className='flex flex-col shadow-md p-5 rounded-lg bg-white col-span-2 row-span-2'>
          <div className='flex items-center gap-2'>
            <Icon icon='tabler:heart' className='text-white bg-accent1 rounded-md text-2xl'/>
            <h1 className='font-bold text-xl'>Menu Terlaris</h1>
          </div>
          <div className='flex flex-1 my-2'>
            <p>P</p>
          </div>
        </section>
        <section className='flex flex-col shadow-md p-5 rounded-lg bg-white col-span-2 row-span-2'>
          <div className='flex items-center gap-2'>
            <Icon icon='tabler:heart' className='text-white bg-accent1 rounded-md text-2xl'/>
            <h1 className='font-bold text-xl'>Status Pesanan</h1>
          </div>
          <div className='flex flex-1 my-2'>
            <p>P</p>
          </div>
        </section>
      </section>
    </section>
  )
}
