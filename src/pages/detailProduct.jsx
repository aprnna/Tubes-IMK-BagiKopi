import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { menu } from '../utils/dummyData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import { supabase } from '../lib/api'

export default function DetailProduct() {
  const [product, setProduct] = useState({})
  const [qty, setQty] = useState(1)
  const { id } = useParams()
  const { name, description, img_path, price }  = menu[1]
  
  useEffect(()=>{
    getProduct()
  },[])
  
  async function getProduct(){
    const { data } = await supabase.from("products").select().eq('id', id);
    setProduct(data);
  }

  function increaseQty() {
    setQty(qty+1)
  }
  function decreaseQty() {
    if(qty === 1) return alert('Qty tidak boleh kurang dari 1')
    setQty(qty-1)
  }
  
  return (
    <section>
      <section className='h-[200px] bg-gray-300'>
        <img src={img_path} alt="img-product" className='h-full mx-auto'/>
      </section>
      <section className='p-4'>
        <h1 className='text-lg font-bold'>{name}</h1>
        <p className='text-gray-500'>{description}</p>
      </section>
      <section className='absolute bottom-0 bg-gray-100 w-full p-4 space-y-4'>
        <div className='flex justify-between'>
          <h1 className='font-bold text-lg'>Rp. {price}</h1>
          <div className='flex gap-3'>
            <button onClick={decreaseQty}><FontAwesomeIcon icon={faCircleMinus}/></button>
            <h1 className='text-lg'>{qty}</h1>
            <button onClick={increaseQty}><FontAwesomeIcon icon={faCirclePlus}/></button>
          </div>
        </div>
        <button className='btn-primary w-full'>Tambah ke keranjang</button>
      </section>
    </section>
    
  )
}
