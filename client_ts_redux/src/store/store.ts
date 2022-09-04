import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/authSlice";
import projectsReducer from "./reducers/projectsSlice";
import clientsReducer from "./reducers/clientsSlice";
import filtersReducer from "./reducers/filtersSlice";
import notificationsReducer from "./reducers/notificationsSlice";

const reducers = {
  auth: authReducer,
  projects: projectsReducer,
  clients: clientsReducer,
  filters: filtersReducer,
  notifications: notificationsReducer
};

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production"
});

export type AddDispatch = typeof store.dispatch;
// export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<typeof store.getState>;
