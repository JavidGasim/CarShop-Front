import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AllInfo from "../AllInfo";
import { Link, useNavigate } from "react-router-dom";
import "./FilteredCar.css";
import Cookies from "js-cookie";

export default function FilteredCar({ d }) {
  const [color, setColor] = useState(`${d.color}`);

  const url = "http://localhost:27001/cars";
  const url2 = "http://localhost:27002/favCars";
  const generalUrl = "https://localhost:7268/api/";
  const [myFavs, setMyFavs] = useState([]);
  const [selectedFavCar, setSelectedFavCar] = useState({});

  const navigate = useNavigate();

  const [isFav, setIsFav] = useState(false);

  const SelectedCarIsFav = (favs, car) => {
    console.log("favs:", favs);

    console.log(
      "Favourites carId list:",
      favs.map((f) => f.id)
    );
    console.log("Current car.id:", car.id);

    const matched = favs.find((f) => String(f.id) === String(car.id));

    console.log("matched:", matched);

    if (matched) {
      setSelectedFavCar(matched);
      setIsFav(true);
      console.log(isFav);
    } else {
      setIsFav(false);
      console.log(isFav);
    }
  };

  const GetMyFavs = async () => {
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

      console.log(favs);
      setMyFavs(favs);
      console.log(myFavs);

      console.log("car (d):", d);
      console.log("myFavs (favs):", favs);

      SelectedCarIsFav(favs, d); // d → aktiv maşın
    } catch (err) {
      console.error("Favları gətirərkən xəta:", err);
    }
  };

  useEffect(() => {
    if (d) {
      GetMyFavs(); // səhifə açılanda çağırılır
    }
  }, [d]);

  async function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const name = Cookies.get("username");
    const token = Cookies.get(name);

    if (!isFav) {
      // Add to fav
      // d.isFav = true;
      // d.color = "red";

      await axios
        .post(`${generalUrl}Car/addToFav/${d.id}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => console.log("Added successfully"))
        .catch((err) => navigate("/login"));

      setIsFav(true);

      await GetMyFavs(); // yenilə favs
    } else {
      // Remove from fav
      // d.isFav = false;
      // d.color = "black";

      await axios
        .delete(`${generalUrl}Car/removeFromFav/${d.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => console.log("Removed successfully"));

      setIsFav(false);
      await GetMyFavs(); // yenilə favs
    }

  }

  return (
    //target="_blank" rel="noopener noreferrer" -- new tab
    <Link to={`${d.id}`} className="main-des">
      <FontAwesomeIcon
        icon={faHeart}
        style={{
          position: "absolute",
          top: "10px",
          left: "90%",
          fontSize: "1.5em",
          color: isFav ? "red" : "black",
        }}
        onClick={(e) => handleClick(e)}
      />
      <img
        src={d.url1}
        style={{
          borderRadius: "10px 10px 0px 0px",
          width: "300px",
          height: "250px",
        }}
      ></img>
      <h1
        style={{ fontWeight: "bolder", fontSize: "1.5em", marginLeft: "10px" }}
      >
        {d.price} $
      </h1>
      <section
        style={{
          display: "flex",
          justifyContent: "start",
          fontSize: "1.3em",
          marginLeft: "10px",
        }}
      >
        <p>{d.marka}</p>
        <p style={{ marginLeft: "10px" }}>{d.model}</p>
      </section>
      <section
        style={{
          display: "flex",
          justifyContent: "start",
          fontSize: "1.3em",
          marginLeft: "10px",
        }}
      >
        <p>{d.year}</p>
        <p style={{ marginLeft: "10px" }}>{d.march} km</p>
      </section>
      <p style={{ marginLeft: "10px", fontSize: "1.3em" }}>{d.engine}</p>
      <p style={{ marginLeft: "10px", fontSize: "1.3em", color: "grey" }}>
        {d.city}
      </p>
    </Link>
  );
}
