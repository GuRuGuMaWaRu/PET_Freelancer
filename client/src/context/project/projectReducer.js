import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
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
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.map(project => {
          if (project._id === action.payload._id) {
            return action.payload;
          }
          return project;
        })
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
    case UPDATE_PROJECT_FAILURE:
    case DELETE_PROJECT_FAILURE:
      return state;
    default:
      return state;
  }
};
