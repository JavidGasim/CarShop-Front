import { configureStore } from "@reduxjs/toolkit";
import filteredDataReducer from "../src/Features/FilteredDataSlice";
import carsReducer from "../src/Features/CarsSlice";
export const store = configureStore({
  reducer: {
    filteredData: filteredDataReducer,
    cars: carsReducer,
  },
});