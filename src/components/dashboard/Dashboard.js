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
        data: []
      }
  }


  componentDidMount() {
    axios.get("http://localhost:4000/projects")
    .then(response => {
        this.setState({
        data: response.data});
        console.log("Projects here" + JSON.stringify(response.data));
        })
    .catch(err => {
        console.log("Error",err);
    })
}

  onLogoutClick = e => {
      e.preventDefault();
      this.props.logoutUser();
  };



  render() {

      // const { user } = this.props.auth;
      // console.log("Auth here" + JSON.stringify(user));
      let backgroundColor = ['rgba(255,99,132,0.6)','rgba(54,162,235,0.6)','rgba(255,206,86,0.6)','rgba(213,226,86,0.6)','rgba(189,126,86,0.6)'];
      let labels = this.state.data.map(i => i.projectName);
      let data = this.state.data.map(j => j.bugs.length);
      let label = "Number of bugs";
      let datasets = [];
      datasets.push({label,data,backgroundColor});

      let newChartData = {labels,datasets};

      console.log("Project Name Labels", labels);
      console.log("Project bug count", datasets);
      console.log("New Chart Data ", newChartData);

  return (
      <div>
        <Chart chartData={newChartData} legendPosition="bottom"/>
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