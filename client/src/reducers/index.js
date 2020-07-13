import { combineReducers } from "@reduxjs/toolkit";

import clientsReducer from "./clientsSlice";
import filtersReducer from "./filtersSlice";

const rootReducer = combineReducers({
  clients: clientsReducer,
  filters: filtersReducer
});

export default rootReducer;
