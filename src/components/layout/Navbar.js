import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import "../layout/navbar.css";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import App from "../../App";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';

class Navbar extends Component {

        onLogoutClick = e => {
            e.preventDefault();
            this.props.logoutUser();
            //this.props.history.push('/login');
        };
        render() {
            return (
                <div className="d-flex" id="wrapper">
                <div className="bg-light border-right" id="sidebar-wrapper">
                    <Link to="/" className="navbar-brand">Bug Tracker</Link>
                        <div className="list-group list-group-flush">
                                <Link to="/buglist" className="list-group-item list-group-item-action bg-light">Show Bugs</Link>

                                <Link to="/projects" className="list-group-item list-group-item-action bg-light">Show Projects</Link>
                                <Link to="/createProj" className="list-group-item list-group-item-action bg-light">Create projects</Link>
                                <Link to="/usersList" className="list-group-item list-group-item-action bg-light">Show users</Link>
                                <Link to="/dashboard" className="list-group-item list-group-item-action bg-light" >Show Dashboard</Link>
                                
                                <button onClick={this.onLogoutClick}>Logout</button>
                                
                        </div>

                        
                    </div>

                    <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom static-top">
                        <button class="btn btn-primary" id="menu-toggle">Toggle Menu</button>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    {/* <h5><b>Hi, 👏</b> {user.name.split(" ")[0]}</h5> */}

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                            <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                            </li>
                    </ul>
                    </div>
                </nav>
                <App />
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
    mapStateToProps,{ logoutUser }
)(Navbar);



