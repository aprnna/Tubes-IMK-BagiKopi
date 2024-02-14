import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/api'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function CreateProduct() {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    img:'',
    price:0,
    id_category:0,
  })
  useEffect(()=>{
    async function getCategories(){
      const { data } = await supabase.from('categories').select()
      setCategories(data)
    }
    getCategories()
  },[])
  async function handleSubmit(e){
    e.preventDefault()
    const { data:uploadfile, error } = await supabase.storage.from('product').upload(`upload/${formData.name}`, formData.img)
    if (error) return toast.error(error.message)
    const { data } = await supabase.storage.from('product').getPublicUrl(`${uploadfile.path}`)
    const {error:productError} = await supabase.from('products').insert({
      name: formData.name,
      description: formData.description,
      img_link: data.publicUrl,
      price: formData.price,
      id_category: formData.id_category,
    })
    if (productError) return toast.error(productError.message)
    toast.success('Produk berhasil ditambahkan')
    navigate('/admin/products') 
  }

  function handleChange(name,value){
    setFormData({
      ...formData,
      [name]: value
    })
  }
  return (
    <section className='space-y-5 w-full'>
      <section>
        <h1 className='text-2xl font-bold'>Tambah Produk</h1>
      </section>
      <form onSubmit={handleSubmit} className='flex flex-col w-full p-8 rounded-xl space-y-4 bg-white'>
        <label htmlFor="name-product">
          <p>Name Product</p>
          <input 
          name='name' 
          id='name-product' 
          type="text" 
          placeholder='Masukan name Produk' 
          className='input-text' 
          onChange={(e)=>handleChange('name',e.target.value)}
          required
        />
        </label>
        <label htmlFor="description">
          <p>Deskripsi</p>
          <textarea 
            name="description" 
            id="description-product" 
            cols="30" 
            rows="10" 
            placeholder='Masukan descripsi' 
            className='input-text'
            onChange={(e)=>handleChange('description',e.target.value)}
            required
          />
        </label>
        <label htmlFor="category-product">
          <p>Category Product</p>
          <select 
            name="category" 
            id="category-product" 
            className='input-text hover:bg-transparent'
            onChange={(e)=>handleChange('id_category',e.target.value)}
            required
          >
            <option value="">Pilih kategori yang tersedia</option>
            {categories.map((category)=>{
              return (
                <option key={category.id} value={category.id}>{category.name}</option>
              )
            })}
          </select>
        </label>
        <label htmlFor="img-product">
          <p>Image Product</p>
          <input 
            type="file" 
            name="img" 
            id="img-product" 
            className='input-text'
            onChange={(e)=>handleChange('img',e.target.files[0])}
            required
          /> 
        </label>
        <label htmlFor="price-product">
          <p>Harga Produk</p>
          <input 
            type="number" 
            name="price" 
            id="price-product" 
            placeholder='Price' 
            className='input-text'
            onChange={(e)=>handleChange('price',e.target.value)}
            required
          />
        </label>
        <div className='flex gap-3 justify-end'>
          <Link to='/admin/products' className='btn-light w-fit'>Cancel</Link>
          <button type='submit' className='btn-primary w-fit'>Save Produk</button>
        </div>
      </form>
    </section>
  )
}
