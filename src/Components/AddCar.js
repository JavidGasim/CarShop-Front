import React, { useEffect, useRef, useState } from "react";
import "./AddCar.css";
import axios from "axios";
import { faMarker } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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

  const generalUrl = "https://localhost:7268/api/";

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

  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [imagePreview3, setImagePreview3] = useState(null);
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");

  const navigate = useNavigate();

  const handleImageChange1 = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      // setImageFile(file); // backend-ə göndərmək üçün fayl
      // setImagePreview(URL.createObjectURL(file)); // ön izləmə üçün
      return;
    }

    const allowedFormats = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
    ];

    if (!allowedFormats.includes(file.type)) {
      alert("Yalnız şəkil formatında fayllara icazə verilir!");
      return;
    }

    const newPreviewUrl = URL.createObjectURL(file);
    setImagePreview1(newPreviewUrl);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://localhost:7268/api/Image/newImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUrl1(response.data.imageUrl);
      console.log("Şəkil yükləndi:", response.data.imageUrl);
    } catch (error) {
      console.error("Yükləmə xətası:", error);
    }
  };

  const handleImageChange2 = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      // setImageFile(file); // backend-ə göndərmək üçün fayl
      // setImagePreview(URL.createObjectURL(file)); // ön izləmə üçün
      return;
    }

    const allowedFormats = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
    ];

    if (!allowedFormats.includes(file.type)) {
      alert("Yalnız şəkil formatında fayllara icazə verilir!");
      return;
    }

    const newPreviewUrl = URL.createObjectURL(file);
    setImagePreview2(newPreviewUrl);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://localhost:7268/api/Image/newImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUrl2(response.data.imageUrl);
      console.log("Şəkil yükləndi:", response.data.imageUrl);
    } catch (error) {
      console.error("Yükləmə xətası:", error);
    }
  };

  const handleImageChange3 = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      // setImageFile(file); // backend-ə göndərmək üçün fayl
      // setImagePreview(URL.createObjectURL(file)); // ön izləmə üçün
      return;
    }

    const allowedFormats = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
    ];

    if (!allowedFormats.includes(file.type)) {
      alert("Yalnız şəkil formatında fayllara icazə verilir!");
      return;
    }

    const newPreviewUrl = URL.createObjectURL(file);
    setImagePreview3(newPreviewUrl);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://localhost:7268/api/Image/newImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUrl3(response.data.imageUrl);
      console.log("Şəkil yükləndi:", response.data.imageUrl);
    } catch (error) {
      console.error("Yükləmə xətası:", error);
    }
  };

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

  // useEffect(() => {
  //   GetMovies();
  // });

  const [currentUser, setCurrentUser] = useState({
    id: "",
    userName: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
    email: "",
    phoneNumber: "",
    city: "",
  });

  function CurrentUser() {
    var url = generalUrl + `Account/currentUser`;
    const name = Cookies.get("username");
    const token = Cookies.get(name);

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((d) => {
        console.log(d.data);
        setCurrentUser(d.data.user);
      })
      .catch((err) => {
        console.log("Xəta:", err.response?.status, err.response?.data);
      });
  }

  useEffect(() => {
    CurrentUser();
  }, []);

  function addNewCar() {
    var url = generalUrl + `Car`;
    // const timePart = Date.now() % 1000000; // Son 6 rəqəmi götür (max: 999999)
    // const randomPart = Math.floor(Math.random() * 1000); // 0-999 arası
    // const uniqueId = timePart * 1000 + randomPart;
    // console.log(uniqueId); // məsələn: 1716475373829842 (bu artıq tam ədəddir)

    var obj = {
      // Id: uniqueId,
      Color: color,
      Url1: imageUrl1,
      Url2: imageUrl2,
      Url3: imageUrl3,
      Price: price,
      Marka: marka,
      Model: model,
      Year: year,
      BanType: banType,
      Engine: engine,
      March: march,
      GearBox: selectedGearBox,
      Gear: selectedGear,
      IsNew: march == "0" ? "true" : "false",
      Situation: situation,
      Description: description,
      UserId: currentUser.id,
      FuelType: selectedOil,
    };

    const name = Cookies.get("username");
    const token = Cookies.get(name);

    try {
      axios
        .post(url, obj, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((d) => {
          console.log(d.data);
          alert("Car added successfully!");
          navigate("/cars");
        });
    } catch (err) {
      console.log("Xəta:", err.response?.status, err.response?.data);
    }
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
              style={{ width: "150px" }}
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
              style={{ width: "180px" }}
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
              style={{ width: "150px" }}
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
              value={selectedGearBox}
              onChange={(e) => selectNewGearBox(e)}
              style={{ width: "180px" }}
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
              onChange={(e) => setEngine(e.target.value)}
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
            <label>City</label>
            <input
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
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
              flexDirection: "column",
              width: " 50%",
              justifyContent: "space-between",
            }}
          >
            <label style={{ textAlign: "center" }}>Image 1</label>
            <div className="image-upload-wrapper">
              <label htmlFor="upload-input-1" className="upload-label">
                {imagePreview1 ? (
                  <img
                    src={imagePreview1}
                    alt="Uploaded"
                    className="preview-image"
                  />
                ) : (
                  <div className="default-icon">📷</div>
                )}
              </label>
              <input
                type="file"
                id="upload-input-1"
                accept="image/*"
                onChange={handleImageChange1}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: " 40%",
              justifyContent: "space-between",
            }}
          >
            <label style={{ textAlign: "center" }}>Image 2</label>
            <div className="image-upload-wrapper">
              <label htmlFor="upload-input-2" className="upload-label">
                {imagePreview2 ? (
                  <img
                    src={imagePreview2}
                    alt="Uploaded"
                    className="preview-image"
                  />
                ) : (
                  <div className="default-icon">📷</div>
                )}
              </label>
              <input
                type="file"
                id="upload-input-2"
                accept="image/*"
                onChange={handleImageChange2}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: " 50%",
              justifyContent: "space-between",
            }}
          >
            <label style={{ textAlign: "center" }}>Image 3</label>
            <div className="image-upload-wrapper">
              <label htmlFor="upload-input-3" className="upload-label">
                {imagePreview3 ? (
                  <img
                    src={imagePreview3}
                    alt="Uploaded"
                    className="preview-image"
                  />
                ) : (
                  <div className="default-icon">📷</div>
                )}
              </label>
              <input
                type="file"
                id="upload-input-3"
                accept="image/*"
                onChange={handleImageChange3}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </section>
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            paddingLeft: "30px",
            paddingRight: "30px",
            marginTop: "50px",
          }}
        >
          {/* <label style={{ alignItems: "center", alignSelf: "center" }}>
            Description
          </label> */}
          <textarea
            required
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </section>

        <button type="submit" style={{ backgroundColor: "#f97316" }}>
          ADD CAR
        </button>
      </form>
    </section>
  );
}
