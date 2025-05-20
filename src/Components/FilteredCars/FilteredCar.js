import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import AllInfo from '../AllInfo';
import { Link } from 'react-router-dom';
import './FilteredCar.css';

export default function FilteredCar({d}) {
    const [color,setColor] = useState(`${d.color}`);
  
    const url = "http://localhost:27001/cars";
    const url2 = "http://localhost:27002/favCars";
  
    function handleClick(e)
    {
      e.preventDefault();
      e.stopPropagation();
      if(d.isFav == false)
      {
        d.isFav = true;
        d.color = "red";
        axios.put(url + `/${d.id}`, d).then((data) => console.log(data));
        axios.post(url2, d).then((data) => console.log(data));
        setColor("red");
      }
  
      else
      {
        d.isFav = false;
        d.color = "white";
        axios.put(url + `/${d.id}`, d).then((data) => console.log(data));
        axios.delete(url2 + `/${d.id}`).then(() => console.log("Deleted successfully"));
        setColor("white");
      }
        
    }

    return (
      //target="_blank" rel="noopener noreferrer" -- new tab
      <Link to={`${d.id}`} className='main-des' >
          <FontAwesomeIcon icon={faHeart} style={{position:"absolute",top:"10px",left:"90%",fontSize:"1.5em",color:`${d.color}`}} onClick={(e) => handleClick(e)}/>
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
