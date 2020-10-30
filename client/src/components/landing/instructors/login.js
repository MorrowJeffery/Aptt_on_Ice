import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginInstructor, refreshInstructor, refreshUser } from "../../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (localStorage.getItem("jwtTokenUSR") !== null && (this.props.auth.isAuthenticated)) {
      this.props.history.push("/dashboard");
    } 
    // If the user has a user token but doesn't show them as authenticated -- fresh the state using the token
    // else if (localStorage.getItem("jwtTokenUSR") !== null && (!this.props.auth.isAuthenticated)) {
    //   this.props.refreshUser(localStorage.getItem("jwtTokenUSR"));
    //   this.props.history.push("/dashboard");
    // }
    // If logged in and user navigates to Login page, should redirect them to dashboard
    else if (localStorage.getItem("jwtTokenINS") !== null && (this.props.auth.isAuthenticated)) {
      this.props.history.push("/instructor/dashboard");
    }
    // If the user has a user token but doesn't show them as authenticated -- fresh the state using the token
    // else if ((localStorage.getItem("jwtTokenINS") !== null) && (!this.props.auth.isAuthenticated)) {
    //   this.props.refreshInstructor(localStorage.getItem("jwtTokenINS"));
    //   this.props.push("/instructor/dashboard");
    // }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // if the user logs in--let react know an update happened
    if (nextProps.auth.isAuthenticated) {
      return(null)
    }
    // if there were any issues with requests--return the new errors for react to pick up
    if(nextProps.errors !== prevState.errors) {
      return({errors: nextProps.errors})
    }
    else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    // when the instructor is logged in--redirect to the dashboard
    if(prevProps.auth.isAuthenticated!==this.props.auth.isAuthenticated){
      this.setState({errors: {}})
      if (localStorage.getItem("jwtTokenINS") !== null) {
        this.props.history.push("/instructor/dashboard");
      }

    }
    // when react notices a change to errors -- push those changes onto our state/page
    if(prevProps.errors!==this.props.errors){
      this.setState({errors: this.props.errors});
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginInstructor(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12">
              <h4>
                <b>Instructors </b> Login below
              </h4>
              <p className="grey-text text-darken-1">
                Not an instructor? <Link to="/login">Student Login</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12">
                <button
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginInstructor: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginInstructor, refreshInstructor, refreshUser }
)(Login);
