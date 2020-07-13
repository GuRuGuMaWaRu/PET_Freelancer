import { combineReducers } from "@reduxjs/toolkit";

import clientsReducer from "./clientsSlice";
import filtersReducer from "./filtersSlice";
import alertsReducer from "./alertsSlice";

const rootReducer = combineReducers({
  clients: clientsReducer,
  filters: filtersReducer,
  alerts: alertsReducer
});

export default rootReducer;
