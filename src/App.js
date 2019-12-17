import React, { Component } from 'react'
//import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";


import { Provider } from "react-redux";
import store from "./store";

// import CreateBug from "./components/createbug.component";
// import BugList from "./components/buglist.component";
// import EditBug from "./components/editbug.component";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

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
    window.location.href = "./login";
  }
}


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
      <div className="App">
      {/* <div className="container">
      <div className="nav-collapse">
      
        <nav className = "navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">Bug Tracker</Link>
          
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                <Link to="/" className="nav-link">Show Bugs</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Bugs</Link>
                </li>

            </ul>
          
        </nav>
        </div> */}
        
        {/* <Route path="/" exact component={BugList}/>
        <Route path="/edit/:id" component={EditBug} />
        <Route path="/create/" component={CreateBug} /> 
        
        </div>*/}
        <Navbar/>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>

        
      </div>
      </Router>
      </Provider>

    )
  }
}



