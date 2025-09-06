import { configureStore } from "@reduxjs/toolkit";
import reducer from "./authSlice.js";

const store = configureStore({
  reducer: {
    reducer,
  },
});

export default store;
