import React,{ useEffect, useState } from 'react'
import { supabase } from '../../lib/api'
import { TruncateText } from '../../utils/truncateText'
import formatRupiah from '../../utils/formatRupiah'
import { getDayDate } from '../../utils/processDate'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [searchData, setSearchData] = useState([])
  useEffect(()=>{
    async function getProducts(){
      const { data } = await supabase.from('products').select().order('created_at',{ascending:false})
      setProducts(data)
    }
    async function getCategories(){
      const { data } = await supabase.from('categories').select()
      setCategories(data)
      setLoading(false)
    }
    getProducts()
    getCategories()
  },[])
  function handleSearch(e) {
    setSearch(e.target.value);
    setSearchData(products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())));
  }
  async function handleDelete(id){
    const { error } = await supabase.from('products').delete().eq('id',id)
    if (error) return toast.error(error.message)
    toast.success('Product berhasil dihapus')
    window.location.reload()
  }


  const columns = ['Name', 'Category', 'Deskripsi', 'Harga', 'Dibuat', 'Action']
  return (
    <section className='space-y-3'>
      <section>
        <h1 className='font-bold text-2xl'>Menu</h1>
      </section>
      <section className='flex items-center justify-end gap-2'>
        <input type="text" placeholder='Search name produk' className='input-text text-sm' onChange={handleSearch}/>
        <Link className='btn-primary text-sm w-full max-w-fit' to='create'>Tambah Produk</Link>
      </section>
      <section className='p-4'>
        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
          <table className="w-full text-left table-auto min-w-max">
            <thead className=' '>
              <tr>
                {columns.map((column,index)=>(
                  <th key={index} className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 ">
                      {column}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!loading && (search === ''? products?.map((product) => {
                const category = categories.find((category) => category.id === product.id_category)
                return (
                  <tr key={product.id} className="even:bg-gray-100">
                    <td className="p-4 max-w-md">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {product.name}
                      </p>
                    </td>
                    <td className="p-4 ">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {category?.name}
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
                      <Link to={`edit/${product.id}`} className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 text-accent1 underline">Edit</Link>
                      <button onClick={()=>handleDelete(product.id)} className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 text-accent4 underline">Delete</button>
                    </td>
                  </tr>
                )
              }):searchData?.map((product) => {
                const category = categories.find((category) => category.id === product.id_category)
                return (
                  <tr key={product.id} className="even:bg-gray-100">
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {product.name}
                      </p>
                    </td>
                    <td className="p-4 ">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {category?.name}
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
                      <Link to={`edit/${product.id}`} className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">Edit</Link>
                      <button onClick={()=>handleDelete(product.id)} className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">Delete</button>
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
