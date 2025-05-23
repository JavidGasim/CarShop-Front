import React, { useEffect, useRef, useState } from "react";
import "./AddCar.css";
import axios from "axios";
import { faMarker } from "@fortawesome/free-solid-svg-icons";

export default function AddCar() {
  const cookies = document.cookie.split(";");
  let docId = null;
  cookies.forEach((cookie) => {
    const cookieParts = cookie.split("=");
    const cookieName = cookieParts[0].trim();
    if (cookieName === "id") {
      docId = parseInt(cookieParts[1]);
    }
  });
  const [datas, setDatas] = useState([]);

  const jsonUrl = "http://localhost:27001/cars";
  const id = useRef(0);
  const [selectedOil, setSelectedOil] = useState("");
  const [selectedGear, setSelectedGear] = useState("");
  const [selectedGearBox, setSelectedGearBox] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");
  const [selectedOwners, setSelectedOwners] = useState("");

  const [marka, setMarka] = useState();
  const [model, setModel] = useState();
  const [banType, setBanType] = useState();
  const [march, setMarch] = useState();
  const [year, setYear] = useState();
  const [color, setColor] = useState();
  const [situation, setSituation] = useState();
  const [price, setPrice] = useState();
  const [engine, setEngine] = useState();
  const [city, setCity] = useState();
  const [url, setUrl] = useState();
  const [url2, setUrl2] = useState();
  const [url3, setUrl3] = useState();
  const [description, setDescription] = useState();

  function selectNewOil(e) {
    setSelectedOil(e.target.value);
  }

  function selectNewGear(e) {
    setSelectedGear(e.target.value);
  }

  function selectNewGearBox(e) {
    setSelectedGearBox(e.target.value);
  }

  function selectNewMarket(e) {
    setSelectedMarket(e.target.value);
  }

  function selectNewOwners(e) {
    setSelectedOwners(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addNewCar();
  }

  function GetMovies() {
    axios.get(jsonUrl).then((d) => {
      setDatas(d.data);
    });
  }

  useEffect(() => {
    GetMovies();
  });

  function addNewCar() {
    id.current = datas.length;
    id.current++;

    // document.cookie = `id=${id.current};path=/;`;
    const car = {
      id: String(`${id.current}`),
      color: "white",
      isFav: false,
      url: url,
      url2: url2,
      url3: url3,
      price: price,
      city: city,
      Marka: marka,
      Model: model,
      GraduationYear: year,
      BanType: banType,
      Color: color,
      Engine: engine + "/" + selectedOil,
      March: march,
      GearBox: selectedGearBox,
      Gear: selectedGear,
      New: "",
      Owners: selectedOwners,
      Situation: situation,
      Market: selectedMarket,
      Description: description,
    };
    axios.post(jsonUrl, car).then((data) => console.log(data));

    setUrl("");
    setPrice("");
    setCity("");
    setMarka("");
    setModel("");
    setYear("");
    setBanType("");
    setColor("");
    setEngine("");
    setSelectedOil("");
    setMarch("");
    setSelectedGearBox("");
    setSelectedGear("");
    setSelectedOwners("");
    setSituation("");
    setSelectedMarket("");
    setDescription("");
    setUrl2("");
    setUrl3("");
  }
  return (
    <section
      style={{
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "lightgray",
      }}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "30px",
            paddingRight: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: " 40%",
              justifyContent: "space-between",
            }}
          >
            <label>Brand</label>
            <input
              required
              value={marka}
              onChange={(e) => setMarka(e.target.value)}
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              width: " 50%",
              justifyContent: "space-between",
            }}
          >
            <label>Model</label>
            <input
              required
              value={model}
              onChange={(e) => setModel(e.target.value)}
            ></input>
          </div>
        </section>

        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "30px",
            paddingRight: "30px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: " 40%",
              justifyContent: "space-between",
            }}
          >
            <label>Gear</label>
            <select
              required
              value={selectedGear}
              onChange={(e) => selectNewGear(e)}
            >
              <option value=""></option>
              <option value="Rear">Rear</option>
              <option value="Front">Front</option>
              <option value="All">All</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: " 50%",
            }}
          >
            <label>Fuel Type</label>
            <select
              required
              value={selectedOil}
              onChange={(e) => selectNewOil(e)}
            >
              <option value=""></option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Gas">Gas</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Plug-in Hybrid">Plug-in Hybrid</option>
            </select>
          </div>
        </section>

        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "30px",
            paddingRight: "30px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: " 40%",
              justifyContent: "space-between",
            }}
          >
            <label>Ban Type</label>
            <select
              required
              value={banType}
              onChange={(e) => setBanType(e.target.value)}
            >
              <option value=""></option>
              <option value="Bus">Bus</option>
              <option value="Trailer">Trailer</option>
              <option value="Fastback">Fastback</option>
              <option value="Carriage">Carriage</option>
              <option value="Van">Van</option>
              <option value="Hatchback,3-door">Hatchback, 3-door</option>
              <option value="Hatchback,4-door">Hatchback, 4-door</option>
              <option value="Hatchback,5-door">Hatchback, 5-door</option>
              <option value="Cabriolet">Cabriolet</option>
              <option value="Caravan">Caravan</option>
              <option value="Compact Van">Compact Van</option>
              <option value="Coupe">Coupe</option>
              <option value="ATV">ATV</option>
              <option value="Liftback">Liftback</option>
              <option value="Limousine">Limousine</option>
              <option value="Minibus">Minibus</option>
              <option value="Microvan">Microvan</option>
              <option value="Minivan">Minivan</option>
              <option value="Moped">Moped</option>
              <option value="Motorcycle">Motorcycle</option>
              <option value="Offroader / SUV,3-door">
                Offroader / SUV, 3-door
              </option>
              <option value="Offroader / SUV,5-door">
                Offroader / SUV, 5-door
              </option>
              <option value="Offroader / SUV,open-top">
                Offroader / SUV, open-top
              </option>
              <option value="Sedan">Sedan</option>
              <option value="Truck">Truck</option>
              <option value="Van">Van</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              width: " 50%",
              justifyContent: "space-between",
            }}
          >
            {/* <input required value={banType} style={{marginLeft:"65px"}} placeholder='Ban növü' onChange={(e) => setBanType(e.target.value)}></input> */}
            <label>Gear Box</label>
            <select
              required
              style={{ marginLeft: "55px" }}
              value={selectedGearBox}
              onChange={(e) => selectNewGearBox(e)}
            >
              <option value=""></option>
              <option value="Automatic">Automatic</option>
              <option value="CVT">CVT</option>
              <option value="Manual">Manual</option>
              <option value="Robotized">Robotized</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Reducer">Reducer</option>
            </select>
          </div>
        </section>

        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "30px",
            paddingRight: "30px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: " 40%",
              justifyContent: "space-between",
            }}
          >
            <label>March</label>
            <input
              required
              value={march}
              onChange={(e) => setMarch(e.target.value)}
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              width: " 50%",
              justifyContent: "space-between",
            }}
          >
            <label>Year</label>
            <input
              required
              value={year}
              onChange={(e) => setYear(e.target.value)}
            ></input>
          </div>
        </section>

        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "30px",
            paddingRight: "30px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: " 40%",
              justifyContent: "space-between",
            }}
          >
            <label>Color</label>
            <input
              required
              value={color}
              onChange={(e) => setColor(e.target.value)}
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              width: " 50%",
              justifyContent: "space-between",
            }}
          >
            <label>Price</label>
            <input
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>
        </section>

        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "30px",
            paddingRight: "30px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: " 40%",
              justifyContent: "space-between",
            }}
          >
            <label>Status</label>
            <input
              required
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              width: " 50%",
              justifyContent: "space-between",
            }}
          >
            <label>Engine</label>
            <input
              required
              value={engine}
              style={{ marginLeft: "65px" }}
              onChange={(e) => setEngine(e.target.value)}
            ></input>
          </div>
        </section>

        <section
          style={{
            display: "flex",
            justifyContent: "start",
            paddingLeft: "30px",
            paddingRight: "30px",
            marginTop: "20px",
          }}
        >
          <label>City</label>
          <input
            required
            value={city}
            style={{ marginLeft: "105px" }}
            onChange={(e) => setCity(e.target.value)}
          ></input>
          <label style={{ marginLeft: "80px" }}>Url</label>
          <input
            required
            value={url}
            style={{ marginLeft: "190px" }}
            onChange={(e) => setUrl(e.target.value)}
          ></input>
        </section>
        <section
          style={{
            display: "flex",
            justifyContent: "start",
            paddingLeft: "30px",
            paddingRight: "30px",
            marginTop: "20px",
          }}
        >
          <label>Url2</label>
          <input
            required
            value={url2}
            style={{ marginLeft: "125px" }}
            onChange={(e) => setUrl2(e.target.value)}
          ></input>
          <label style={{ marginLeft: "75px" }}>Url3</label>
          <input
            required
            value={url3}
            style={{ marginLeft: "180px" }}
            onChange={(e) => setUrl3(e.target.value)}
          ></input>
        </section>
        <section
          style={{
            display: "flex",
            justifyContent: "start",
            paddingLeft: "30px",
            paddingRight: "30px",
            marginTop: "50px",
          }}
        >
          <label style={{ marginLeft: "250px", marginTop: "50px" }}>
            Description
          </label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </section>

        <button type="submit">ADD CAR</button>
      </form>
    </section>
  );
}
