import React, {Component} from "react";
import {Link} from "react-router-dom";
import {logoutInstructor, logoutUser} from "../../actions/authActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            status: ""
        };
    }

    onLogoutClick = e => {
        e.preventDefault();
        if (this.props.auth.user) {
            this.props.logoutUser();
        }
        else if (this.props.auth.instructor){
          this.props.logoutInstructor();
        }
    };

    render() {
        const isLoggedIn = this.props.status;
        let logInOrOutBtn;
        if (isLoggedIn) {
            logInOrOutBtn = <button
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                Logout
            </button>
        } else {
            logInOrOutBtn = <Link
                to="/login"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                Login
            </Link>
        }

        return (
            <div className="navbar-fixed">
                <nav className="">
                    <div className="nav-wrapper white">
                        {logInOrOutBtn}
                        <Link to="/" className="col s5 brand-logo center black-text">
                            Apt-On-Ice 2.0
                        </Link>
                    </div>
                </nav>
            </div>
        );
    }
}
Navbar.propTypes = {
    logoutInstructor: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({auth: state.auth, status: state.auth.isAuthenticated});

export default connect(mapStateToProps, {logoutInstructor, logoutUser})(Navbar);