import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  marka:"",
  model:"",
  city:"",
  priceMin:"",
  priceMax:"",
  yearMin:"",
  yearMax:"",
  info:"Hamısı",
  path:"",

};

export const filteredDataSlice = createSlice({
  name: "filteredData",
  initialState,
  reducers: {
    changeMarka: (state,action) => {
      state.marka = action.payload;
    },
    changeModel: (state,action) => {
      state.model = action.payload;
    },
    changeInfo: (state, action) => {
      state.info = action.payload;
    },
    changeCity: (state, action) => {
      state.city = action.payload;
    },
    changePriceMin: (state, action) => {
      state.priceMin = action.payload;
    },
    changePriceMax: (state, action) => {
      state.priceMax = action.payload;
    },
    changeYearMin: (state, action) => {
      state.yearMin = action.payload;
    },
    changeYearMax: (state, action) => {
      state.yearMax = action.payload;
    },
    changePath: (state, action) => {
      state.path = action.payload;
    },
  },
});

export const { changeMarka, changeModel,changeInfo,changeCity,changePriceMin,changePriceMax,changeYearMin,changeYearMax,changePath } = filteredDataSlice.actions;
export default filteredDataSlice.reducer;

