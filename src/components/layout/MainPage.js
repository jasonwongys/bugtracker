import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navbar from './Navbar';
import Dashboard from '../dashboard/Dashboard';


export default class MainPage extends Component {
    render() {
        return (
            <div className="d-flex" id="wrapper">
            <Router>
                <Navbar />
                
                    <Dashboard />
                    
            </Router>
                
                
            </div>
        )
    }
}
