import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import CreateBug from "../bugtrack/createbug.component";
import BugList from "../bugtrack/buglist.component";
import EditBug from "../bugtrack/editbug.component";

    class Navbar extends Component {
    render() {
        return (
        <div>
            <nav>
                
                <Link to="/buglist" className="navbar-brand">Bug Tracker</Link>
            
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/buglist" className="nav-link">Show Bugs</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create Bugs
                    <Route path="/bugs/create/" component={CreateBug} />
                    </Link>
                </li>
            </ul>

            
            </nav>
            <Route path="/buglist" exact component={BugList}/>
        <Route path="/edit/:id" component={EditBug} />
        
        </div> 
        );
    }
    }
    export default Navbar;


