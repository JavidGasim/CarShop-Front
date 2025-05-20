import React, { useEffect, useState } from 'react';
import axios from "axios";
import FavCar from './FavCar';
import {useDispatch} from 'react-redux';
import { changePath } from '../../Features/FilteredDataSlice';

export default function FavCars() {
    const url = "http://localhost:27002/favCars";

    let [datas,setDatas] = useState();

    let dispatch = useDispatch();

    function getCarsFromCookie() {
        const cookieString = document.cookie.split('; ').find(cookie => cookie.startsWith('cars='));
        if (cookieString) {
          const jsonCars = decodeURIComponent(cookieString.split('=')[1]);
          return JSON.parse(jsonCars);
        } else {
          return [];
        }
      }

    useEffect(()=>{
      dispatch(changePath("/favourites"));
      GetMovies();
      // setDatas(getCarsFromCookie());
    })

    function GetMovies()
    {
        axios.get(url).then((d) => {
            console.log(d);
            setDatas(d.data);
        });
    }
  return (
    <section style={{paddingBottom:"100px",backgroundColor:"lightgrey",border:"1px solid lightgrey"}}>
        <section style={{padding:"30px",backgroundColor:"white"}}>
            <h1 style={{fontWeight:"bolder",fontSize:"1.5em",textAlign:"start"}}>SECILMIS ELANLAR:</h1>
        </section>
        <section style={{display:'flex',flexWrap:"wrap",justifyContent:"start"}}>
            {datas &&
            (
                datas.map((d) => 
                (
                    <FavCar d={d}></FavCar>
                ))
            )
            }

    </section>
    </section>
  )
}
