import React, { useEffect, useState } from 'react';
import axios from "axios";
import Car from './Car';
import Filter from '../Filter/Filter';
import { useDispatch,useSelector } from "react-redux";
import { fetchCars } from "../../Features/CarsSlice";
import { changePath } from '../../Features/FilteredDataSlice';

export default function Cars() {
    const url = "http://localhost:27001/cars";

    const[datas,setDatas] = useState();
    const cars = useSelector((state) => state.cars.cars);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(changePath("/"));
        GetMovies();
        
        // dispatch(fetchCars());
        // setDatas(cars);
        // console.log(document.cookie);
        // const id = 16;
        // var date = new Date();
        // date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
        // document.cookie = `id=${id};expires=${date.toUTCString()};path=/`;
    })

    function GetMovies()
    {
        axios.get(url).then((d) => {
            console.log(d);
            setDatas(d.data);
        });
    }
  return (
    <section>
        <Filter></Filter>
        <section style={{display:'flex',flexWrap:"wrap",justifyContent:"start",backgroundColor:"lightgrey",paddingBottom:"100px"}}>
            
            {datas &&
            (
                datas.map((d) => 
                (
                    <Car d={d}></Car>
                ))
            )
            }
        </section>

    </section>
  )
}
