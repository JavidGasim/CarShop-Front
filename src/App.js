import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import Menu from './Components/Menu/Menu';
import Filter from './Components/Filter/Filter';
import Cars from './Components/Cars/Cars';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FavCars from './Components/FavouriteCars/FavCars';
import AddCar from './Components/AddCar';
import AllInfo from './Components/AllInfo';
import FilteredCars from './Components/FilteredCars/FilteredCars';

function App() {
  return (
    <Router>
      <section style={{paddingBottom:"100px"}}>
        <Header></Header>
        <Menu></Menu>
        <section style={{width:"73%",margin:"auto",textWrap:"wrap"}}>
          
          <Routes>
            <Route exact path='/' element={<Cars />} component={Cars}></Route>
            <Route exact path='/:id' element={<AllInfo />} component={AllInfo}></Route>
            <Route exact path='/favourites' element={<FavCars />} component={FavCars}></Route>
            <Route exact path='/favourites/:id' element={<AllInfo />} component={AllInfo}></Route>
            <Route exact path='/new_announcement' element={<AddCar />} component={AddCar}></Route>
            <Route exact path='/filtered_cars' element={<FilteredCars />} component={FilteredCars}></Route>
            <Route exact path='/filtered_cars/:id' element={<AllInfo />} component={AllInfo}></Route>

            <Route exact path='*' element={<Cars />} component={Cars}></Route>

          </Routes>
        </section>
      </section>
      
    </Router>
  );
}

export default App;
