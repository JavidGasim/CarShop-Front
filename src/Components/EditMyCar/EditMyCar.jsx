import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditMyCar.css";
import Cookies from "js-cookie";

export default function EditMyCar() {
  const { id } = useParams();
  const [car, setCar] = useState({
    id: null,
    marka: "",
    model: "",
    year: "",
    price: "",
    description: "",
    situation: "",
    color: "",
    banType: "",
    march: "",
    engine: "",
    city: "",
    url1: "",
    url2: "",
    url3: "",
    fuelType: "",
    gearBox: "",
    gear: "",
    owners: "",
    market: "",
  });

  const navigate = useNavigate();

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

  useEffect(() => {
    axios
      .get(`https://localhost:7268/api/Car/${id}`)
      .then((response) => {
        setCar(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

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
      setCar({ ...car, url1: response.data.imageUrl });

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
      setCar({ ...car, url2: response.data.imageUrl });

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
      setCar({ ...car, url3: response.data.imageUrl });

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

  function handleSubmit(e) {
    e.preventDefault();
    UpdateCar();
  }

  function UpdateCar() {
    const updatedCar = {
      id: car.id,
      marka: car.marka,
      model: car.model,
      color: car.color,
      year: car.year,
      km: car.km,
      price: car.price,
      description: car.description,
      situation: car.situation,
      banType: car.banType,
      engine: car.engine,
      march: car.march,
      gearBox: car.gearBox,
      gear: car.gear,
      market: car.market,
      fuelType: car.fuelType,
      city: car.city,
      url1: car.url1,
      url2: car.url2,
      url3: car.url3,
    };

    const name = Cookies.get("username");
    const token = Cookies.get(name);

    axios
      .put(`https://localhost:7268/api/Car/${car.id}`, updatedCar, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Car updated successfully:", response.data);
        alert("Car updated successfully!");
        navigate("/myAnnouncements");
      })
      .catch((error) => {
        console.error("Error updating car:", error);
      });
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
              name="marka"
              value={car.marka}
              onChange={(e) =>
                setCar({ ...car, [e.target.name]: e.target.value })
              }
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
              name="model"
              value={car.model}
              onChange={(e) =>
                setCar({ ...car, [e.target.name]: e.target.value })
              }
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
              name="gear"
              value={car.gear}
              onChange={(e) =>
                setCar({ ...car, [e.target.name]: e.target.value })
              }
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
              name="fuelType"
              value={car.fuelType}
              onChange={(e) =>
                setCar({ ...car, [e.target.name]: e.target.value })
              }
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
              value={car.banType}
              name="banType"
              onChange={(e) =>
                setCar({ ...car, [e.target.name]: e.target.value })
              }
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
              value={car.gearBox}
              name="gearBox"
              onChange={(e) =>
                setCar({ ...car, [e.target.name]: e.target.value })
              }
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
              value={car.march}
              name="march"
              onChange={(e) =>
                setCar({ ...car, [e.target.name]: e.target.value })
              }
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
              value={car.year}
              name="year"
              onChange={(e) =>
                setCar({ ...car, [e.target.name]: e.target.value })
              }
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
              value={car.color}
              name="color"
              onChange={(e) =>
                setCar({ ...car, [e.target.name]: e.target.value })
              }
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
              value={car.price}
              name="price"
              onChange={(e) =>
                setCar({ ...car, [e.target.name]: e.target.value })
              }
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
              value={car.situation}
              name="situation"
              onChange={(e) =>
                setCar({ ...car, [e.target.name]: e.target.value })
              }
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
              name="engine"
              value={car.engine}
              onChange={(e) =>
                setCar({ ...car, [e.target.name]: e.target.value })
              }
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
              value={car.city}
              name="city"
              onChange={(e) =>
                setCar({ ...car, [e.target.name]: e.target.value })
              }
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
                {car.url1 ? (
                  <img
                    src={car.url1}
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
                {car.url2 ? (
                  <img
                    src={car.url2}
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
                {car.url3 ? (
                  <img
                    src={car.url3}
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
            value={car.description}
            placeholder="Description"
            name="description"
            onChange={(e) =>
              setCar({ ...car, [e.target.name]: e.target.value })
            }
          ></textarea>
        </section>

        <button type="submit" style={{ backgroundColor: "#f97316" }}>
          UPDATE CAR
        </button>
      </form>
    </section>
  );
}
