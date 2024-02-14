import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/api';
import { useAuth } from '../contexts/auth-context';
import CheckoutProduct from '../components/checkoutProduct';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';

export default function Checkout() {
  const user = useAuth();
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableNumber, setTableNumber] = useState();
  const totalPrice = cart?.reduce((total, item) => total + item.subtotal, 0);

  useEffect(() => {
    async function getCart() {
      const { data } = await supabase.from("orders").select().eq('id_user', user.id).eq('oncart', true);
      setCart(data);
    }
    async function getProducts() {
      const { data } = await supabase.from("products").select();
      setProducts(data);
      setLoading(false);
    }
    getCart();
    getProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleCheckout () {
    if(!tableNumber) return toast.warn('Masukan nomor meja anda')
    navigate(`/payment/${tableNumber}`)
  }
  if (loading) return <Loading/>
  return (
    <>
      <section className='min-h-[90vh] bg-gray-100 space-y-4'>
        <header className='p-4 relative bg-accent3 text-white shadow-md'>
          <Link to='/product-list' className='absolute '><FontAwesomeIcon icon={faArrowLeft} size='lg'/></Link>
          <h1 className='font-bold text-center'>Detail Pesanan</h1>  
        </header>
        <section className='bg-white p-4 space-y-2'>
          <h1 className='font-bold text-lg'>Pesanan anda akan diantar ke</h1>
          <input type="number" className='input-text text-sm w-full' placeholder='Masukan nomor meja anda' onChange={(e)=>setTableNumber(e.target.value)}/>
        </section>
        <section className='bg-white p-4 space-y-4'>
          <div className='flex justify-between'>
            <h1 className='font-bold text-lg'>Detail Pesanan</h1>
            <Link className='btn-primary text-xs' to='/product-list'>Tambah</Link>
          </div>
          <div className='space-y-4'>
            {!loading && cart.map((item) => {
              const product = products.find((product) => product.id === item.id_product)
              return (
                <CheckoutProduct key={item.id} cart={item} product={product}/>
              )
            })}
          </div>
        </section>
        <section className='bg-white p-4'>
          <h1 className='font-bold'>Rincian Pembayaran</h1>
          <div className='flex justify-between'>
            <h1>Sub Total</h1>
            <h1>Rp. {totalPrice}</h1>
          </div>
          <div className='flex-1 border-b-2 border-dashed border-black my-2'/>
          <div className='flex justify-between'>
            <h1>Total Pembayaran</h1>
            <h1>Rp. {totalPrice}</h1>
          </div>
        </section>
      </section>
      <section className='sticky bottom-0'>
        <div className='bg-white p-4 px-8 flex justify-between items-center'>
          <h1 className='font-bold text-lg'>Rp. {totalPrice}</h1>
          <button className='btn-primary' onClick={()=>handleCheckout()}>Pilih Pembayaran</button>
        </div>
      </section>
    </>
    
  )
}

