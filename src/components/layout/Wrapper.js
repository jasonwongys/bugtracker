import React, { Component } from 'react'
import Navbar from "./Navbar";
import CreateBug from "../bugtrack/createbug.component";
import BugList from "../bugtrack/buglist.component";


import EditBug from "../bugtrack/editbug.component";
import Projects from "../projects/projectlist";
import CreateProject from "../projects/createproject";
import EditProject from "../projects/editproject.component";
import UsersList from "../usersProfile/userList.component";
import EditUsers from "../usersProfile/editUsers.component";
import ViewProjectBugs from "../projects/viewProjectBugs";
//import Notfound from "./components/Notfound";
import Landing from "../layout/Landing";

//import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "../dashboard/Dashboard"

export default class Wrapper extends Component {
    render() {
        return (
            <div className="container-fluid">
                <CreateBug />
                <BugList/>
                <EditBug/>
                <Projects />
                <CreateProject />
                <EditProject />
                <UsersList/>
                <Landing />
                
            </div>
        )
    }
}
