import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "../Filter/Filter";
import FilteredCar from "./FilteredCar";
import { useSelector, useDispatch } from "react-redux";
import "./FilteredCars.css";

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
  const generalUrl = "https://localhost:7268/api/";

  const dispatch = useDispatch();
  const [datas, setDatas] = useState([]);
  const [cars, setCars] = useState([]);
  const [count, setCount] = useState();
  const [c, setC] = useState(0);
  const [check, setCheck] = useState(true);

  const [filteredCars, setFilteredCars] = useState([]);

  const marka = useSelector((state) => state.filteredData.marka);
  const model = useSelector((state) => state.filteredData.model);
  const info = useSelector((state) => state.filteredData.info);
  const minPrice = useSelector((state) => state.filteredData.priceMin);
  const maxPrice = useSelector((state) => state.filteredData.priceMax);
  const minYear = useSelector((state) => state.filteredData.yearMin);
  const maxYear = useSelector((state) => state.filteredData.yearMax);
  const city = useSelector((state) => state.filteredData.city);

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 9;

  function FilterCars() {
    // (item.Marka == marka && item.Marka != "" ) && (item.Model == model && item.model !="")
    const filtered = cars.filter((item) => {
      var count = 0;

      const PStr = item.price;
      const numbers = PStr.match(/\d+/g);
      const PNum = numbers.map((num) => Number(num));

      const YStr = item.year;
      const numbers2 = YStr.match(/\d+/g);
      const YNum = numbers2.map((num) => Number(num));

      if (item.marka == marka || marka == "") {
        count++;
      }
      if (item.model == model || model == "") {
        count++;
      }
      if (info == "Hamısı") {
        count++;
      }
      if (
        info == "Yeni" &&
        (item.march == "0 km" || item.march == "0" || item.march == "0km")
      ) {
        count++;
      }
      if (
        info == "Sürülmüş" &&
        item.march != "0 km" &&
        item.march != "0" &&
        item.march != "0km" &&
        item.march != 0
      ) {
        count++;
      }
      if (minPrice == "" || PNum > minPrice) {
        count++;
      }
      if (maxPrice == "" || PNum < maxPrice) {
        count++;
      }

      if (minYear == "" || YNum > minYear) {
        count++;
      }
      if (maxYear == "" || YNum < maxYear) {
        count++;
      }
      if (item.city.toLowerCase().includes(city.toLowerCase()) || city == "") {
        count++;
      }

      if (count == 8) {
        return item;
      }
    });

    if (filtered.length > 0) {
      setDatas(filtered);
    }

    if (filtered.length == 0) {
      setCount(0);
    }
  }

  useEffect(() => {
    if (cars.length > 0) {
      FilterCars();
    }
  }, [cars]);

  function GetMovies() {
    axios
      .get(generalUrl + `Car/?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .then((d) => {
        console.log(d);
        setCars(d.data);
      });
  }

  const handleNext = () => setPageNumber((prev) => prev + 1);
  const handlePrevious = () => {
    if (pageNumber > 1) setPageNumber((prev) => prev - 1);
  };

  useEffect(() => {
    dispatch(changePath("/filtered_cars"));
    GetMovies();
  }, [pageNumber]);
  return (
    <section style={{ backgroundColor: "lightgrey" }}>
      {/* <Filter></Filter> */}
      {count == 0 ? (
        <h1 style={{ marginLeft: "30px", fontSize: "2em", paddingTop: "20px" }}>
          Car Not Found
        </h1>
      ) : (
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "start",
            paddingBottom: "100px",
          }}
        >
          {datas && datas.map((d) => <FilteredCar d={d}></FilteredCar>)}
          <br />
          <div className="pagination-buttons">
            <button
              className="pagination-btn"
              onClick={handlePrevious}
              disabled={pageNumber === 1}
            >
              ⬅️ Previous
            </button>
            <span className="page-number">Page: {pageNumber}</span>
            <button
              className="pagination-btn"
              onClick={handleNext}
              disabled={!datas || datas.length < pageSize}
            >
              {" "}
              Next ➡️
            </button>
          </div>
        </section>
      )}
    </section>
  );
}
