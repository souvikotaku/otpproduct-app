// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    productid: "",
    productobjectarray: [],
    productobjectarraycart: [],
    productobject: {},
    frompage: "",
  },
  reducers: {
    productId: (state, action) => {
      state.productid = action.payload;
    },
    productObject: (state, action) => {
      state.productobject = action.payload;
    },
    productObjectarray: (state, action) => {
      state.productobjectarray.push(action.payload);
    },

    productObjectarrayremove: (state, action) => {
      state.productobjectarray = state.productobjectarray.filter(
        (item) => item.id !== action.payload.id
      );
    },
    productObjectarraycart: (state, action) => {
      state.productobjectarraycart.push(action.payload);
    },
    productObjectarraycartremove: (state, action) => {
      state.productobjectarraycart = state.productobjectarraycart.filter(
        (item) => item.id !== action.payload.id
      );
    },
    productObjectarraycartadd: (state, action) => {
      state.productobjectarraycart = action.payload;
    },

    clearArraycart: (state, action) => {
      state.productobjectarraycart = [];
    },
    fromPage: (state, action) => {
      state.frompage = action.payload;
    },
  },
});

export const {
  productId,
  productObjectarray,
  productObjectarraycart,
  productObjectarraycartadd,
  productObject,
  productObjectarrayremove,
  productObjectarraycartremove,
  clearArraycart,
  fromPage,
} = dataSlice.actions;
export default dataSlice.reducer;
