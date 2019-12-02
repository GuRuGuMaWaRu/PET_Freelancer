import { GET_PROJECTS_SUCCESS, GET_PROJECTS_FAILURE } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload
      };
    case GET_PROJECTS_FAILURE:
      return state;
    default:
      return state;
  }
};
