import React, { useEffect, useState } from "react";
import axios from "axios";
import FavCar from "./FavCar";
import { useDispatch } from "react-redux";
import { changePath } from "../../Features/FilteredDataSlice";
import Cookies from "js-cookie";

export default function FavCars() {
  const url = "http://localhost:27002/favCars";
  const generalUrl = "https://localhost:7268/api/";

  const [myFavs, setMyFavs] = useState([]);

  let [datas, setDatas] = useState();

  let dispatch = useDispatch();

  function getCarsFromCookie() {
    const cookieString = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("cars="));
    if (cookieString) {
      const jsonCars = decodeURIComponent(cookieString.split("=")[1]);
      return JSON.parse(jsonCars);
    } else {
      return [];
    }
  }

  useEffect(() => {
    dispatch(changePath("/favourites"));
    GetMovies();
    // setDatas(getCarsFromCookie());
  });

  async function GetMovies() {
    const url = generalUrl + `Car/myFavs`;
    const name = Cookies.get("username");
    const token = Cookies.get(name);

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const favs = res.data;
      setDatas(favs);
      setMyFavs(favs);
    } catch (err) {
      console.error("Favları gətirərkən xəta:", err);
    }
  }
  return (
    <section
      style={{
        paddingBottom: "100px",
        backgroundColor: "lightgrey",
        border: "1px solid lightgrey",
      }}
    >
      <section style={{ padding: "30px", backgroundColor: "white" }}>
        <h1
          style={{
            fontWeight: "bolder",
            fontSize: "1.5em",
            textAlign: "start",
          }}
        >
          FAVOURITE CARS
        </h1>
      </section>
      <section
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "start" }}
      >
        {datas && datas.map((d) => <FavCar d={d}></FavCar>)}
      </section>
    </section>
  );
}
