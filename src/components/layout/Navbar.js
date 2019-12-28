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
// import "../layout/navbar.scss";
import { logoutUser } from "../../actions/authActions";
import 'bootstrap/dist/css/bootstrap.min.css';

class Navbar extends Component {

        onLogoutClick = e => {
            e.preventDefault();
            this.props.logoutUser();
        };
        render() {
            return (
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar justify-content-end">
                    
                    <Link to="/dashboard" className="navbar-brand">Bug Tracker</Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    
                    <ul className="navbar-nav mr-auto" id="nav-mobile" >
                    <li className="nav-item active">
                        <Link to="/buglist" className="nav-link">Show Bugs</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/create" className="nav-link">Create Bugs</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/projects" className="nav-link">Show Projects</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/createProj" className="nav-link">Create projects</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/usersList" className="nav-link">Show users</Link>
                    </li>
                    <li className="nav-item active">
                        <a onClick={this.props.onLogoutClick}>Logout</a>
                    </li>
                </ul>
            </div>
                </nav>
                <Route path="/buglist" exact component={BugList}/>
                <Route path="/edit/:id" component={EditBug} />
                <Route path="/create/" component={CreateBug} />
                <Route path="/projects" component={Projects}/>
                <Route path="/editProj/:id" component={EditProject} />
                <Route path="/createProj" component={CreateProject} />
                <Route path="/usersList" component={UsersList} />
                <Route path="/api/users/:id" component={EditUsers} />
            
            </div>
            );
        }
        }
export default Navbar;


