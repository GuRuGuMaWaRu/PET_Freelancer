import { combineReducers } from "@reduxjs/toolkit";

import mainReducer from "./index";
import clientsReducer from "./clientsSlice";

const rootReducer = combineReducers({
  main: mainReducer,
  clients: clientsReducer
});

export default rootReducer;
