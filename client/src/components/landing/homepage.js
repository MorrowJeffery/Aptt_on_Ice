import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              Apt-On-Ice-2.0
            </h4>
            <p className="flow-text grey-text text-darken-1">
              For all your scheduling needs
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Log In
              </Link>
            </div>
            <div className="col s12">
              <Link
                to="/instructorLogin"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Instructor Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
