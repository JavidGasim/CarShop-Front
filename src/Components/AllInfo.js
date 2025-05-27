import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./AllInfo.css";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { HubConnectionBuilder } from "@microsoft/signalr";

export default function AllInfo() {
  const { id } = useParams();
  const url = `http://localhost:27001/cars/${id}`;
  const url4 = "http://localhost:27001/cars";
  const url2 = "http://localhost:27002/favCars";
  const url3 = `http://localhost:27001/cars`;
  const generalUrl = `https://localhost:7268/api/`;
  const [data, setData] = useState({});
  const [parsedFeedbacks, setParsedFeedbacks] = useState([]);
  const [color, setColor] = useState("");

  const [sharer, setSharer] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  const [feedback, setFeedback] = useState();

  const [myFavs, setMyFavs] = useState([]);
  const [selectedFavCar, setSelectedFavCar] = useState({});

  const [isFav, setIsFav] = useState(false);

  let index = useRef(0);
  const path = useSelector((state) => state.filteredData.path);

  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const username = Cookies.get("username");
    const token = Cookies.get(username);

    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7268/carHub", {
        accessTokenFactory: () => token,
      }) // backend URL
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  const GetCurrentUser = async () => {
    const name = Cookies.get("username");
    const token = Cookies.get(name);
    const url = generalUrl + `Account/currentUser`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCurrentUser(response.data.user);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  useEffect(() => {
    GetCurrentUser();
  }, []);

  const CheckCarIsFav = async () => {
    for (let i = 0; i < myFavs.length; i++) {
      if (myFavs[i].id == data.id) {
        setIsFav(true);
        return true;
      }
    }
    return false;
  };

  function GetMovie() {
    axios.get(generalUrl + `Car/${id}`).then((d) => {
      setData(d.data);
      // console.log(d.data);
      // alert("Bombine: " + d.data.customIdentityUser.id);
      GetSharer(d.data.customIdentityUser.id);
      const parsed = parseFeedbacks(d.data.feedBacks);
      // alert(d.data.feedBacks);
      setParsedFeedbacks(parsed);
    });
  }

  useEffect(() => {
    GetMovie();
    // GetSharer();
  }, []);

  const parseFeedbacks = (feedbackList) => {
    if (!Array.isArray(feedbackList)) return [];

    return feedbackList.map((fb) => {
      const [text, userName] = fb.split("|||").map((x) => x.trim());
      return { text, userName };
    });
  };

  const navigate = useNavigate();

  function GetSharer(userId) {
    const name = Cookies.get("username");
    const token = Cookies.get(name);
    // alert("Sharer: " + userId);

    axios
      .get(generalUrl + `Account/getUserById/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((d) => {
        setSharer(d.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate("/login"); // Əgər 401 xətasıdırsa login səhifəsinə yönləndir
        } else {
          console.error("GetSharer Error:", error);
        }
      });
  }

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

      console.log("car (d):", data);
      console.log("myFavs (favs):", favs);

      SelectedCarIsFav(favs, data); // d → aktiv maşın
    } catch (err) {
      console.error("Favları gətirərkən xəta:", err);
    }
  };

  useEffect(() => {
    if (data) {
      GetMyFavs(); // səhifə açılanda çağırılır
    }
  }, [data]);

  async function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (isFav == false) {
      // data.isFav = true;
      // data.color = "red";
      // setColor("red");
      const name = Cookies.get("username");
      const token = Cookies.get(name);
      setIsFav(true);
      await axios
        .post(generalUrl + `Car/addToFav/${data.id}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => alert("Added successfully"));
    } else {
      data.isFav = false;
      data.color = "black";
      // setColor("white");
      const name = Cookies.get("username");
      const token = Cookies.get(name);
      setIsFav(false);
      // SelectedCarIsFav();
      await axios
        .delete(generalUrl + `Car/removeFromFav/${data.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => alert("Deleted successfully"));
    }

    await GetMyFavs();

    // window.location.reload();

    // axios.put(url4 + `/${data.id}`, data).then((data) => console.log(data));
    // dispatch(updateCar({ id: d.id, car: d }));
  }

  function changeImage() {
    index.current++;
    if (index.current == 3) {
      index.current = 0;
    }

    console.log(index.current);
  }

  function changeImage2() {
    index.current--;

    if (index.current == -1) {
      index.current = 2;
    }

    console.log(index.current);
  }

  function handleSetFeedBack(e) {
    setFeedback(e);
  }

  function handleAddFeedback() {
    const updatedCar = {
      id: data.id,
      marka: data.marka,
      model: data.model,
      color: data.color,
      year: data.year,
      km: data.km,
      price: data.price,
      description: data.description,
      situation: data.situation,
      banType: data.banType,
      engine: data.engine,
      march: data.march,
      gearBox: data.gearBox,
      gear: data.gear,
      market: data.market,
      fuelType: data.fuelType,
      city: data.city,
      url1: data.url1,
      url2: data.url2,
      url3: data.url3,
      feedBacks: `${feedback} ||| ${currentUser.userName}`,
    };

    const name = Cookies.get("username");
    const token = Cookies.get(name);

    axios
      .put(`https://localhost:7268/api/Car/${data.id}`, updatedCar, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Car updated successfully:", response.data);
        setFeedback("");
        // alert("Car updated successfully!");
        // navigate("/myAnnouncements");
      })
      .catch((error) => {
        alert("Error updating car:", error);
      });
  }

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("SignalR bağlantısı quruldu.");

          // Gələn feedback-i dinlə
          connection.on("ReceiveFeedback", (d) => {
            console.log("Carid:", d.carId);
            console.log("Id: ", id);

            console.log("Car:", data);

            console.log("Carid2:", data.id);

            if (d.carId == id) {
              // setFeedbacks(prev => [...prev, data.newFeedback]);
              console.log("Received feedback:", d.newFeedback);
              parseFeedbacks(d.newFeedback);
              GetMovie();
            }
          });
        })
        .catch((err) => console.log("Bağlantı xətası:", err));
    }
  }, [connection, id]);

  return (
    <section
      style={{
        width: "80%",
        backgroundColor: "white",
        marginLeft: "7%",
      }}
    >
      <Link
        to={`${path}`}
        style={{
          display: "flex",
          justifyContent: "start",
          marginTop: "30px",
          marginBottom: "30px",
          textDecoration: "none",
          color: isFav ? "red" : "black",
        }}
      >
        <h1
          style={{ paddingLeft: "0px", fontSize: "2em", fontWeight: "bolder" }}
        >
          {data.Marka}
        </h1>
        <h1
          style={{ paddingLeft: "20px", fontSize: "2em", fontWeight: "bolder" }}
        >
          {data.Model}
        </h1>
        <h1
          style={{ paddingLeft: "20px", fontSize: "2em", fontWeight: "bolder" }}
        >
          {data.Engine}
        </h1>
        <h1
          style={{ paddingLeft: "20px", fontSize: "2em", fontWeight: "bolder" }}
        >
          {data.March}
        </h1>
      </Link>

      <section style={{ position: "relative" }}>
        <img
          style={{
            width: "100%",
            height: "90vh",
            borderRadius: "10px",
            display: `${index.current == 0 ? "block" : "none"}`,
          }}
          src={data.url1}
          alt="car image 1"
        />
        <img
          style={{
            width: "100%",
            height: "90vh",
            borderRadius: "10px",
            display: `${index.current == 1 ? "block" : "none"}`,
          }}
          src={data.url2}
          alt="car image 2"
        />
        <img
          style={{
            width: "100%",
            height: "90vh",
            borderRadius: "10px",
            display: `${index.current == 2 ? "block" : "none"}`,
          }}
          src={data.url3}
          alt="car image 3"
        />
        <FontAwesomeIcon
          icon={faChevronLeft}
          onClick={changeImage2}
          className="arrow-design"
        />
        <FontAwesomeIcon
          icon={faChevronRight}
          className="arrow-design"
          onClick={changeImage}
          style={{ left: "90%" }}
        />
        <FontAwesomeIcon
          icon={faHeart}
          style={{
            position: "absolute",
            top: "10px",
            left: "93%",
            fontSize: "3em",
            color: isFav ? "red" : "black",
          }}
          onClick={(e) => handleClick(e)}
        />
      </section>

      <hr style={{ marginTop: "30px" }} />

      <section
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "start",
          marginTop: "20px",
        }}
      >
        <section style={{ width: "50%", backgroundColor: "white" }}>
          <section style={{ display: "flex", justifyContent: "start" }}>
            <h1
              style={{
                width: "50%",
                fontSize: "1.3em",
                color: "grey",
                paddingTop: "10px",
              }}
            >
              City
            </h1>
            <h1 style={{ width: "50%", fontSize: "1.3em", paddingTop: "10px" }}>
              {data.city}
            </h1>
          </section>
          <section style={{ display: "flex", justifyContent: "start" }}>
            <h1
              style={{
                width: "50%",
                fontSize: "1.3em",
                color: "grey",
                paddingTop: "10px",
              }}
            >
              Brand
            </h1>
            <h1 style={{ width: "50%", fontSize: "1.3em", paddingTop: "10px" }}>
              {data.marka}
            </h1>
          </section>
          <section style={{ display: "flex", justifyContent: "start" }}>
            <h1
              style={{
                width: "50%",
                fontSize: "1.3em",
                color: "grey",
                paddingTop: "10px",
              }}
            >
              Model
            </h1>
            <h1 style={{ width: "50%", fontSize: "1.3em", paddingTop: "10px" }}>
              {data.model}
            </h1>
          </section>
          <section style={{ display: "flex", justifyContent: "start" }}>
            <h1
              style={{
                width: "50%",
                fontSize: "1.3em",
                color: "grey",
                paddingTop: "10px",
              }}
            >
              Year
            </h1>
            <h1 style={{ width: "50%", fontSize: "1.3em", paddingTop: "10px" }}>
              {data.year}
            </h1>
          </section>
          <section style={{ display: "flex", justifyContent: "start" }}>
            <h1
              style={{
                width: "50%",
                fontSize: "1.3em",
                color: "grey",
                paddingTop: "10px",
              }}
            >
              Ban Type
            </h1>
            <h1 style={{ width: "50%", fontSize: "1.3em", paddingTop: "10px" }}>
              {data.banType}
            </h1>
          </section>
          <section style={{ display: "flex", justifyContent: "start" }}>
            <h1
              style={{
                width: "50%",
                fontSize: "1.3em",
                color: "grey",
                paddingTop: "10px",
              }}
            >
              Color
            </h1>
            <h1 style={{ width: "50%", fontSize: "1.3em", paddingTop: "10px" }}>
              {data.color}
            </h1>
          </section>
          <section style={{ display: "flex", justifyContent: "start" }}>
            <h1
              style={{
                width: "50%",
                fontSize: "1.3em",
                color: "grey",
                paddingTop: "10px",
              }}
            >
              Fuel Type
            </h1>
            <h1 style={{ width: "50%", fontSize: "1.3em", paddingTop: "10px" }}>
              {data.fuelType}
            </h1>
          </section>
        </section>

        <section
          style={{ width: "50%", backgroundColor: "white", marginLeft: "10%" }}
        >
          <section style={{ display: "flex", justifyContent: "start" }}>
            <h1
              style={{
                width: "50%",
                fontSize: "1.3em",
                color: "grey",
                paddingTop: "10px",
              }}
            >
              Gear Box
            </h1>
            <h1 style={{ width: "50%", fontSize: "1.3em", paddingTop: "10px" }}>
              {data.gearBox}
            </h1>
          </section>
          <section style={{ display: "flex", justifyContent: "start" }}>
            <h1
              style={{
                width: "50%",
                fontSize: "1.3em",
                color: "grey",
                paddingTop: "10px",
              }}
            >
              Gear
            </h1>
            <h1 style={{ width: "50%", fontSize: "1.3em", paddingTop: "10px" }}>
              {data.gear}
            </h1>
          </section>
          <section style={{ display: "flex", justifyContent: "start" }}>
            <h1
              style={{
                width: "50%",
                fontSize: "1.3em",
                color: "grey",
                paddingTop: "10px",
              }}
            >
              Is New?
            </h1>
            <h1 style={{ width: "50%", fontSize: "1.3em", paddingTop: "10px" }}>
              {data.isNew == true ? "Yes" : "No"}
            </h1>
          </section>

          <section style={{ display: "flex", justifyContent: "start" }}>
            <h1
              style={{
                width: "50%",
                fontSize: "1.3em",
                color: "grey",
                paddingTop: "10px",
              }}
            >
              Price
            </h1>
            <h1 style={{ width: "50%", fontSize: "1.3em", paddingTop: "10px" }}>
              {data.price} $
            </h1>
          </section>
          <section style={{ display: "flex", justifyContent: "start" }}>
            <h1
              style={{
                width: "50%",
                fontSize: "1.3em",
                color: "grey",
                paddingTop: "10px",
              }}
            >
              Status
            </h1>
            <h1 style={{ width: "50%", fontSize: "1.3em", paddingTop: "10px" }}>
              {data.situation}
            </h1>
          </section>
          <section style={{ display: "flex", justifyContent: "start" }}>
            <h1
              style={{
                width: "50%",
                fontSize: "1.3em",
                color: "grey",
                paddingTop: "10px",
              }}
            >
              March
            </h1>
            <h1 style={{ width: "50%", fontSize: "1.3em", paddingTop: "10px" }}>
              {data.march} km
            </h1>
          </section>
          <section style={{ display: "flex", justifyContent: "start" }}>
            <h1
              style={{
                width: "50%",
                fontSize: "1.3em",
                color: "grey",
                paddingTop: "10px",
              }}
            >
              Engine
            </h1>
            <h1 style={{ width: "50%", fontSize: "1.3em", paddingTop: "10px" }}>
              {data.engine}
            </h1>
          </section>
        </section>
      </section>
      <hr style={{ marginTop: "30px" }} />
      <section>
        <p style={{ fontSize: "1.2em", marginTop: "30px" }}>
          {data.description}
        </p>
      </section>
      <hr style={{ marginTop: "30px" }} />
      <section>
        <p style={{ fontSize: "1.2em", marginTop: "30px" }}>
          {sharer.firstName} {sharer.lastName} - {sharer.phoneNumber}
        </p>
      </section>
      <hr style={{ marginTop: "30px" }} />
      <section style={{ marginTop: "30px" }}>
        {data.feedBacks == (undefined || null) ? (
          <section>
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              No Feedbacks
            </h2>
            {sharer.id != currentUser.id ? (
              <section>
                <textarea
                  placeholder="Add Feedback"
                  style={{
                    width: "97.5%",
                    height: "100px",
                    borderRadius: "10px",
                    padding: "10px",
                    margin: "auto",
                    marginBottom: "20px",
                    marginTop: "30px",
                  }}
                  onChange={(e) => handleSetFeedBack(e.target.value)}
                  value={feedback}
                ></textarea>
                <button
                  style={{
                    backgroundColor: "#f97316",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    margin: "auto",
                    fontSize: "1em",
                    width: "120px",
                  }}
                  onClick={() => handleAddFeedback()}
                >
                  Add your feedback
                </button>
              </section>
            ) : (
              <textarea
                placeholder="You can't add feedback your own post"
                style={{
                  width: "97.5%",
                  height: "100px",
                  borderRadius: "10px",
                  padding: "10px",
                  margin: "auto",
                  marginBottom: "20px",
                  marginTop: "30px",
                }}
                value={feedback}
                disabled
              ></textarea>
            )}
          </section>
        ) : (
          <section className="feedback-section">
            <h2 className="feedback-title">Feedbacks</h2>
            <div className="feedback-container">
              {parsedFeedbacks.map((item, index) => (
                <div key={index} className="feedback-card">
                  <p className="feedback-text">"{item.text}"</p>
                  <div className="feedback-author">— {item.userName}</div>
                </div>
              ))}
            </div>
            {sharer.id != currentUser.id ? (
              <section>
                <textarea
                  placeholder="Add Feedback"
                  style={{
                    width: "97.5%",
                    height: "100px",
                    borderRadius: "10px",
                    padding: "10px",
                    margin: "auto",
                    marginBottom: "20px",
                    marginTop: "30px",
                  }}
                  onChange={(e) => handleSetFeedBack(e.target.value)}
                  value={feedback}
                ></textarea>
                <button
                  style={{
                    backgroundColor: "#f97316",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    margin: "auto",
                    fontSize: "1em",
                    width: "120px",
                  }}
                  onClick={() => handleAddFeedback()}
                >
                  Add your feedback
                </button>
              </section>
            ) : (
              <textarea
                placeholder="You can't add feedback your own post"
                style={{
                  width: "97.5%",
                  height: "100px",
                  borderRadius: "10px",
                  padding: "10px",
                  margin: "auto",
                  marginBottom: "20px",
                  marginTop: "30px",
                }}
                value={feedback}
                disabled
              ></textarea>
            )}
          </section>
        )}
      </section>
    </section>
  );
}
