import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header/Header";
import Menu from "./Components/Menu/Menu";
import Filter from "./Components/Filter/Filter";
import Cars from "./Components/Cars/Cars";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FavCars from "./Components/FavouriteCars/FavCars";
import AddCar from "./Components/AddCar";
import AllInfo from "./Components/AllInfo";
import FilteredCars from "./Components/FilteredCars/FilteredCars";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Main from "./Components/Main/Main";
import Profile from "./Components/Profile/Profile";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";

function App() {
  return (
    <Router>
      <section style={{ paddingBottom: "100px" }}>
        {/* <Header></Header> */}
        <Menu></Menu>
        <section style={{ width: "73%", margin: "auto", textWrap: "wrap" }}>
          <Routes>
            <Route exact path="/" element={<Cars />} component={Cars}></Route>
            <Route
              exact
              path="/:id"
              element={<AllInfo />}
              component={AllInfo}
            ></Route>
            <Route
              exact
              path="/favourites"
              element={<FavCars />}
              component={FavCars}
            ></Route>
            <Route
              exact
              path="/favourites/:id"
              element={<AllInfo />}
              component={AllInfo}
            ></Route>
            <Route
              exact
              path="/new_announcement"
              element={<AddCar />}
              component={AddCar}
            ></Route>
            <Route
              exact
              path="/filtered_cars"
              element={<FilteredCars />}
              component={FilteredCars}
            ></Route>
            <Route
              exact
              path="/filtered_cars/:id"
              element={<AllInfo />}
              component={AllInfo}
            ></Route>
            <Route
              exact
              path="/login"
              element={<Login />}
              component={Login}
            ></Route>
            <Route
              exact
              path="/register"
              element={<Register />}
              component={Register}
            ></Route>
            <Route
              exact
              path="/main"
              element={<Main />}
              component={Main}
            ></Route>

            <Route
              exact
              path="/profile"
              element={<Profile />}
              component={Profile}
            ></Route>

            <Route
              exact
              path="/updateProfile"
              element={<UpdateProfile />}
              component={UpdateProfile}
            ></Route>
            <Route exact path="*" element={<Cars />} component={Cars}></Route>
          </Routes>
        </section>
      </section>
    </Router>
  );
}

export default App;
