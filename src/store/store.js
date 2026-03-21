import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import notificationsReducer from "./notificationsSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    notifications: notificationsReducer,
  },
});
