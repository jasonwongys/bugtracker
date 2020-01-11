import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, Link, BrowserRouter as Router, Switch, NavLink } from 'react-router-dom'
import Navbar from "../src/components/layout/Navbar";

import Register from "./components/auth/Register";
import Login from "../src/components/auth/Login";
import { Provider } from "react-redux";
import store from "./store";

const routing = (
    <Provider store={store}>
        
        <Router>
            <Navbar />
            
        </Router>
    
        
    </Provider>

)


ReactDOM.render(routing, document.getElementById('root'));


