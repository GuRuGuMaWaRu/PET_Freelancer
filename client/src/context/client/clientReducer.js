import { GET_CLIENTS_SUCCESS } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: action.payload,
        loadingClients: false
      };
    default:
      return state;
  }
};
