import React, { useReducer } from "react";
import axios from "axios";

import ClientContext from "./clientContext";
import clientReducer from "./clientReducer";

const ClientState = props => {
  const initialState = {
    clients: null,
    loadingClients: true
  };

  const [state, dispatch] = useReducer(clientReducer, initialState);

  return (
    <ClientContext.Provider value={{ clients: state.clients }}>
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientState;
