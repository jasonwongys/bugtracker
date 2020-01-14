import React, { Component } from 'react'
//import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";


import { Provider } from "react-redux";
import store from "./store";

import CreateBug from "../src/components/bugtrack/createbug.component";
import BugList from "../src/components/bugtrack/buglist.component"
import EditBug from "../src/components/bugtrack/editbug.component";
import Projects from "../src/components/projects/projectlist";
import CreateProject from "../src/components/projects/createproject";
import EditProject from "../src/components/projects/editproject.component";
import UsersList from "../src/components/usersProfile/userList.component";
import EditUsers from "../src/components/usersProfile/editUsers.component";
import ViewProjectBugs from "../src/components/projects/viewProjectBugs";


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
      
          <div className="container-lg">
            
            <PrivateRoute path="/buglist" component={BugList}/>
                <Route exact path="/edit/:id" component={EditBug} />
                <Route exact path="/projects/bugs/:id" component={CreateBug} />
                
                <Route exact path="/projects" component={Projects}/>
                <Route exact path="/editProj/:id" component={EditProject} />
                <Route path="/createProj" component={CreateProject} />
                
                <Route path="/usersList" component={UsersList} />
                <Route path="/api/users/:id" component={EditUsers} />
                <Route path="/bugs/:id" component={ViewProjectBugs} />

                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />     
                
                <Route path='/dashboard' component={Dashboard} />
                
                
            </div>

    )
  }
}



