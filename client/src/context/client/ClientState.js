import React, { useReducer } from "react";
import axios from "axios";

import ClientContext from "./clientContext";
import clientReducer from "./clientReducer";
import { GET_CLIENTS_SUCCESS } from "../types";

const ClientState = props => {
  const initialState = {
    clients: null,
    loadingClients: true
  };

  const [state, dispatch] = useReducer(clientReducer, initialState);

  const getClients = async () => {
    try {
      const res = await axios.get("/api/v1/clients");

      const clients = res.data.data.data;

      dispatch({ type: GET_CLIENTS_SUCCESS, payload: clients });
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <ClientContext.Provider
      value={{
        clients: state.clients,
        loadingClients: state.loadingClients,
        getClients
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientState;
