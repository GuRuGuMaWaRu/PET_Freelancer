import { combineReducers } from "@reduxjs/toolkit";

import projectsReducer from "./projectsSlice";
import clientsReducer from "./clientsSlice";
import filtersReducer from "./filtersSlice";
import notificationsReducer from "./notificationsSlice";

const rootReducer = combineReducers({
  projects: projectsReducer,
  clients: clientsReducer,
  filters: filtersReducer,
  notifications: notificationsReducer
});

export default rootReducer;
