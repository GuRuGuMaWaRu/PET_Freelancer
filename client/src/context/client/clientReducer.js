import {
  GET_CLIENTS,
  CREATE_CLIENT,
  CLEAR_CLIENT_DATA,
  TOGGLE_FILTER
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CLIENTS:
      return {
        ...state,
        clients: action.payload,
        loadingClients: false,
        filterableProps: {
          ...state.filterableProps,
          client: action.payload.map(client => ({
            propName: "client",
            filterName: client.name,
            status: client.name,
            selected: false
          }))
        }
      };
    case CREATE_CLIENT:
      return {
        ...state,
        clients: [...state.clients, action.payload],
        filterableProps: {
          ...state.filterableProps,
          client: [
            ...state.filterableProps.client,
            {
              propName: "client",
              filterName: action.payload.name,
              status: action.payload.name,
              selected: false
            }
          ]
        }
      };
    case CLEAR_CLIENT_DATA:
      return {
        ...state,
        clients: null,
        loadingClients: true
      };
    case TOGGLE_FILTER:
      const { propName, filterName } = action.payload;
      return {
        ...state,
        filterableProps: {
          ...state.filterableProps,
          [propName]: state.filterableProps[propName].map(filter => {
            if (filter.filterName === filterName) {
              return { ...filter, selected: !filter.selected };
            }
            return filter;
          })
        }
      };
    default:
      return state;
  }
};
