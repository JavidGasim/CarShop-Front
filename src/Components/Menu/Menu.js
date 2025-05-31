import React, { useState } from "react";
import "./Menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Menu() {
  const token = Cookies.get("username");
  const isLoggedIn = !!token;

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

  var generalUrl = "https://localhost:7268/api/";

  const clearAllCookies = () => {
    const allCookies = Cookies.get(); // Bütün cookie-ləri al
    for (let cookieName in allCookies) {
      Cookies.remove(cookieName);
    }

    window.location.reload();
    console.log("All cookies deleted.");
  };

  function HandleLoggedIn() {
    if (isLoggedIn) {
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
          // setUser(response.data.user);
          console.log(response.data);
          // setArtist(response.data.user);
          setCurrentUser(response.data.user);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  }

  useEffect(() => {
    HandleLoggedIn();
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <section className="menu-section">
          <div>
            <Link
              to="/info"
              className="header-h1"
              style={{ marginTop: "10px" }}
            >
              <FontAwesomeIcon icon={faCircleInfo} />
            </Link>
            <Link to="/" className="header-h1">
              CarShop
            </Link>
          </div>
          <section className="auth-section">
            <Link
              to="/favourites"
              style={{
                textDecoration: "none",
                color: "white",
                marginRight: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#ff9b9b",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              ❤️
            </Link>
            <Link to="/profile" className="profile-link">
              <img
                src={currentUser.profilePicture} // Buraya real şəkil yolu əlavə et
                alt="Profile"
                className="profile-image"
              />
            </Link>

            {/* Add Car Button */}
            <Link to="/new_announcement" className="auth-button">
              Add Car
            </Link>
            <Link className="auth-button" onClick={clearAllCookies}>
              Logout
            </Link>
          </section>
        </section>
      ) : (
        <section className="menu-section">
          <div>
            <Link
              to="/info"
              className="header-h1"
              style={{ marginTop: "10px" }}
            >
              <FontAwesomeIcon icon={faCircleInfo} />
            </Link>
            <Link to="/" className="header-h1">
              CarShop
            </Link>
          </div>
          <section className="auth-section">
            <Link to="/login" className="auth-button">
              Login
            </Link>
            <Link to="/register" className="auth-button">
              Register
            </Link>
          </section>
        </section>
      )}
    </>
  );
}
