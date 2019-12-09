import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateBug from "./components/createbug.component";
import BugList from "./components/buglist.component";
import EditBug from "./components/editbug.component";

export default class App extends Component {
  render() {
    return (
      <Router>
      <div className="container">
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
        </div>
        
        <Route path="/" exact component={BugList}/>
        <Route path="/edit/:id" component={EditBug} />
        <Route path="/create/" component={CreateBug} />

        </div>

      </Router>
      

    )
  }
}



