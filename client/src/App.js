import React, { Component } from 'react'
//import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import './App.css';

import { Provider } from "react-redux";
import store from "./store";
import Navbar from "../src/components/layout/Navbar";
import CreateBug from "../src/components/bugtrack/createbug.component";
import BugList from "../src/components/bugtrack/buglist.component"
import EditBug from "../src/components/bugtrack/editbug.component";
import ProjectsList from "../src/components/projects/projectlist";
import CreateProject from "../src/components/projects/createproject";
import EditProject from "../src/components/projects/editproject.component";
import UsersList from "../src/components/usersProfile/userList.component";
import EditUsers from "../src/components/usersProfile/editUsers.component";
import ViewProjectBugs from "../src/components/projects/viewProjectBugs";
import Notfound from "./components/Notfound";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard"

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}


export default class App extends Component {
  render() {
    return (
      
          <div className="wrapper">
            
          
            <Switch>
            
            <PrivateRoute path="/buglist" component={BugList}/>
                <PrivateRoute exact path="/edit/:id" component={EditBug} />
                <PrivateRoute exact path="/projects/bugs/:id" component={CreateBug} />
                
                <PrivateRoute exact path="/projects/" component={ProjectsList}/>
                <PrivateRoute exact path="/editProj/:id" component={EditProject} />
                <PrivateRoute path="/createProj" component={CreateProject} />
                
                <PrivateRoute path="/usersList" component={UsersList} />
                <PrivateRoute path="/api/users/:id" component={EditUsers} />
                <PrivateRoute path="/bugs/:id" component={ViewProjectBugs} />

                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />     
                
                <Route path='/' component={Dashboard} />
                <Route component={Notfound} />
                </Switch>
                
            </div>

    )
  }
}



