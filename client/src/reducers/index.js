import { combineReducers } from "@reduxjs/toolkit";

import projectsReducer from "./projectsSlice";
import clientsReducer from "./clientsSlice";
import filtersReducer from "./filtersSlice";
import alertsReducer from "./alertsSlice";

const rootReducer = combineReducers({
  projects: projectsReducer,
  clients: clientsReducer,
  filters: filtersReducer,
  alerts: alertsReducer
});

export default rootReducer;
