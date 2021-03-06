import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutInstructor} from "../../actions/authActions";
import {Link} from "react-router-dom";

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this
            .props
            .logoutInstructor();
    };

    render() {
        const {instructor} = this.props.auth;

        return (
            <div className="container valign-wrapper">
                <div className="row">
                    <div className="landing-copy col s12 center-align">
                        <h4>
                            <b>Hey there,</b>
                            {instructor
                                .name
                                .split(" ")[0]}
                            <p className="flow-text grey-text text-darken-1">
                                You are logged in
                            </p>
                        </h4>
                        <button
                            onClick={this.onLogoutClick}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                            Logout
                        </button>
                    </div>
                    <div className="landing-copy col s12 center-align">
                        <Link to="/instructor/addAvail" className="col s5 brand-logo center black-text">
                            Timeslots
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutInstructor: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({auth: state.auth});

export default connect(mapStateToProps, {logoutInstructor})(Dashboard);
