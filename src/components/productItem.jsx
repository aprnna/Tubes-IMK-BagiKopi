import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { TruncateText } from '../utils/truncateText'
export default function ProductItem({product}) {
  const {id, name_product:name, img_link, price, description} = product
  return (
    <Link to={`${id}`} className='flex border-t-2 p-4'>
      <img src={img_link} alt='product-img' className='aspect-square w-28 rounded-md'/>
      <div className='flex flex-col justify-between px-5 flex-1'>
        <div>
          <h1 className='font-bold text-sm'>{name}</h1>
          <p className='text-xs'>{TruncateText(description)}</p>
        </div>
        <div className='flex items-center justify-between'>
          <h3 className='font-bold text-sm'>Rp. {price}</h3>
          <FontAwesomeIcon icon={faSquarePlus}/>
        </div>
      </div>
    </Link>
  )
}
