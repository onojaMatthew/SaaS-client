import { configureStore } from '@reduxjs/toolkit';
import authSlice from "./authSlice";
import bookSlice from "./bookSlice";
import recommendationSlice from "./recommendationSlice";

// Create the Redux store
export const store = configureStore({
  reducer: {
   auth: authSlice,
   book: bookSlice,
   recommendation: recommendationSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});





