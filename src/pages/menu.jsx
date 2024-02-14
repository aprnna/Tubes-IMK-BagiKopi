import React, { useState, useEffect } from 'react'
import ProductItem from '../components/productItem'
import { supabase } from '../lib/api';
import { Link } from 'react-router-dom';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../contexts/auth-context';
import Loading from '../components/Loading';
export default function Menu() {
  const user = useAuth()
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // [
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const totalPrice = cart?.reduce((total, item) => total + item.subtotal, 0);
  useEffect(() => {
    async function getData() {
      const { data:products } = await supabase.from("products").select().order('id_category');
      setProducts(products);
      const { data:categories } = await supabase.from("categories").select().order('id');
      setCategories(categories);
      const { data:cart } = await supabase.from("orders").select().eq('id_user', user?.id).eq('oncart', true);
      setCart(cart);
    }
    getData().then(()=>setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  function handleSearch(e) {
    setSearch(e.target.value);
    setSearchData(products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())));
  }

  if (loading) return <Loading/>
  return (
    <>
      <section className='min-h-[90vh]'>
        <header className='p-4 space-y-4'>
          <input type="text" placeholder="Search" className="input-text w-full" onChange={handleSearch}/>
          <div>
            <div className='flex gap-3 overflow-auto py-2'>
              {categories.map((category) => {
                const categoryByAvailProduct = products.filter((product) => product.id_category === category.id);
                if(categoryByAvailProduct.length === 0) return null;
                return (
                  <a 
                    key={category.id} 
                    href={`#${category.id}`} 
                    className={`border-2 rounded-2xl px-3 py-1 min-w-fit ${selectedCategory === category.id?"bg-accent3 text-white":""}`} 
                    onClick={()=>setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </a>
                )
              })} 
            </div>
          </div>
        </header>
        <section>
          {search === ''? categories.map((category) => {
            const productsByCategory = products.filter((product) => product.id_category === category.id);
            if(productsByCategory.length === 0) return null;
            return (
              <section key={category.id}>
                <h1 id={category.id} className='font-bold px-4 py-2'>{category.name}</h1>
                {productsByCategory.map((product) => {
                  return (
                    <ProductItem key={product.id} product={product}/>
                  )
                })}
              </section>
            )
          }):
          <div>
            {searchData.map((product) => {
              return (
                <ProductItem key={product.id} product={product}/>
              )
            })}
          </div>
          }
        </section>
      </section>
      <section className='bg-white sticky bottom-14'>
        {cart && cart.length !== 0 && (
          <div className=' p-4 px-5 flex justify-between items-center'>
            <div className='flex gap-4'>
              <h1 className='font-bold'><FontAwesomeIcon icon={faCartShopping}/></h1>
              <h1 className='font-bold'>Rp. {totalPrice}</h1>
            </div>
            <Link className='btn-primary' to='/checkout'>Checkout</Link>
          </div>
        )}
      </section>
    </>
  )
}
