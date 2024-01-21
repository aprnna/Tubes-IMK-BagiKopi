import React from 'react'
import { supabase } from '../lib/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
export default function CheckoutProduct({ cart, product }) {
  const { name, img_link, price } = product
  const { id:idCart, cupsize, quantity, subtotal } = cart
  async function increaseQuantity(){
    const newQuantity = quantity+1
    const { error } = await supabase.from('orders').update({ quantity: newQuantity, subtotal:subtotal*newQuantity }).eq('id', idCart)
    if(error) return alert(error.message)
    window.location.reload()
  }
  async function decreaseQuantity(){
    const newQuantity = quantity - 1
    if ( newQuantity ===  0) {
      const { error } = await supabase.from('orders').delete().eq('id', idCart)
      if(error) return alert(error.message)
    }else{
      const { error } = await supabase.from('orders').update({ quantity: newQuantity, subtotal:price*newQuantity }).eq('id', idCart)
      if(error) return alert(error.message)
    }
    window.location.reload()
  }
  return (
    <>
      <div className='flex gap-2'>
        <div className='flex-1'>
          <h1 className='font-bold'>{name}</h1>
          <p className='text-sm'>{cupsize}</p>
        </div>
        <img src={img_link} alt="img-product" className='h-20 rounded-md'/>
      </div>
      <div className='flex justify-between'>
        <h1 className='font-bold'>Rp. {subtotal}</h1>
        <div className='flex gap-4'>
          <button onClick={()=>decreaseQuantity()}><FontAwesomeIcon icon={faCircleMinus} className='text-accent1'/></button>
          <h1 className='font-bold'>{quantity}</h1>
          <button onClick={()=>increaseQuantity()}><FontAwesomeIcon icon={faCirclePlus} className='text-accent1'/></button>
        </div>
      </div>
    </>
    
  )
}
