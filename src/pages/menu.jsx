import React, { useState, useEffect } from 'react'
import ProductItem from '../components/productItem'
import { supabase } from '../lib/api';

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getProducts();
    getCategories();
    setLoading(false);
  }, []);
  
  async function getProducts() {
    const { data } = await supabase.from("products").select().order('id_category');
    setProducts(data);
  }

  async function getCategories() {
    const { data } = await supabase.from("categories").select().order('id');
    setCategories(data);
  }

  function handleSearch(e) {
    setSearch(e.target.value);
    setSearchData(products.filter((product) => product.name_product.toLowerCase().includes(search.toLowerCase())));
  }
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <header className='p-4 space-y-4'>
        <input type="text" placeholder="Search" className="input-text w-full" onChange={handleSearch}/>
        <div>
          <div className='flex gap-3 overflow-auto py-2'>
            {categories.map((category) => {
              const categoryByAvailProduct = products.filter((product) => product.id_category === category.id);
              if(categoryByAvailProduct.length === 0) return null;
              return (
                <a key={category.id} href={`#${category.id}`} className={`border-2 rounded-2xl px-3 py-1 min-w-fit ${selectedCategory === category.id?"bg-orange-200":""}`} onClick={()=>setSelectedCategory(category.id)}>{category.name_category}</a>
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
              <h1 id={category.id} className='font-bold px-4 py-2'>{category.name_category}</h1>
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
    </>
  )
}
