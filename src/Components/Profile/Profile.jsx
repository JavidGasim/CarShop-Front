import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        backgroundColor: "lightgrey",
        paddingBottom: "100px",
      }}
    >
      <h1 style={{ textAlign: "center", marginTop: "50px", fontSize: "40px" }}>
        My Profile
      </h1>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "50px",
          marginTop: "50px",
        }}
      >
        <Link
          to="/updateProfile"
          style={{
            color: "black",
            textDecoration: "none",
            fontSize: "20px",
            border: "1px solid black",
            padding: "10px 20px",
            borderRadius: "10px",
            backgroundColor: "#f97316",
            width: "180px",
            textAlign: "center",
          }}
        >
          Update Profile
        </Link>
        <Link
          to="/myAnnouncements"
          style={{
            color: "black",
            textDecoration: "none",
            fontSize: "20px",
            border: "1px solid black",
            padding: "10px 20px",
            borderRadius: "10px",
            backgroundColor: "#f97316",
            width: "180px",
            textAlign: "center",
          }}
        >
          My Announcements
        </Link>
      </section>
    </section>
  );
}
