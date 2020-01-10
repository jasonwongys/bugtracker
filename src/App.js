import React, { Component } from 'react'
//import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";


import { Provider } from "react-redux";
import store from "./store";


import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import MainPage from "./components/layout/MainPage"
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
        
          {/* <Route exact path="/mainPage" component={MainPage} /> */}
          
          <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/mainPage" component={MainPage} />
                <Route path='/dashboard' component={Dashboard} />
          </Switch>

        

      </Router>
      </Provider>

    )
  }
}



