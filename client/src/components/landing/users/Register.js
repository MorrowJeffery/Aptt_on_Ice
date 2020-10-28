import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import { registerUser } from "../../../actions/authActions";

class RegisterUser extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            phoneNumber: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to
        // dashboard
        if (this.props.auth.isAuthenticated) {
            this
                .props
                .history
                .push("/dashboard");
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if(nextProps.errors !== prevState.errors) {
        return({errors: nextProps.errors})
      }
      else return null;
    }
  
    componentDidUpdate(prevProps, prevState) {
      if(prevProps.errors!==this.props.errors){
        //Perform some operation here
        this.setState({errors: this.props.errors});
      }
    }

    // componentWillReceiveProps(nextProps) {   if (nextProps.errors) {
    // this.setState({       errors: nextProps.errors     });   } }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            phoneNumber: this.state.phoneNumber
        };

        this.props.registerUser(newUser, this.props.history);

    };

    render() {
        const {errors} = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i>
                            Back to home
                        </Link>
                        <div className="col s12">
                            <h4>
                                <b>Register</b>
                                below
                            </h4>
                            <p className="grey-text text-darken-1">
                                Already have an account?
                                <Link to="/login">Log in</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>

                          {/* input - name */}
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    className={classnames("", {invalid: errors.name})}/>
                                <label htmlFor="name">Name</label>
                                <span className="red-text">{errors.name}</span>
                            </div>

                              {/* input email */}
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {invalid: errors.email})}/>
                                <label htmlFor="email">Email</label>
                                <span className="red-text">{errors.email}</span>
                            </div>

                              {/* input password 1 */}
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {invalid: errors.password})}/>
                                <label htmlFor="password">Password</label>
                                <span className="red-text">{errors.password}</span>
                            </div>

                              {/* input password 2 */}
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                    className={classnames("", {invalid: errors.password2})}/>
                                <label htmlFor="password2">Confirm Password</label>
                                <span className="red-text">{errors.password2}</span>
                            </div>

                              {/* input  address*/}
                              <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.address}
                                    error={errors.address}
                                    id="address"
                                    type="text"
                                    className={classnames("", {invalid: errors.address})}/>
                                <label htmlFor="address">Address</label>
                                <span className="red-text">{errors.address}</span>
                            </div>

                              {/* input  city*/}
                              <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.city}
                                    error={errors.city}
                                    id="city"
                                    type="text"
                                    className={classnames("", {invalid: errors.city})}/>
                                <label htmlFor="city">City</label>
                                <span className="red-text">{errors.city}</span>
                            </div>

                              {/* input  state*/}
                              <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.state}
                                    error={errors.state}
                                    id="state"
                                    type="text"
                                    className={classnames("", {invalid: errors.state})}/>
                                <label htmlFor="state">State</label>
                                <span className="red-text">{errors.state}</span>
                            </div>

                              {/* input  zip*/}
                              <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.zip}
                                    error={errors.zip}
                                    id="zip"
                                    type="text"
                                    className={classnames("", {invalid: errors.zip})}/>
                                <label htmlFor="zip">Zip code</label>
                                <span className="red-text">{errors.zip}</span>
                            </div>

                              {/* input  phone number*/}
                              <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.phoneNumber}
                                    error={errors.phoneNumber}
                                    id="phoneNumber"
                                    type="text"
                                    className={classnames("", {invalid: errors.phoneNumber})}/>
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <span className="red-text">{errors.phoneNumber}</span>
                            </div>

                            <div className="col s12">
                                <button
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

RegisterUser.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({auth: state.auth, errors: state.errors});

export default connect(
    mapStateToProps,
    { registerUser })
    (withRouter(RegisterUser));
