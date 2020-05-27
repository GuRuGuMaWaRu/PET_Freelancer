import React, { useReducer } from "react";
import axios from "axios";

import ClientContext from "./clientContext";
import clientReducer from "./clientReducer";
import { GET_CLIENTS, CREATE_CLIENT } from "../types";

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

      dispatch({ type: GET_CLIENTS, payload: clients });
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  const createClient = async data => {
    try {
      const clientName = data.client;

      // if (state.clients.includes(clientName)) {
      //   throw new Error("There is already a client with this name");
      // }

      const res = await axios.post("/api/v1/clients", { name: clientName });

      const client = res.data.data.data;

      dispatch({ type: CREATE_CLIENT, payload: client });
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <ClientContext.Provider
      value={{
        clients: state.clients,
        loadingClients: state.loadingClients,
        getClients,
        createClient
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientState;
