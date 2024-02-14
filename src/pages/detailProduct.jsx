import React,{ useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCircleMinus, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { supabase } from '../lib/api'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/auth-context'
import Loading from '../components/Loading'

export default function DetailProduct() {
  const navigate = useNavigate()
  const user = useAuth()
  const [product, setProduct] = useState({})
  const [cupSize, setCupSize] = useState([])
  const [selectedCupSize, setSelectedCupSize] = useState('Reguler')
  const [addPrice, setAddPrice] = useState(0)
  const [subTotal, setSubTotal] = useState(0)
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const { name, description, img_link, price }  = product
  useEffect(() => {
    async function getData() {
      const { data:products } = await supabase.from("products").select().eq('id', id).single();
      setProduct(products);
      const { data:Cupsizes } = await supabase.from("product_cup_size").select().eq('id_product', id).order('id', {ascending: false});
      setCupSize(Cupsizes);
    }
    getData().then(()=>setLoading(false))
  }, [id]);

  useEffect(() => {
    setSubTotal((price+addPrice)*qty)
  }, [price, addPrice, qty])

  function increaseQty() {
    setQty(qty+1)
  }
  function decreaseQty() {
    if(qty <= 1) return alert('Qty tidak boleh kurang dari 1')
    setQty(qty-1)
  }
  function handleSelectCupSize(cupsize, addPrice) {
    setSelectedCupSize(cupsize)
    setAddPrice(addPrice)
  }

  async function addToCart(){
    if(!user.signIn) return navigate('/login')
    const { error } = await supabase
    .from('orders')
    .insert(
      { 
        id_product: parseInt(id),
        quantity: qty,
        oncart: true,
        id_user:user.id,
        subtotal: subTotal,
        cupsize: selectedCupSize,
      }
    )
    if(error) return alert(error.message)
    alert('Berhasil ditambahkan ke keranjang')
    navigate('/product-list')
  }
  if (loading) return <Loading/>
  return (
    <>
      <section className='min-h-[85vh]'>
        <section className='h-[200px] bg-gray-300 relative'>
          <Link to={'/product-list'} className='absolute left-3 top-2'><FontAwesomeIcon icon={faCircleArrowLeft} size='lg'/></Link>
          <img src={img_link} alt="img-product" className='h-full mx-auto'/>
        </section>
        <section className='p-4'>
          <h1 className='text-lg font-bold'>{name}</h1>
          <p className='text-gray-500'>{description}</p>
        </section>
        {cupSize.length !== 0 && (
          <section className='px-4 space-y-4'>
            <h1 className='font-bold'>Pilih Ukuran</h1>
            <div className='flex gap-2'>
            {cupSize.map((cup) => {
              return(
                <button 
                  key={cup.id} 
                  className={`text-center p-4 bg-gray-200 rounded-lg hover:bg-accent3/60 ${selectedCupSize === cup.cupsize?'bg-accent3/45 hover:bg-accent3/45':''}`} 
                  onClick={()=>handleSelectCupSize(cup.cupsize,cup.price)}
                >
                  <h1 className='font-bold'>{cup.cupsize[0] === '1' ? "1L" : cup.cupsize[0]}</h1>
                  <h3 className='text-sm'>{cup.cupsize}</h3>
                  <p className='text-xs'>+ Rp. {cup.price}</p>
                </button>
              )
            })}
            </div>
          </section>
        )}
        
      </section>
      <section className='sticky bottom-0 bg-gray-100 p-4 space-y-4'>
        <div className='flex justify-between'>
          <h1 className='font-bold text-lg'>Rp. {subTotal}</h1>
          <div className='flex gap-3'>
            <button onClick={decreaseQty}><FontAwesomeIcon icon={faCircleMinus}/></button>
            <h1 className='text-lg'>{qty}</h1>
            <button onClick={increaseQty}><FontAwesomeIcon icon={faCirclePlus}/></button>
          </div>
        </div>
        <button className='btn-primary w-full' onClick={()=>addToCart()}>Tambah ke keranjang</button>
      </section>
    </>
  )
}
