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



export default class SideNav extends Component {
    render() {
        return (
            <div className="bg-light border-right" id="sidebar-wrapper">
            <div class="sidebar-heading">Start Bootstrap </div>
            <div class="list-group list-group-flush">
                <Link to="/projects" className="nav-link">Show Projects</Link>
                <Link to="/createProj" className="nav-link">Create projects</Link>
                <Link to="/usersList" className="nav-link">Show users</Link>
            </div>
            </div>
        )
    }
}
