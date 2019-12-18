import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import CreateBug from "../bugtrack/createbug.component";
import BugList from "../bugtrack/buglist.component";
import EditBug from "../bugtrack/editbug.component";
import { logoutUser } from "../../actions/authActions";
    class Navbar extends Component {

        onLogoutClick = e => {
            e.preventDefault();
            this.props.logoutUser();
        };
        render() {
            return (
            <div className="container">
                <nav>
                    <Link to="/buglist" className="navbar-brand">Bug Tracker</Link>
                
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <Link to="/buglist" className="nav-link">Show Bugs</Link>
                    </li>
                    <li>
                        <Link to="/create" className="nav-link">Create Bugs</Link>
                    </li>
                    <li>
                        <a onClick={this.props.onLogoutClick}>Logout</a>
                    </li>
                </ul>

                
                </nav>
                <Route path="/buglist" exact component={BugList}/>
                <Route path="/edit/:id" component={EditBug} />
                <Route path="/create/" component={CreateBug} />
            </div> 
            );
        }
        }
export default Navbar;

