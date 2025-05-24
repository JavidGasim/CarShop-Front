import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function UpdateProfile() {
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
  const generalUrl = "https://localhost:7268/api/";

  const [selectedFile, setSelectedFile] = useState(null);

  const [uploadImg, setUploadImg] = useState(null);

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
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);

  const handleFileChange = async (e) => {
    setSelectedFile(e.target.files[0]);
    await handleUpload();
  };

  const handleUpload = async () => {
    const name = Cookies.get("username");
    const token = Cookies.get(name);

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const uploadResponse = await axios.post(
          generalUrl + "Image/newImage",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Uploaddan gələn URL-i istifadəçi obyektinə əlavə edək
        // updatedUser.profilePicture = uploadResponse.data.imageUrl;
        alert("Şəkil yükləndi.");

        setUploadImg(uploadResponse.data.imageUrl);
      } catch (uploadError) {
        alert("Şəkil yüklənərkən xəta baş verdi.");
        return;
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = Cookies.get("username");
    const token = Cookies.get(name);

    let updatedUser = { ...currentUser };

    // Uploaddan gələn URL-i istifadəçi obyektinə əlavə edək
    updatedUser.profilePicture = uploadImg;

    // İstifadəçi məlumatlarını yeniləyirik
    axios
      .put(generalUrl + "Account/update", updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("Profil uğurla yeniləndi!");
      })
      .catch((error) => {
        alert(
          error.response?.data?.message || "Yeniləmə zamanı xəta baş verdi."
        );
      });
  };

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "lightgrey",
        padding: "50px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div
          className="image-upload-wrapper"
          style={{ marginTop: "0px", marginBottom: "10px" }}
        >
          <label htmlFor="upload-input" className="upload-label">
            {currentUser.profilePicture ? (
              <img
                src={currentUser.profilePicture}
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
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        <input
          type="text"
          name="userName"
          value={currentUser.userName}
          onChange={handleChange}
          readOnly
          style={{ marginBottom: "10px" }}
        />
        <input
          type="text"
          name="firstName"
          value={currentUser.firstName}
          onChange={handleChange}
          style={{ marginBottom: "10px", marginLeft: "160px" }}
        />
        <input
          type="text"
          name="lastName"
          value={currentUser.lastName}
          onChange={handleChange}
          style={{ marginBottom: "10px" }}
        />
        <input
          type="text"
          name="phoneNumber"
          value={currentUser.phoneNumber}
          onChange={handleChange}
          style={{ marginBottom: "10px", marginLeft: "160px" }}
        />
        <input
          type="text"
          name="email"
          value={currentUser.email}
          onChange={handleChange}
          style={{ marginBottom: "10px" }}
        />
        <input
          type="text"
          name="city"
          value={currentUser.city}
          onChange={handleChange}
          style={{ marginBottom: "10px", marginLeft: "160px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: "#f97316",
            color: "white",
            border: "none",
          }}
        >
          Update
        </button>
      </form>
    </section>
  );
}
