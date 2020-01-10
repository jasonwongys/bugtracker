import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions"; 
import "../layout/navbar.css";

import CreateBug from "../bugtrack/createbug.component";
import BugList from "../bugtrack/buglist.component";
import EditBug from "../bugtrack/editbug.component";
import Projects from "../projects/projectlist";
import CreateProject from "../projects/createproject";
import EditProject from "../projects/editproject.component";
import UsersList from "../usersProfile/userList.component";
import EditUsers from "../usersProfile/editUsers.component";
import ViewProjectBugs from "../projects/viewProjectBugs";
class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
      // const { user } = this.props.auth;
      // console.log("Auth here" + JSON.stringify(user));
  return (
    
    <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom">
                        <button class="btn btn-primary" id="menu-toggle">Toggle Menu</button>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    {/* <h5><b>Hi, 👏</b> {user.name.split(" ")[0]}</h5> */}

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li class="nav-item active">
                              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="#">Link</a>
                            </li>
                            <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                            </li>
                    </ul>
                  </div>
                </nav>
                  <h1> DashBoard Here</h1>
                    <Route path="/buglist" exact component={BugList}/>
                    <Route path="/edit/:id" component={EditBug} />
                    <Route path="/create/" component={CreateBug} />
                    <Route path="/projects" component={Projects}/>
                    <Route path="/editProj/:id" component={EditProject} />
                    <Route path="/createProj" component={CreateProject} />
                    <Route path="/usersList" component={UsersList} />
                    <Route path="/api/users/:id" component={EditUsers} />
                    <Route path="/bugs/:id" component={ViewProjectBugs} />
              </div>

      
    );
  }
}


export default Dashboard;

// Dashboard.propTypes = {
//   logoutUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };
//   const mapStateToProps = state => ({
//     auth: state.auth
//   });
//   export default connect(
//     mapStateToProps,
//     { logoutUser }
//   )(Dashboard);