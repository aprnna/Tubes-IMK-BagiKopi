import React, { useEffect, useState } from "react";
import { supabase } from "../lib/api";
import { useAuth } from "../contexts/auth-context";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
export function Payment() {
  const user = useAuth(); 
  const { tn } = useParams();
  const [selectedMethod, setSelectedMethod] = useState('')
  const [orders, setOrders] = useState([]);
  const totalPrice = orders?.reduce((total, item) => total + item.subtotal, 0);
  const navigate = useNavigate()
  useEffect(() => {
    async function getOrders(){
      const { data } = await supabase.from('orders').select().eq('id_user', user.id).eq('oncart', true)
      setOrders(data)
    }
    getOrders()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  async function handlePayment(){
    const { data, error:error1 } = await supabase.from('transactions').insert(
      { 
        id_user: user.id,
        status: 'success',
        total: totalPrice, 
        method: selectedMethod,
        table_number: tn
      }
    ).select().single()
    if(error1) return alert(error1.message)
    const { error:error2 } = await supabase.from('orders').update({ id_transaction:data.id,oncart: false }).eq('id_user', user.id).eq('oncart', true)
    if(error2) return alert(error2.message)
    alert('Berhasil melakukan pembayaran')
    navigate('/product-list')
  }
  return (
    <>
      <section className="min-h-screen">
        <header className="text-center p-4">
          <h4 className="text-lg font-bold py-4">Pembayaran</h4>
          <h1 className="text-2xl font-bold">Rp. {totalPrice}</h1>
        </header>
        <section className="p-4 space-y-4">
          { methodPayment.map((method) => {
            return (
              <div key={method.id} className='flex justify-between items-center'>
                <label htmlFor={method.id} className="flex items-center gap-5">
                  {method.icon ? <img src={method.icon} alt="icon-payment" className="h-12"/>: <FontAwesomeIcon icon={faSackDollar} size="2xl" className="mx-3"/>}
                  <span>{method.name}</span>
                </label> 
                <input type="radio" name="payment" id={method.id} onClick={()=>setSelectedMethod(method.name)} className="w-4 h-4 text-blue-600 bg-pink-300  focus:ring-blue-500 focus:ring-2"/>
              </div>
            )
          })}
        </section>
      </section>
      <section className="sticky bottom-0 p-4">
        <button onClick={handlePayment} className="w-full bg-blue-500 text-white py-3">Bayar</button>
      </section>
    </>
    
  );
}

const methodPayment = [
  {
    id: 1,
    name: 'Gopay',
    icon: '/assets/gopay.png'
  },
  {
    id: 2,
    name: 'OVO',
    icon: '/assets/ovo.png'
  },
  {
    id: 3,
    name: 'Dana',
    icon: '/assets/dana.png'
  },
  {
    id: 4,
    name: 'Qris',
    icon: '/assets/qris.png'
  },
  {
    id: 5,
    name: 'Shopeepay',
    icon: '/assets/shopeepay.png'
  },
  {
    id: 6,
    name: 'Bayar Ditempat',
  }
]
