import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/api'
import { toast } from 'react-toastify'

export default function EditProduct() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState({})
  const [updatedProduct, setUpdatedProduct] = useState({})
  const navigate = useNavigate()
  useEffect(()=>{
    async function getProduct(){
      const { data } = await supabase.from('products').select('name,description,id_category,price').eq('id',id).single()
      setUpdatedProduct(data)
    }
    async function getCategory(){
      const { data } = await supabase.from('categories').select()
      setCategories(data)
      setLoading(false)
    }
    getProduct()
    getCategory()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  function handleChange(name,value){
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value
    })
  }
  console.log(updatedProduct)
  async function handleSubmit(e){
    e.preventDefault()
    if (updatedProduct.img === undefined){
      const { error } = await supabase.from('products').update({
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price,
        id_category: updatedProduct.id_category,
      }).eq('id',id)
      if (error) return toast.error(error.message)
      toast.success('Produk berhasil diupdate')
      return
    }
    const { data:uploadfile, error } = await supabase.storage.from('product').upload(`upload/${updatedProduct.name}`, updatedProduct.img)
    if (error) return toast.error(error.message)
    const { data } = await supabase.storage.from('product').getPublicUrl(`${uploadfile.path}`)
    const { error:errorUpdate } = await supabase.from('products').update({
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      id_category: updatedProduct.id_category,
      img_link: data.publicUrl,
    }).eq('id',id)
    if (errorUpdate) return toast.error(error.message)
    toast.success('Product berhasil diupdate')
    navigate('/admin/products')
  }
  if(loading) return <div>Loading...</div>
  return (
    <section className='space-y-5'>
      <section>
        <h1 className='text-xl font-bold'>Edit Produk</h1>
      </section>
      <form onSubmit={handleSubmit} className='flex flex-col max-w-96 space-y-5'>
        <label htmlFor="name-product">
          <p>Name Product</p>
          <input 
            name='name' 
            id='name-product' 
            type="text" 
            placeholder='Name Product' 
            className='input-text' 
            defaultValue={updatedProduct?.name}
            onChange={(e)=>handleChange('name',e.target.value)}
          />
        </label>
        <label htmlFor="description">
          <p>Deskripsi</p>
          <textarea 
            name="description" 
            id="description-product" 
            cols="30" 
            rows="10" 
            className='input-text' 
            placeholder='Description' 
            defaultValue={updatedProduct?.description}
            onChange={(e)=>handleChange('description',e.target.value)}
          />
        </label>
        <label htmlFor="price-product">
          <p>Price Product</p>
          <input 
            type="number" 
            name="price" 
            id="price-product" 
            placeholder='Price'
            defaultValue={updatedProduct?.price} 
            className='input-text'
            onChange={(e)=>handleChange('price',e.target.value)}
          />
        </label>
        <label htmlFor="category-product">
          <p>Category Product</p>
          <select 
            name="category" 
            id="category-product" 
            className='input-text' 
            onChange={(e)=>handleChange('id_category',e.target.value)}
            defaultValue={updatedProduct.id_category}
          >
            <option value="">Select Category</option>
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
          /> 
        </label>
        <button className='btn-primary'>Update</button>
      </form>
    </section>
  )
}
