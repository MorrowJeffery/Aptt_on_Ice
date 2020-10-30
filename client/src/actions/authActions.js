import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, SET_CURRENT_INSTRUCTOR, USER_LOADING, INSTRUCTOR_LOADING } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Register Instructor
export const registerInstructor = (instructorData, history) => dispatch => {
  axios
    .post("/api/instructors/register", instructorData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtTokenUSR", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login Instructor - get token
export const loginInstructor = instructorData => dispatch => {
  axios
    .post("/api/instructors/login", instructorData)
    .then(res => {
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtTokenINS", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current instructor
      dispatch(setCurrentInstructor(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Refresh state from token if user refreshes
export const refreshUser = tkn => dispatch => {
  const decoded = jwt_decode(tkn);
  dispatch(setCurrentUser(decoded));
}

// Refresh state from token if instructor refreshes
export const refreshInstructor = tkn => dispatch => {
  const decoded = jwt_decode(tkn);
  dispatch(setCurrentInstructor(decoded));
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Set logged in instructor
export const setCurrentInstructor = decoded => {
  return {
    type: SET_CURRENT_INSTRUCTOR,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Instructor loading
export const setInstructorLoading = () => {
  return {
    type: INSTRUCTOR_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtTokenUSR");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Log instructor out
export const logoutInstructor = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtTokenINS");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentInstructor({}));
};