import React, {Component} from "react";
import {Link} from "react-router-dom";
import {logoutInstructor, logoutUser} from "../../actions/authActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            value: "",
            status: "",
            startTime: "",
            endTime: "",
            dates: {}
        };
    }

    onAddTimeClick = e => {
        e.preventDefault();
    };

    onChange = e => {
        console.log(e)
        this.value = e.data
    }

    render() {
        var maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);

        return (
            <div className="">
                <nav className="">
                    <Calendar 
                        onChange={this.onChange} 
                        value={this.value}
                        maxDate={maxDate}
                    />
                </nav>
            </div>
        );
    }
}

export default Navbar;