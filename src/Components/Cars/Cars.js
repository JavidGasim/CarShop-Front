import React, { useEffect, useState } from "react";
import axios from "axios";
import Car from "./Car";
import Filter from "../Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../Features/CarsSlice";
import { changePath } from "../../Features/FilteredDataSlice";
import "./Cars.css";

export default function Cars() {
  // const url = "http://localhost:27001/cars";
  const generalUrl = "https://localhost:7268/api/";

  const [datas, setDatas] = useState();
  const cars = useSelector((state) => state.cars.cars);
  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 9;

  function GetMovies() {
    // axios.get(url).then((d) => {
    //   console.log(d);
    //   setDatas(d.data);
    // });
    var url = generalUrl + `Car/?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    axios.get(url).then((d) => {
      console.log(d);
      setDatas(d.data);
    });
  }

  useEffect(() => {
    dispatch(changePath("/"));
    GetMovies();

    // dispatch(fetchCars());
    // setDatas(cars);
    // console.log(document.cookie);
    // const id = 16;
    // var date = new Date();
    // date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
    // document.cookie = `id=${id};expires=${date.toUTCString()};path=/`;
  }, [pageNumber]);

  const handleNext = () => setPageNumber((prev) => prev + 1);
  const handlePrevious = () => {
    if (pageNumber > 1) setPageNumber((prev) => prev - 1);
  };
  return (
    <section>
      <Filter></Filter>
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          backgroundColor: "lightgrey",
          paddingBottom: "100px",
        }}
      >
        {datas && datas.map((d) => <Car d={d}></Car>)}
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
    </section>
  );
}
