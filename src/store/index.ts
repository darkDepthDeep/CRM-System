import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import registrationReducer from "./slices/registrationSlice";
import profileReducer from "./slices/profileSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
    profile: profileReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
