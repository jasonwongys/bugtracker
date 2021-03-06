import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from "react-redux";
import PropTypes from "prop-types";
//import jwt from 'jsonwebtokens'

const Project = props => (
    <tr>
        <td>{props.project.projectName}</td>
        <td >{props.project.description}</td>
        <td >{props.project.members}</td>
        <td >{new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit"
            }).format(new Date(props.date))}</td>
    
        <td>
        <Link to={"/editProj/"+props.project._id} className="btn btn-success">Edit </Link> <Link to={"/projects/bugs/"+props.project._id} className="btn btn-primary">Add bug </Link> <Link to={"/bugs/"+props.project._id} className="btn btn-info"> View Bugs</Link> <Link className="btn btn-danger" onClick={() => { props.deleteProject(props.project._id) }}> Delete</Link>
        </td>
        
    </tr>
)
export default class ProjectsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            query: '',
            sortType: 'asc'
        };

        this.searchQuery = this.searchQuery.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.onSort = this.onSort.bind(this);
    }
    componentDidMount() {
        axios.get('https://my-bugtracker-app.herokuapp.com/projects')
            .then(response => {
                this.setState({
                    projects: response.data});
                    console.log("Projects Mount here" + JSON.stringify(response.data));
            })
            .catch(function(error) {
                console.log("error " + error)
            })

    }

    searchQuery(e) {
        this.setState({
            query: e.target.value
        })
    }


    onSort = (sortType) => {
        this.setState({
            sortType: 'desc'
        })
    }

    deleteProject(id) {
        axios.delete('https://my-bugtracker-app.herokuapp.com/projects/'+id) 
            .then(response => {console.log(response.data)});

        this.setState({
            projects: this.state.projects.filter(el => el._id !== id)
        })
    }


    // onSort = (sortType) => {
    //     this.state.projects.sort((a,b) => {
    //         const isRev = (this.state.sortType === 'asc') ? 1 : -1;
    //         return isRev * a.projectName.localeCompare(b.projectName)
    //     })
    // } 
    
    render() {

        // const { user } = this.props.auth;
        // console.log("Auth here" + JSON.stringify(user));

        // let toastMsg = document.createElement('toastMsg');
        // toastMsg.className()

        console.log("Data here", this.state.projects);

        const sorted = this.state.projects.sort((a,b) => {

            const isReversed = (this.state.sortType === 'asc') ? 1 : -1;
            return isReversed * a.projectName.localeCompare(b.projectName);
        });


        //Search query for project list items
        let findQuery = sorted.filter(
                i => i.projectName.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1);
                
        return (
            <div className="container-fluid">
            <ol className="breadcrumb mb-3">
            <li className="breadcrumb-item active"><strong>Projects</strong></li>
        </ol>
            
                <input
                    className="form-control mr-sm-2"
                    onChange={this.searchQuery}
                    type="text"
                    placeholder="Search projects..."
                />
                <table className="table"
                    style={{marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th onClick={()=>this.onSort('desc')}>Project Name</th>   
                                <th>Description</th>
                                <th>Members</th>
                                <th>Date Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {findQuery.map((currentProject) =>{
                                return <Project project={currentProject}
                                            bugsProject={currentProject.bugs_id}
                                            key={currentProject._id}
                                            deleteProject={this.deleteProject}
                                            date={(currentProject.dateCreated).substring(0,10)}
                            />
                })}
                        </tbody>

                    </table>
            </div>
        )
    }
}
