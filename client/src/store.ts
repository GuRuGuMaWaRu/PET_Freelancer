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
  reducer: reducers
});

export type AddDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept(reducers, () => {
    const newRootReducer = reducers;
    store.replaceReducer(newRootReducer);
  });
}
