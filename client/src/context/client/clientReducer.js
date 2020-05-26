import { GET_CLIENTS, CREATE_CLIENT } from "../types";

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
    default:
      return state;
  }
};
