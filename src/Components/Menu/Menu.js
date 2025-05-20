import React from 'react'
import './Menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <section className='menu-section'>
      <Link to='/' className='header-h1'>TURBO.AZ</Link>
      <Link to="/" className='h1-des'>Butun Elanlar</Link>
      <h1 className='h1-des'>Salonlar</h1>
      <h1 className='h1-des'>Moto</h1>
      <h1 className='h1-des'>Ehtiyyat hisseler ve aksesuarlar</h1>
      <h1 className='h1-des'>Icare</h1>
      <Link to="/new_announcement" className='custom-button'>
        <FontAwesomeIcon icon={faPlus} className='plus-des' />
        <h1 className='h1-custom'>Yeni elan</h1>
      </Link>

    </section>
  )
}
