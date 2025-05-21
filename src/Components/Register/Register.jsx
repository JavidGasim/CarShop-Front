import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const generalUrl = "https://localhost:7268/api/";

  const [registerLoad, setRegisterLoad] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: "",
    city: "",
  });

  const handleImageChange = async (e) => {
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
    setImagePreview(newPreviewUrl);

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
      setImageUrl(response.data.imageUrl);
      console.log("Şəkil yükləndi:", response.data.imageUrl);
    } catch (error) {
      console.error("Yükləmə xətası:", error);
    }
  };

  const togglePassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", formData.username);
    data.append("firstname", formData.firstname);
    data.append("lastname", formData.lastname);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("city", formData.city);
    if (imageFile) {
      data.append("image", imageFile);
    }

    console.log(data.get("image"));
    console.log(data.get("username"));
    console.log(data.get("firstname"));
    console.log(data.get("lastname"));
    console.log(data.get("email"));
    console.log(data.get("password"));
    console.log(data.get("phoneNumber"));
    console.log(data.get("city"));

    var message = "";
    var url = generalUrl + `Account/existUser?name=${data.get("username")}`;

    await axios
      .post(url)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          console.log("Status:", error.response.data.status);
          console.log("Message:", error.response.data.message);
          console.log("Errors:", error.response.data.error);
          message = error.response.data.message;
        } else {
          console.log("An unexpected error occurred.");
        }
      });

    if (message === "") {
      RegisterUser();
    } else {
      alert(message);
    }
  };

  function RegisterUser() {
    var url = generalUrl + `Account/register`;

    setRegisterLoad(true);

    var obj = {
      username: formData.username,
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
      role: "user",
      imagePath: imageUrl,
      city: formData.city,
      phoneNumber: formData.phoneNumber,
    };

    axios
      .post(url, obj)
      .then((response) => {
        console.log(response.data);
        // alert("Registered successfully!");
        window.location.href = "/login";
      })
      .catch((error) => {
        if (error.response) {
          console.log("Status:", error.response.data.status);
          console.log("Message:", error.response.data.message);
          console.log("Errors:", error.response.data.error);
        } else {
          console.log("An unexpected error occurred.");
        }
      })
      .finally(() => {
        setRegisterLoad(false);
      });
  }

  return (
    <div className="register-container">
      <h1 style={{ fontSize: "1.5em" }}>Register</h1>
      {registerLoad ? (
        <div className="loader-container">
          <div className="loader">
            <img src="/load.gif" alt="loading" />
          </div>
        </div>
      ) : (
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="image-upload-wrapper">
            <label htmlFor="upload-input" className="upload-label">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Uploaded"
                  className="preview-image"
                />
              ) : (
                <div className="default-icon">📷</div>
              )}
            </label>
            <input
              type="file"
              id="upload-input"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          <input
            type="text"
            name="username"
            className="register-input"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="text"
            name="firstname"
            className="register-input"
            placeholder="Firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastname"
            className="register-input"
            placeholder="Lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            className="register-input"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="password-wrapper">
            <input
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
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
          <input
            type="tel"
            name="phoneNumber"
            className="register-input"
            placeholder="Phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            className="register-input"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <button type="submit" className="register-button">
            Register
          </button>
          <p style={{ marginTop: "20px", marginBottom: "10px" }}>
            You have account? <Link to="/login">Login</Link>
          </p>
        </form>
      )}
    </div>
  );
}
