import React from 'react';
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <section className='head-section'>
      <section style={{width:"45%",textAlign:'center'}}>
        <a href='https://tap.az/'  target="_blank" className='a-design'>Tap.az</a>
        <a href='https://bina.az/' target="_blank" className='a-design'>Bina.az</a>
        <a href='https://boss.az/' target="_blank" className='a-design'>Boss.az</a>
      </section>
      <section style={{width:"55%",display:"flex",justifyContent:"start",padding:"5px 0px"}}>
        <h1 className='h1-design2'>Dəstək: (012) 505-77-55</h1>
        <h1 className='h1-design'>Yardim</h1>
        <h1 className='h1-design'>Ru</h1>
        <section className='heart'>
            <FontAwesomeIcon icon={faHeart} style={{marginLeft:"30px",marginTop:"7px"}}/>
            <Link to="/favourites" className='h1-design' style={{marginLeft:"10px"}}>Secilmisler</Link>
        </section>
        <section className='heart'>
            <FontAwesomeIcon icon={faUser} style={{marginLeft:"30px",marginTop:"7px"}}/>            
            <h1 className='h1-design' style={{marginLeft:"10px"}}>Giris</h1>
        </section>
      </section>

    </section>
  )
}
