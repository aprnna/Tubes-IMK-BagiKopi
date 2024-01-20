import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/api'
import { useAuth } from '../contexts/auth-context'
import { getFullDate } from '../utils/processDate'
export default function HistoryTransaction() {
  const user = useAuth()
  const [transactions, setTransactions] = useState([])
  const [detailTransaction, setDetailTransaction] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    async function getTransactions() {
      const { data } = await supabase.from('transactions').select().eq('id_user', user?.id);
      setTransactions(data)
    }
    async function getDetailTransaction() {
      const { data } = await supabase.from('orders').select().eq('id_user', user?.id);
      setDetailTransaction(data)
    }
    async function getProducts() {
      const { data } = await supabase.from("products").select();
      setProducts(data)
      setLoading(false)
    }
    getDetailTransaction()
    getTransactions()
    getProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <section>
      <header className='p-4 relative bg-blue-800 text-white shadow-md'>
        <Link to='/product-list' className='absolute hidden'><FontAwesomeIcon icon={faCircleArrowLeft} size='lg'/></Link>
        <h1 className='font-bold text-center'>Pesanan Saya</h1>  
      </header>
      <section>
        {!loading && transactions.map((transaction) => {
          const detail = detailTransaction.filter((detail) => detail.id_transaction === transaction.id)
          return (
            <div key={transaction.id} className='bg-white p-4'>
              <div className='flex justify-between items-center border-b-2 border-black py-2'>
                <div>
                  <h1>test</h1>
                  <h1>{getFullDate(transaction.created_at)}</h1>
                </div>
                <h1>{transaction.status}</h1>
              </div>
              <div className='py-4 space-y-4 mx-4'>
                {detail.map((item) => {
                  const product = products.find((product) => product.id === item.id_product)
                  return (
                    <div key={item.id} className='flex justify-between items-center border-b-2 gap-5'>
                      <div className='flex space-x-4'>
                        <img src={product.img_link} alt="img-product" className='w-16 h-16 object-cover rounded-lg'/>
                        <div>
                          <h1>{product.name}</h1>
                        </div>
                      </div>
                      <div className='min-w-fit'>
                        <h1>Rp. {item.subtotal}</h1>
                        <h1 className='text-end'>{item.quantity} Item</h1>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>
    </section>
  )
}
