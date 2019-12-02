import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload
      };
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [
          ...state.projects.filter(
            project => project.date > action.payload.date
          ),
          action.payload,
          ...state.projects.filter(
            project =>
              project.date < action.payload.date ||
              project.date === action.payload.date
          )
        ]
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.filter(
          project => project._id !== action.payload
        )
      };
    case GET_PROJECTS_FAILURE:
    case CREATE_PROJECT_FAILURE:
    case DELETE_PROJECT_FAILURE:
      return state;
    default:
      return state;
  }
};
