import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login() {
  var generalUrl = "https://localhost:7268/api/";

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const togglePassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  async function LoginUser() {
    var url = generalUrl + `Account/login`;

    var obj = {
      userName: formData.username,
      password: formData.password,
    };

    await axios
      .post(url, obj)
      .then((response) => {
        Cookies.set(
          formData.username,
          response.data.token,
          response.data.role,
          {
            expires: 30,
          }
        );
        Cookies.set("username", formData.userName, { expires: 30 });
        Cookies.set("role", response.data.role, { expires: 30 });
        console.log(response.data.role);
        alert("Login successfully!");
      })
      .catch((error) => {
        alert("Not found User!");
      });
  }

  return (
    <div className="login-container">
      <h1 style={{ fontSize: "1.5em" }}>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          onChange={handleChange}
        />
        <div className="password-wrapper">
          <input
            className="login-input"
            placeholder="Password"
            onChange={handleChange}
            type={passwordVisible ? "text" : "password"}
          />
          <button
            type="button"
            className="toggle-button"
            onClick={togglePassword}
          >
            {passwordVisible ? "Hide" : "Show"}
          </button>
        </div>

        <button className="login-button">Login</button>
        <p style={{ marginTop: "10px" }}>
          You don't have account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
