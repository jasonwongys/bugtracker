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

import { logoutUser } from "../../actions/authActions";
class Navbar extends Component {

        onLogoutClick = e => {
            e.preventDefault();
            this.props.logoutUser();
        };
        render() {
            return (
            <div className="container-lg">
                <nav>
                    <div className="nav-wrapper">
                    <Link to="/dashboard" className="navbar-brand">Bug Tracker</Link>
                
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <Link to="/buglist" className="nav-link">Show Bugs</Link>
                    </li>
                    <li>
                        <Link to="/create" className="nav-link">Create Bugs</Link>
                    </li>
                    <li>
                        <Link to="/projects" className="nav-link">Show Projects</Link>
                    </li>
                    <li>
                        <Link to="/createProj" className="nav-link">Create projects</Link>
                    </li>
                    <li>
                        <Link to="/usersList" className="nav-link">Show users</Link>
                    </li>
                    <li>
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
                <Route path="/editUsers/" component={EditUsers} />
            </div> 
            );
        }
        }
export default Navbar;


