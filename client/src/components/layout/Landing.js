import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from '../auth/Register';
import Login from '../auth/Login'
class Landing extends Component {
    render() {
        return (
        <div className="container valign-wrapper">
            <Router>
            <div className="col s12 center-align">
                <h4 style={{ fontFamily: "monospace" }}><b>Welcome to Bug Tracker App</b></h4>
                
                
                <p className="flow-text grey-text text-darken-1">
                    Your one-stop project and bug tracking management system
                </p>
                <br />
                <div className="col s6">
                <Link to="/register" className=""

    
                />
                    Register
                
                </div>
                <div className="col s6">
                <Link to="/login"
                    style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px"
                    }}
                    className=""
                />
                    Log In
                
                </div>
            </div>
            <Route path="/register" exact component={Register}/>
                <Route path="/login" component={Login} />
            </Router>
            
        </div>
        );
    }
    }
export default Landing;