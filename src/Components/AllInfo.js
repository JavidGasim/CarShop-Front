import React, { useEffect, useRef, useState } from "react";
import {Link, useParams,useHistory } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faChevronRight,faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './AllInfo.css';
import { useSelector } from "react-redux";

export default function AllInfo() {
  const { id } = useParams();
  const url = `http://localhost:27001/cars/${id}`;
  const url2 = "http://localhost:27002/favCars";
  const url3 = `http://localhost:27001/cars`;
  const [data,setData] = useState({});
  const [color,setColor] = useState("");
  let index = useRef(0);
  const path = useSelector((state) => state.filteredData.path);


  useEffect(()=>{
    GetMovie();
  })

  function GetMovie()
  {
    axios.get(url).then((d) => {
      setData(d.data);
    });
  }

  function handleClick(e)
  {
    e.preventDefault();
    e.stopPropagation();
    if(data.isFav == false)
    {
      data.isFav = true;
      data.color = "red";
      setColor("red");
      // var cars = getCarsFromCookie();
      // cars.push(d);
      // setCarsCookie(cars);
      axios.post(url2, data).then((data) => console.log(data));
    }

    else
    {
      data.isFav = false;
      data.color = "white";
      setColor("white");
      // deleteCarByIdAndUpdateCookie(d.id);
      axios.delete(url2 + `/${data.id}`).then(() => console.log("Deleted successfully"));
    }

    axios.put(url3 + `/${data.id}`, data).then((data) => console.log(data));
    // dispatch(updateCar({ id: d.id, car: d }));
  }

  function changeImage()
  {
    index.current++;
    if(index.current == 3)
    {
      index.current = 0;
    }
  }

  function changeImage2()
  {
    index.current--;

    if(index.current == -1)
    {
      index.current = 2;
    }
  }

  return (
    <section style={{width:"80%",backgroundColor:"red",backgroundColor:"white",marginLeft:"7%"}}>
      
      <Link to={`${path}`} style={{display:"flex",justifyContent:"start",marginTop:"30px",marginBottom:"30px",textDecoration:"none",color:"black"}}>
        <h1 style={{paddingLeft:"0px",fontSize:"2em",fontWeight:"bolder"}}>{data.Marka}</h1>
        <h1 style={{paddingLeft:"20px",fontSize:"2em",fontWeight:"bolder"}}>{data.Model}</h1>
        <h1 style={{paddingLeft:"20px",fontSize:"2em",fontWeight:"bolder"}}>{data.Engine}</h1>
        <h1 style={{paddingLeft:"20px",fontSize:"2em",fontWeight:"bolder"}}>{data.March}</h1>
      </Link>

      <section style={{position:"relative"}}>
        <img src={data.url} style={{width:"100%",height:"90vh",borderRadius:"10px",display:`${index.current == 0 ?"block":"none"}`}}></img>
        <img src={data.url2} style={{width:"100%",height:"90vh",borderRadius:"10px",display:`${index.current == 1 ?"block":"none"}`}}></img>
        <img src={data.url3} style={{width:"100%",height:"90vh",borderRadius:"10px",display:`${index.current == 2 ?"block":"none"}`}}></img>
        <FontAwesomeIcon icon={faChevronLeft} onClick={changeImage2} className="arrow-design" />
        <FontAwesomeIcon icon={faChevronRight} className="arrow-design" onClick={changeImage} style={{left:"90%"}}/>
        <FontAwesomeIcon icon={faHeart} style={{position:"absolute",top:"10px",left:"93%",fontSize:"3em",color:`${data.color}`}} onClick={(e) => handleClick(e)}/>
      </section>

      <hr style={{marginTop:"30px"}}/>

      <section style={{width:"100%",display:"flex",justifyContent:"start",marginTop:"20px"}}>
        <section style={{width:"50%",backgroundColor:"white"}}>
          <section style={{display:"flex",justifyContent:"start"}}>
            <h1 style={{width:"50%",fontSize:"1.3em",color:"grey",paddingTop:"10px"}}>Şəhər</h1>
            <h1 style={{width:"50%",fontSize:"1.3em",paddingTop:"10px"}}>{data.city}</h1>
          </section>
          <section style={{display:"flex",justifyContent:"start"}}>
            <h1 style={{width:"50%",fontSize:"1.2em",color:"grey",paddingTop:"10px"}}>Marka</h1>
            <h1 style={{width:"50%",fontSize:"1.3em",paddingTop:"10px"}}>{data.Marka}</h1>
          </section>
          <section style={{display:"flex",justifyContent:"start"}}>
            <h1 style={{width:"50%",fontSize:"1.3em",color:"grey",paddingTop:"10px"}}>Model</h1>
            <h1 style={{width:"50%",fontSize:"1.3em",paddingTop:"10px"}}>{data.Model}</h1>
          </section>
          <section style={{display:"flex",justifyContent:"start"}}>
            <h1 style={{width:"50%",fontSize:"1.3em",color:"grey",paddingTop:"10px"}}>Buraxılış ili</h1>
            <h1 style={{width:"50%",fontSize:"1.3em",paddingTop:"10px"}}>{data.GraduationYear}</h1>
          </section>
          <section style={{display:"flex",justifyContent:"start"}}>
            <h1 style={{width:"50%",fontSize:"1.3em",color:"grey",paddingTop:"10px"}}>Ban növü</h1>
            <h1 style={{width:"50%",fontSize:"1.3em",paddingTop:"10px"}}>{data.BanType}</h1>
          </section>
          <section style={{display:"flex",justifyContent:"start"}}>
            <h1 style={{width:"50%",fontSize:"1.3em",color:"grey",paddingTop:"10px"}}>Rəng</h1>
            <h1 style={{width:"50%",fontSize:"1.3em",paddingTop:"10px"}}>{data.Color}</h1>
          </section>
          <section style={{display:"flex",justifyContent:"start"}}>
            <h1 style={{width:"50%",fontSize:"1.3em",color:"grey",paddingTop:"10px"}}>Yürüş</h1>
            <h1 style={{width:"50%",fontSize:"1.3em",paddingTop:"10px"}}>{data.March}</h1>
          </section>
          <section style={{display:"flex",justifyContent:"start"}}>
            <h1 style={{width:"50%",fontSize:"1.3em",color:"grey",paddingTop:"10px"}}>Mühərrik</h1>
            <h1 style={{width:"50%",fontSize:"1.3em",paddingTop:"10px"}}>{data.Engine}</h1>
          </section>
        </section>

        <section style={{width:"50%",backgroundColor:"white",marginLeft:"10%"}}>
          <section style={{display:"flex",justifyContent:"start"}}>
            <h1 style={{width:"50%",fontSize:"1.3em",color:"grey",paddingTop:"10px"}}>Sürətlər qutusu</h1>
            <h1 style={{width:"50%",fontSize:"1.3em",paddingTop:"10px"}}>{data.GearBox}</h1>
          </section>
          <section style={{display:"flex",justifyContent:"start"}}>
            <h1 style={{width:"50%",fontSize:"1.2em",color:"grey",paddingTop:"10px"}}>Ötürücü</h1>
            <h1 style={{width:"50%",fontSize:"1.3em",paddingTop:"10px"}}>{data.Gear}</h1>
          </section>
          <section style={{display:"flex",justifyContent:"start"}}>
            <h1 style={{width:"50%",fontSize:"1.3em",color:"grey",paddingTop:"10px"}}>Buraxılış ili</h1>
            <h1 style={{width:"50%",fontSize:"1.3em",paddingTop:"10px"}}>{data.GraduationYear}</h1>
          </section>
          <section style={{display:"flex",justifyContent:"start"}}>
            <h1 style={{width:"50%",fontSize:"1.3em",color:"grey",paddingTop:"10px"}}>Hansı bazar üçün</h1>
            <h1 style={{width:"50%",fontSize:"1.3em",paddingTop:"10px"}}>{data.Market}</h1>
          </section>
          <section style={{display:"flex",justifyContent:"start"}}>
            <h1 style={{width:"50%",fontSize:"1.3em",color:"grey",paddingTop:"10px"}}>Yeni</h1>
            <h1 style={{width:"50%",fontSize:"1.3em",paddingTop:"10px"}}>{data.New}</h1>
          </section>
          <section style={{display:"flex",justifyContent:"start"}}>
            <h1 style={{width:"50%",fontSize:"1.3em",color:"grey",paddingTop:"10px"}}>Sahiblər</h1>
            <h1 style={{width:"50%",fontSize:"1.3em",paddingTop:"10px"}}>{data.Owners}</h1>
          </section>
          <section style={{display:"flex",justifyContent:"start"}}>
            <h1 style={{width:"50%",fontSize:"1.3em",color:"grey",paddingTop:"10px"}}>Qiymət</h1>
            <h1 style={{width:"50%",fontSize:"1.3em",paddingTop:"10px"}}>{data.price}</h1>
          </section>
          <section style={{display:"flex",justifyContent:"start"}}>
            <h1 style={{width:"50%",fontSize:"1.3em",color:"grey",paddingTop:"10px"}}>Vəziyyəti</h1>
            <h1 style={{width:"50%",fontSize:"1.3em",paddingTop:"10px"}}>{data.Situation}</h1>
          </section>
        </section>

      </section>
      <hr style={{marginTop:"30px"}}/>
      <section>
        <p style={{fontSize:"1.2em",marginTop:"30px"}}>{data.Description}</p>
      </section>
      <hr style={{marginTop:"30px"}}/>
    </section>
  )
}
