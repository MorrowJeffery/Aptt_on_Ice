import { SET_CURRENT_USER, SET_CURRENT_INSTRUCTOR, USER_LOADING, INSTRUCTOR_LOADING } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  instructor: {},
  loading: false,
  isUser: false,
  isInstructor: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        isUser: !isEmpty(action.payload)
      };
    case SET_CURRENT_INSTRUCTOR:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        instructor: action.payload,
        isInstructor: !isEmpty(action.payload)
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case INSTRUCTOR_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
