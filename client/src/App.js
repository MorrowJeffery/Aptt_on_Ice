import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/navbar/Navbar";
import Landing from "./components/landing/homepage";
import RegisterUser from "./components/landing/users/Register";
import LoginUser from "./components/landing/users/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import UserDashboard from "./components/dashboard/Dashboard-User";
import InstructorDashboard from "./components/dashboard/Dashboard-Instructor"
import LoginInstructor from "./components/landing/instructors/login";
import RegisterInstructor from "./components/landing/instructors/register";

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={RegisterUser} />
            <Route exact path="/login" component={LoginUser} />
            <Route exact path="/registerInstructor" component={RegisterInstructor} />
            <Route exact path="/instructorLogin" component={LoginInstructor} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={UserDashboard} />
              <PrivateRoute exact path="/instructor/dashboard" component={InstructorDashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
