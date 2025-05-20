import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { Link } from 'react-router-dom';
import './FavCar.css';

export default function FavCar({d}) {

    const [color,setColor] = useState(`${d.color}`);
  
    const url = "http://localhost:27001/cars";
    const url2 = "http://localhost:27002/favCars";

    function setCarsCookie(cars) {
      const jsonCars = JSON.stringify(cars);
      const expiresDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      document.cookie = `cars=${encodeURIComponent(jsonCars)}; expires=${expiresDate.toUTCString()}; path=/`;
    }
  
    function getCarsFromCookie() {
      const cookieString = document.cookie.split('; ').find(cookie => cookie.startsWith('cars='));
      if (cookieString) {
        const jsonCars = decodeURIComponent(cookieString.split('=')[1]);
        return JSON.parse(jsonCars);
      } else {
        return [];
      }
    }
  
    function deleteCarByIdAndUpdateCookie(id) {
      const cars = getCarsFromCookie();
      const updatedCars = cars.filter(car => car.id !== id);
      setCarsCookie(updatedCars);
    }
    
    function handleClick(e)
    {
      e.preventDefault();
      e.stopPropagation();
      d.isFav = false;
      d.color = "white";
      axios.put(url + `/${d.id}`, d).then((data) => console.log(data));
      axios.delete(url2 + `/${d.id}`).then(() => console.log("Deleted successfully"));
      // deleteCarByIdAndUpdateCookie(d.id);
      setColor("white");
    }

  return (
    //target="_blank" rel="noopener noreferrer" -- new tab
    <Link to={`${d.id}`} className='main-des'>
        <FontAwesomeIcon icon={faHeart} style={{position:"absolute",top:"10px",left:"90%",fontSize:"1.5em",color:`${d.color}`}} onClick={(e) => handleClick(e)} />
        <img src={d.url} style={{borderRadius:"10px 10px 0px 0px",width:"300px",height:"250px"}}></img>
        <h1 style={{fontWeight:"bolder",fontSize:"1.5em",marginLeft:"10px"}}>{d.price}</h1>
        <section style={{display:"flex",justifyContent:"start",fontSize:"1.3em",marginLeft:"10px"}}>
            <p>{d.Marka}</p>
            <p style={{marginLeft:"10px"}}>{d.Model}</p>
        </section>
        <section style={{display:"flex",justifyContent:"start",fontSize:"1.3em",marginLeft:"10px"}}>
            <p>{d.GraduationYear}</p>
            <p style={{marginLeft:"10px"}}>{d.March}</p>
        </section>
        <p style={{marginLeft:"10px",fontSize:"1.3em"}}>{d.Engine}</p>
        <p style={{marginLeft:"10px",fontSize:"1.3em",color:"grey"}}>{d.city}</p>

    </Link>
  )
}
