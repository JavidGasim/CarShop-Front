import React, { useState } from "react";
import "./Menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

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

  // if (isLoggedIn) {
  //   const name = Cookies.get("username");
  //   const token = Cookies.get(name);
  //   const url = generalUrl + `Account/currentUser`;
  //   axios
  //     .get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       // setUser(response.data.user);
  //       console.log(response.data);
  //       // setArtist(response.data.user);
  //       setCurrentUser(response.data.user);
  //     })
  //     .catch((error) => {
  //       alert(error.response.data.message);
  //     });
  // }

  return (
    <>
      {isLoggedIn ? (
        <section className="menu-section">
          <Link to="/" className="header-h1">
            CarShop
          </Link>
          <section className="auth-section">
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
          <Link to="/" className="header-h1">
            CarShop
          </Link>
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
