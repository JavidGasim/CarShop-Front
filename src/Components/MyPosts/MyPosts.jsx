import React, { useEffect, useState } from "react";
import Car from "../Cars/Car";
import axios from "axios";
import Cookies from "js-cookie";
import MyCar from "../MyCar/MyCar";

export default function MyPosts() {
  const [datas, setDatas] = useState();
  const [currentUser, setCurrentUser] = useState({
    id: null,
    userName: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
    email: "",
    phoneNumber: "",
    city: "",
  });
  const generalUrl = "https://localhost:7268/api/";

  useEffect(() => {
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
        if (currentUser.id != null) {
          GetUserCar();
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  });

  //   useEffect(() => {
  async function GetUserCar() {
    console.log(currentUser.id);

    const url = generalUrl + `Car/getUserCar/${currentUser.id}`;
    const name = Cookies.get("username");
    const token = Cookies.get(name);

    await axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setDatas(response.data);
      });
  }
  //   }, [currentUser]);
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
          My Announcements
        </h1>
      </section>
      <section
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "start" }}
      >
        {datas && datas.map((d) => <MyCar d={d}></MyCar>)}
      </section>
    </section>
  );
}
