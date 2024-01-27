import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/api'

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

  async function handleSubmit(e){
    e.preventDefault()
    if (updatedProduct.img === undefined){
      const { error } = await supabase.from('products').update({
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price,
        id_category: updatedProduct.id_category,
      }).eq('id',id)
      if (error) return alert(error.message)
      alert('Product berhasil diupdate')
      return
    }
    const { data:uploadfile, error } = await supabase.storage.from('product').upload(`upload/${updatedProduct.name}`, updatedProduct.img)
    if (error) return alert(error.message)
    const { data } = await supabase.storage.from('product').getPublicUrl(`${uploadfile.path}`)
    const { error:errorUpdate } = await supabase.from('products').update({
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      id_category: updatedProduct.id_category,
      img_link: data.publicUrl,
    }).eq('id',id)
    if (errorUpdate) return alert(error.message)
    alert('Product berhasil diupdate')
    navigate('/admin/products')
  }
  if(loading) return <div>Loading...</div>
  return (
    <section>
      <form onSubmit={handleSubmit} className='flex flex-col max-w-96 mx-auto space-y-2'>
        <label htmlFor="name-product">Name Product</label>
        <input 
          name='name' 
          id='name-product' 
          type="text" 
          placeholder='Name Product' 
          className='input-text' 
          defaultValue={updatedProduct?.name}
          onChange={(e)=>handleChange('name',e.target.value)}
        />
        <label htmlFor="description">Deskripsi</label>
        <textarea 
          name="description" 
          id="description-product" 
          cols="30" 
          rows="10" 
          placeholder='Description' 
          defaultValue={updatedProduct?.description}
          onChange={(e)=>handleChange('description',e.target.value)}
        />
        <label htmlFor="price-product">Price Product</label>
        <input 
          type="number" 
          name="price" 
          id="price-product" 
          placeholder='Price'
          defaultValue={updatedProduct?.price} 
          className='input-text'
          onChange={(e)=>handleChange('price',e.target.value)}
        />
        <label htmlFor="category-product">Category Product</label>
        <select 
          name="category" 
          id="category-product" 
          onChange={(e)=>handleChange('id_category',e.target.value)}
          defaultValue={updatedProduct?.id_category}
        >
          <option value="">Select Category</option>
          {categories.map((category)=>{
            return (
              <option key={category.id} value={category.id}>{category.name}</option>
            )
          })}
        </select>
        <label htmlFor="img-product">Image Product</label>
        <input 
          type="file" 
          name="img" 
          id="img-product" 
          onChange={(e)=>handleChange('img',e.target.files[0])}
        /> 
        <button className='btn-primary'>Update</button>
      </form>
    </section>
  )
}
