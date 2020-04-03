import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../bugtrack/bugs.css"
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../../actions/authActions";
import store from "../../store";

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
      window.location.href = "/login";
    }
  }

const Bug = props => (
        
    <tr>
        {/* <td className={props.bug.completed ? 'completed' : ''}>{props.projectName}</td> */}
        {props.projectName}
        <td className={props.bug.completed ? 'completed' : ''}>{props.bug.description}</td>
        <td className={props.bug.completed ? 'completed' : ''}>
            {new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit"
            }).format(new Date(props.date))}
        </td>
        <td className={props.bug.completed ? 'completed' : ''}>{props.bug.members}</td>
        <td className={props.bug.completed ? 'completed' : ''}>{props.bug.priority}</td>
        
        <td>
            <Link to={"/edit/"+props.bug._id} className="btn btn-success" >Edit </Link> <button className="btn btn-danger" onClick={() => { props.deleteBug(props.bug._id) }}> Delete</button> 
        </td>
    </tr>
)
export default class BugList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bugs: [],
            query: '',
            projects: []
        };
        this.searchQuery = this.searchQuery.bind(this);
        this.deleteBug = this.deleteBug.bind(this);
    
    }

    
    componentDidMount() {
        axios.get('https://my-bugtracker-app.herokuapp.com/bugs/')
            .then(response => {
                this.setState({
                    bugs: response.data});
            
            }).then(axios.get('https://my-bugtracker-app.herokuapp.com/projects')
                .then(response => {
                    this.setState({
                        projects: response.data});
                    console.log("Projects", JSON.stringify(this.state.projects));
                }))
            .catch(function(error) {
                console.log(error)
            })
    }


    searchQuery(e) {
        this.setState({
            query: e.target.value
            
        })
    }


    deleteBug(id) {
        axios.delete('https://my-bugtracker-app.herokuapp.com/bugs/'+id) 
            .then(response => {console.log(response.data)});

        this.setState({
            bugs: this.state.bugs.filter(el => el._id !== id)
        })
    }

    // bugList() {
    //     return this.state.bugs.map((currentBug) =>{

    //         return <Bug bug={currentBug}
    //                     deleteBug={this.deleteBug}
    //                     key={currentBug._id}
    //                     date={currentBug.date.substring(0,10)} />;
    //     });
    // }
    
    render() {
        console.log("Bugs projects ",this.state.projects);
        console.log("Bugs component " + JSON.stringify(this.state.bugs));

        let findQuery = this.state.bugs.filter(
            i => i.description.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1);
        
        
        let newArr = [];

        let getProjectName = this.state.projects.filter(i => {
            this.state.bugs.filter(j => {
                if(i._id === j.projects) {
                    return <td>{i.projectName}</td>
                }     
            })
        });

        console.log("New arr", newArr);

        console.log("GetProject Name", getProjectName);
        console.log("Query: " + this.state.query);
        console.log("Date: ",this.state.projects.dateCreated);
        
        //console.log("Found query " + JSON.stringify(findQuery));
        
        return (
            <div className="container-fluid">
                <ol className="breadcrumb mb-3">
                    <li className="breadcrumb-item active"><strong>Bugs list</strong></li>
                </ol>
                
                <input
                    className="form-control mr-sm-2"
                    onChange={this.searchQuery}
                    type="text"
                    placeholder="Search descriptions..."
                />

                <table className="table">
                        <thead>
                            <tr>
                                
                                <th>Description</th>
                                <th>Deadline</th>
                                <th>Assignee</th>
                                <th>Priority</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                    {findQuery.map((currentBug) =>{
                            return <Bug bug={currentBug}
                                        deleteBug={this.deleteBug}
                                        key={currentBug._id}
                                        date={currentBug.date} 
                                projectName={getProjectName}
                                />
            })}
                
                        </tbody>


                    </table>
            </div>
        )
    }
}
// 