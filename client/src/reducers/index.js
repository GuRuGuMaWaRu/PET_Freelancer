import { combineReducers } from "@reduxjs/toolkit";

import clientsReducer from "./clientsSlice";

const rootReducer = combineReducers({
  clients: clientsReducer
});

export default rootReducer;
