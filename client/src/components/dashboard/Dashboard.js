import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions"; 
import "../layout/navbar.css";
import Chart from "../chart/chart";

import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
      super(props);

      this.state = {
        projects: [],
        bugs: []
      }

      this.getAssignedBugs = this.getAssignedBugs.bind(this);
  }


  componentDidMount() {
    axios.get("http://localhost:4000/projects")
    .then(response => {
        this.setState({
        projects: response.data});
        console.log("Projects here" + JSON.stringify(response.data));
        })
        .then(axios.get('http://localhost:4000/bugs/')
          .then(response => {
                this.setState({
                    bugs: response.data});
                    console.log("Bugs here" + JSON.stringify(response.data));
            
            }))
    .catch(err => {
        console.log("Error",err);
    })
}

  onLogoutClick = e => {
      e.preventDefault();
      this.props.logoutUser();
  };

getAssignedBugs() {
  var counts = {}, i, value;

  var result = [];

for(i = 0; i < this.state.bugs.length;i++) {

    value = this.state.bugs[i].members;
    if(typeof counts[value] === "undefined") {
        counts[value] = 1;
    } else {
        counts[value]++;
    }
  }
  
    Object.keys(counts).forEach((key,index) => {
      result.push(`${key} ${counts[key]}`);
  })

  return result;
}

  render() {
    let bugsArr = this.getAssignedBugs();

    let getAssigned = bugsArr.map((item) => {
      return <tr>
          <td>{item}</td>
        </tr>
        
    })

    console.log("Get assigned bugs here",bugsArr);

      const { user } = this.props.auth;
      console.log("Auth here" + JSON.stringify(user));
      console.log("Name",user.name);

      var noOfProjects = [...new Set(this.state.projects.map(item => item.projectName))].length;
      var noOfBugs = [...new Set(this.state.bugs.map(item => item._id))].length;

      var highPriority = [...new Set(this.state.bugs.filter(item => item.priority === "High"))].length;
      var noOfCompleted = [...new Set(this.state.bugs.filter(item => item.completed === true))].length;




      let backgroundColor = ['rgba(255,99,132,0.6)','rgba(54,162,235,0.6)','rgba(255,206,86,0.6)','rgba(213,226,86,0.6)','rgba(189,126,86,0.6)'];
      let labels = this.state.projects.map(i => i.projectName);
      let data = this.state.projects.map(j => j.bugs.length);
      let label = "Number of bugs";
      let datasets = [];
      datasets.push({label,data,backgroundColor});

      let newChartData = {labels,datasets};

      // console.log("Project Name Labels", labels);
      // console.log("Project bug count", datasets);
      // console.log("New Chart Data ", newChartData);

  return (
      <div className="container-fluid">
      
        <ol className="breadcrumb mb-3">
          <li className="breadcrumb-item active"><strong>Dashboard</strong></li>
        </ol>
        
  
        <div className="row">
        <div className="col-xl-3 col-md-6">
                                <div className="card bg-danger text-white shadow mb-4">
                                    <div className="card-body">High Priority Bugs</div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <a className="small text-white stretched-link" href="/buglist">View Details</a>
                                        <div className="large text-white display-4">{highPriority}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-primary text-white shadow mb-4">
                                    <div className="card-body">Total No Of Projects</div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <a className="small text-white stretched-link" href="/projects">View Details</a>
                                        <div className="large text-white align-items-center display-4">{noOfProjects}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-warning text-white shadow mb-4">
                                    <div className="card-body">Total No. Of Bugs</div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <a className="small text-white stretched-link" href="/buglist">View Details</a>
                                        <div className="large text-white display-4">{noOfBugs}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-success text-white shadow mb-4">
                                    <div className="card-body">Resolved Bugs</div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <a className="small text-white stretched-link" href="/buglist">View Details</a>
                                        <div className="large text-white display-4">{noOfCompleted}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-info text-white shadow mb-4">
                                    <div className="card-body">Assigned Bugs </div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        
                                        <div className="medium text-white">{getAssigned}</div>
                                    </div>
                                </div>
                            </div>

        </div>
        <div className="col-md-6">
        
            <Chart chartData={newChartData} legendPosition="bottom"/>
          
        </div>
          
      </div>
    );
  }
}

  

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Dashboard);