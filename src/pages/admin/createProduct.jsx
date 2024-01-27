import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/api'
import { useNavigate } from 'react-router-dom'

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
    if (error) return alert(error.message)
    const { data } = await supabase.storage.from('product').getPublicUrl(`${uploadfile.path}`)
    const {error:productError} = await supabase.from('products').insert({
      name: formData.name,
      description: formData.description,
      img_link: data.publicUrl,
      price: formData.price,
      id_category: formData.id_category,
    })
    if (productError) return alert(productError.message)
    alert('Product berhasil ditambahkan')
    navigate('/admin/products') 
  }

  function handleChange(name,value){
    setFormData({
      ...formData,
      [name]: value
    })
  }
  return (
    <section>
      <form onSubmit={handleSubmit} className='flex flex-col max-w-96 mx-auto space-y-2'>
        <label htmlFor="name-product">
          <p>Name Product</p>
          <input 
          name='name' 
          id='name-product' 
          type="text" 
          placeholder='Name Product' 
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
            placeholder='Description' 
            onChange={(e)=>handleChange('description',e.target.value)}
            required
          />
        </label>
        <label htmlFor="price-product">
          <p>Price Product</p>
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
        <label htmlFor="category-product">
          <p>Category Product</p>
          <select 
            name="category" 
            id="category-product" 
            onChange={(e)=>handleChange('id_category',e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category)=>{
              return (
                <option key={category.id} value={category.id}>{category.name}</option>
              )
            })}
          </select>
        </label>
        <label htmlFor="img-product">Image Product</label>
        <input 
          type="file" 
          name="img" 
          id="img-product" 
          onChange={(e)=>handleChange('img',e.target.files[0])}
          required
        /> 
        <button className='btn-primary'>Submit</button>
      </form>
    </section>
  )
}
