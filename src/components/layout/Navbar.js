import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import CreateBug from "../bugtrack/createbug.component";
import BugList from "../bugtrack/buglist.component";
import EditBug from "../bugtrack/editbug.component";
import Projects from "../projects/projectlist";
import CreateProject from "../projects/createproject";
import EditProject from "../projects/editproject.component";
import UsersList from "../usersProfile/userList.component";
import EditUsers from "../usersProfile/editUsers.component";
import ViewProjectBugs from "../projects/viewProjectBugs";
import "../layout/navbar.css";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';

class Navbar extends Component {

        onLogoutClick = e => {
            e.preventDefault();
            this.props.logoutUser();
        };
        render() {
            return (
                <div className="bg-dark border-right" id="sidebar-wrapper">
                    <Link to="/mainPage" className="navbar-brand">Bug Tracker</Link>
                        <div className="list-group list-group-flush">
                                <Link to="/buglist" className="list-group-item list-group-item-action bg-dark">Show Bugs</Link>
                                <Link to="/create" className="list-group-item list-group-item-action bg-dark">Create Bugs</Link>             
                                <Link to="/projects" className="list-group-item list-group-item-action bg-dark">Show Projects</Link>
                                <Link to="/createProj" className="list-group-item list-group-item-action bg-dark">Create projects</Link>
                                <Link to="/usersList" className="list-group-item list-group-item-action bg-dark">Show users</Link>
                                <button onClick={this.onLogoutClick}>Logout</button>
                                
                        </div>
                    </div>
            );
        }
        }

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
    };
    const mapStateToProps = state => ({
            auth: state.auth
    });
    export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);



