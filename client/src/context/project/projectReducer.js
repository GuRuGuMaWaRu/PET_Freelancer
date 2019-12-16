import {
  GET_PROJECTS_SUCCESS,
  CREATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_SUCCESS,
  DELETE_PROJECT_SUCCESS,
  GET_CURRENT_SUCCESS,
  CLEAR_CURRENT_PROJECT,
  SET_DELETED,
  CLOSE_MODAL,
  GET_CLIENTS_SUCCESS,
  CLEAR_PROJECT_DATA
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        loadingProjects: false
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
    case GET_CURRENT_SUCCESS:
      return {
        ...state,
        currentProject: action.payload
      };
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.map(project => {
          if (project._id === action.payload._id) {
            return action.payload;
          }
          return project;
        }),
        currentProject: null
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.filter(
          project => project._id !== action.payload
        ),
        deleteId: null
      };
    case CLEAR_CURRENT_PROJECT:
      return {
        ...state,
        currentProject: null
      };
    case SET_DELETED:
      return {
        ...state,
        deleteId: action.payload
      };
    case CLOSE_MODAL:
      return {
        ...state,
        deleteId: null
      };
    case GET_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: action.payload,
        loadingClients: false
      };
    case CLEAR_PROJECT_DATA:
      return {
        ...state,
        projects: null,
        currentProject: null,
        deleteId: null,
        clients: null,
        loadingProjects: true,
        loadingClients: true
      };
    default:
      return state;
  }
};
