import {
  GET_PROJECTS_SUCCESS,
  CREATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_SUCCESS,
  DELETE_PROJECT_SUCCESS,
  SET_CURRENT_PROJECT_ID,
  GET_CURRENT_SUCCESS,
  CLEAR_CURRENT_PROJECT,
  SET_DELETED,
  CLOSE_MODAL,
  CLEAR_PROJECT_DATA,
  TOGGLE_PAID
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
    case SET_CURRENT_PROJECT_ID:
      return {
        ...state,
        currentId: action.payload
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
        currentId: null,
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
        currentId: null,
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
    case CLEAR_PROJECT_DATA:
      return {
        ...state,
        projects: null,
        currentProject: null,
        deleteId: null,
        loadingProjects: true
      };
    case TOGGLE_PAID:
      return {
        ...state,
        projects: state.projects.map(project => {
          if ((project._id = action.id)) {
            return { ...project, paid: !action.paid };
          }
          return project;
        })
      };
    default:
      return state;
  }
};
