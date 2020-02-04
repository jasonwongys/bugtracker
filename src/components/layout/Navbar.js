import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free"
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
            window.location.replace('/login');
            // const { user } = this.props.auth;
            
        };
        render() {

            const { user } = this.props.auth;
                console.log("Auth here" + JSON.stringify(user));
                console.log("Name",user.name);

            return (
                <div className="d-flex" id="wrapper">
                <div className="bg-dark border-right" id="sidebar-wrapper">
                    <Link to="/projects" className="navbar-brand text-white">Bug Tracker</Link>
                        <div className="list-group list-group-flush">
                                <a href="/buglist" className="list-group-item list-group-item-action bg-dark text-white"><i class="fas fa-bug"></i>Show Bugs</a>

                                <a href="/projects" className="list-group-item list-group-item-action bg-dark text-white"><i class="fas fa-tasks"></i>Show Projects</a>
                                <a href="/createProj" className="list-group-item list-group-item-action bg-dark text-white"><i class="far fa-handshake"></i>Create projects</a>
                                <a href="/usersList" className="list-group-item list-group-item-action bg-dark text-white"><i class="fas fa-users"></i>Show users</a>
                                <a href="/dashboard" className="list-group-item list-group-item-action bg-dark text-white" ><i class="fas fa-chart-bar"></i>Show Dashboard</a>
                                
                                <button className="btn btn-secondary" onClick={this.onLogoutClick}>Logout</button>
                                
                        </div>

                        
                    </div>

                    <div id="page-content-wrapper">
                    <nav className="navbar navbar-expand-lg navbar-light bg-dark text-white border-bottom static-top fixed-left">
                        {/* <button className="btn btn-primary" id="menu-toggle">Toggle Menu</button> */}
                    
                    {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button> */}
                    {/* <h5><b>Hi, 👏</b> {user.name.split(" ")[0]}</h5> */}

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    
                    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <a className="nav-link text-white" href="#"><b>Hi, 👏</b> {user.name} <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
{/*                                 
                                <button type="button" class="btn btn-primary">
                                    Notifications <span class="badge badge-light">4</span>
                                </button> */}
                            </li>
                            <li class="nav-item dropdown">
                            {/* <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a> */}
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
                    <App/>
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



