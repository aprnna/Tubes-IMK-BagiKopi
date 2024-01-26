import React,{ useEffect, useState } from 'react'
import { supabase } from '../../lib/api'
import { TruncateText } from '../../utils/truncateText'
import formatRupiah from '../../utils/formatRupiah'
import { getDayDate } from '../../utils/processDate'
import { Link } from 'react-router-dom'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [searchData, setSearchData] = useState([])
  useEffect(()=>{
    async function getProducts(){
      const { data } = await supabase.from('products').select()
      setProducts(data)
      setLoading(false)
    }
    getProducts()
  },[])
  function handleSearch(e) {
    setSearch(e.target.value);
    setSearchData(products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())));
  }
  return (
    <section className='p-4'>
      <section>
        <h1>List Product</h1>
      </section>
      <section className='flex items-center justify-between'>
        <input type="text" placeholder='Search name produk' className='input-text' onChange={handleSearch}/>
        <div>
          <Link className='btn-primary' to='create'>Tambah Product</Link>
        </div>
      </section>
      <section className='p-4'>
        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Name
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Deskripsi
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Harga
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Dibuat
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Action
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading && (search === ''? products?.map((product) => {
                return (
                  <tr key={product.id} className="even:bg-gray-100">
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {product.name}
                      </p>
                    </td>
                    <td className="p-4 max-w-md">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {TruncateText(product.description)}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {formatRupiah(product.price)}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {getDayDate(product.created_at)}
                      </p>
                    </td>
                    <td className="p-4">
                      <Link to={`${product.id}`} className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">Edit</Link>
                      <Link className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">Delete</Link>
                    </td>
                  </tr>
                )
              }):searchData?.map((product) => {
                return (
                  <tr key={product.id} className="even:bg-gray-100">
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {product.name}
                      </p>
                    </td>
                    <td className="p-4 max-w-md">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {TruncateText(product.description)}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {formatRupiah(product.price)}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {getDayDate(product.created_at)}
                      </p>
                    </td>
                  </tr>
                )
              }))}
            </tbody>
          </table>
        </div>
      </section>
      
    </section>
  )
}
