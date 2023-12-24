import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    phnumber: "",
  },
  reducers: {
    phNumber: (state, action) => {
      state.phnumber = action.payload;
    },
  },
});

export const { phNumber } = dataSlice.actions;
export default dataSlice.reducer;
