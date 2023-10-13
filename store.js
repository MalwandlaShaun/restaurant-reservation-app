import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./features/restaurantSlice";
import apiReducer from "./features/apiSlice";
import { apiSlice } from "./features/apiSlice";
const store = configureStore({
  reducer: {
    restaurants : restaurantReducer,
    api: apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
