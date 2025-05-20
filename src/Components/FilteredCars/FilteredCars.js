import React, { useEffect, useState } from 'react';
import axios from "axios";
import Filter from '../Filter/Filter';
import FilteredCar from './FilteredCar';
import { useSelector,useDispatch } from "react-redux";

import {
  changeMarka,
  changeModel,
  changeCity,
  changeInfo,
  changePriceMin,
  changePriceMax,
  changeYearMin,
  changeYearMax,
  changePath,
} from "../../../src/Features/FilteredDataSlice";

export default function FilteredCars() {
    const url = "http://localhost:27001/cars";
    
    const dispatch = useDispatch();
    const[datas,setDatas] = useState([]);
    const[count,setCount] = useState();
    const[c,setC] = useState(0);
    const[check,setCheck] = useState(true);


    const [filteredCars, setFilteredCars] = useState([]);

    const marka = useSelector((state) => state.filteredData.marka);
    const model = useSelector((state) => state.filteredData.model);
    const info = useSelector((state) => state.filteredData.info);
    const minPrice = useSelector((state) => state.filteredData.priceMin);
    const maxPrice = useSelector((state) => state.filteredData.priceMax);
    const minYear = useSelector((state) => state.filteredData.yearMin);
    const maxYear = useSelector((state) => state.filteredData.yearMax);
    const city = useSelector((state) => state.filteredData.city);

    useEffect(()=>{
      dispatch(changePath("/filtered_cars"));
      GetMovies();
    },[]);
    
    useEffect(() =>
    {
      if(datas.length > 0)
      {
        FilterCars();
      }
    },[datas])

    function FilterCars()
    {
      // (item.Marka == marka && item.Marka != "" ) && (item.Model == model && item.model !="")
        const filtered = datas.filter(item => {
        var count = 0;

        const PStr = item.price;
        const numbers = PStr.match(/\d+/g);
        const PNum = numbers.map(num => Number(num));

        const YStr = item.GraduationYear;
        const numbers2 = YStr.match(/\d+/g);
        const YNum = numbers2.map(num => Number(num));

        
        if (item.Marka == marka || marka == "") {
          count++;
        }
        if(item.Model == model || model =="")
        {
          count ++;
        }
        if(info=="Hamısı")
        {
          count ++;
        }
        if(info=="Yeni" && (item.March == "0 km" || item.March == "0" || item.March == "0km" ))
        {
          count ++;
        }
        if(info =="Sürülmüş" && (item.March != "0 km" && item.March != "0" && item.March != "0km" ))
        {
          count++;
        }
        if(minPrice == "" || PNum > minPrice)
        {
          count++;
        }
        if(maxPrice == "" || PNum < maxPrice)
        {
          count++;
        }

        if(minYear == "" || YNum > minYear)
        {
          count++;
        }
        if(maxYear == "" || YNum < maxYear)
        {
          count++;
        }
        if (item.city.toLowerCase() == city.toLowerCase() || city == "") {
          count++;
        }

        if(count == 8)
        {
          return item;
        }
        
      });
      
      if(filtered.length > 0)
      {
        setDatas(filtered);
      }

      if(filtered.length == 0)
      {
        setCount(0);
      }
    }

    function GetMovies()
    {
      axios.get(url).then((d) => {
        setDatas(d.data);
      });
    }
  return (
    <section style={{backgroundColor:"lightgrey"}}>
      {/* <Filter></Filter> */}
      {
        count == 0 && (<h1 style={{marginLeft:"30px",fontSize:"2em",paddingTop:"20px"}}>This Car Not Found</h1>)
      }
      <section style={{display:'flex',flexWrap:"wrap",justifyContent:"start",paddingBottom:"100px"}}>
        {datas &&
          (
            datas.map((d) => 
            (
              <FilteredCar d={d}></FilteredCar>
            ))
          )
        }
        </section>
    </section>
  )
}
