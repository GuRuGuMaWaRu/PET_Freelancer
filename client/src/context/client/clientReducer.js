import { GET_CLIENTS, CREATE_CLIENT, CLEAR_CLIENT_DATA } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CLIENTS:
      return {
        ...state,
        clients: action.payload,
        loadingClients: false
      };
    case CREATE_CLIENT:
      return {
        ...state,
        clients: [...state.clients, action.payload]
      };
    case CLEAR_CLIENT_DATA:
      return {
        ...state,
        clients: null,
        loadingClients: true
      };
    default:
      return state;
  }
};
