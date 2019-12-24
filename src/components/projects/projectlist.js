import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
//import jwt from 'jsonwebtokens'

const Project = props => (
    <tr>
    <td>{props.project.projectName}</td>
        <td >{props.project.description}</td>
        <td >{props.project.members}</td>
        <td >{props.date}</td>
        
        <td>
        <Link to={"/editProj/"+props.project._id} >Edit </Link> | <a href="#" onClick={() => { props.deleteProject(props.project._id) }}> delete</a>
        </td>
        
    </tr>
)
export default class Projects extends Component {
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
        axios.get('http://localhost:4000/projects/projectsList')
            .then(response => {
                this.setState({
                    projects: response.data});
                    console.log("Did Mount here" + response.data)
            })
            .catch(function(error) {
                console.log("error " + error)
            })

    }

//     componentDidUpdate() {
//         axios.get('http://localhost:4000/projects/projectsList')
//         .then(response => {
//             this.setState({
//                 projects: response.data});
//                 //console.log("Did Update done" + response.data)
                
//         })
//         .catch(function(error) {
//             console.log(error)

//         })

// }

    searchQuery(e) {
        this.setState({
            query: e.target.value
        })
    }

    deleteProject(id) {
        axios.delete('http://localhost:4000/projects/'+id) 
            .then(response => {console.log(response.data)});

        this.setState({
            projects: this.state.projects.filter(el => el._id !== id)
        })
    }

    onSort = (sortType) => {
        this.setState({
            sortType: 'desc'
        })
    }

    // onSort = (sortType) => {
    //     this.state.projects.sort((a,b) => {
    //         const isRev = (this.state.sortType === 'asc') ? 1 : -1;
    //         return isRev * a.projectName.localeCompare(b.projectName)
    //     })
    // } 

    // projectList() {
    //     return this.state.projects.map((currentProject) =>{

    //         return <Project project={currentProject}
    //                     //deleteBug={this.deleteBug}
    //                     key={currentProject._id}
    //                     date={currentProject.dateCreated.substring(0,10)}
    //                     />
    //     });
    // }
    
    render() {

        const sorted = this.state.projects.sort((a,b) => {

            const isReversed = (this.state.sortType === 'asc') ? 1 : -1;

            return isReversed * a.projectName.localeCompare(b.projectName)
        });

        let findQuery = sorted.filter(
                i => i.description.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1);
                
        
        
        return (
            <div className="container">
                <h3> Projects </h3>
                <input
                    onChange={this.searchQuery}
                    type="text"
                    placeholder="Search projects..."
                />
                <table className="table table-striped"
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
                                            deleteProject={this.deleleProject}
                                            key={currentProject._id}
                                            date={currentProject.dateCreated.substring(0,10)}
                            />
                })}
                        </tbody>

                    </table>
            </div>
        )
    }
}

