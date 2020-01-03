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
        <td >{props.date}</td>
        <td>{console.log(props.bugsProject)}</td>
        
        <td>
        <Link to={"/editProj/"+props.project._id} >Edit </Link> | <a href={"/bugs/"+props.project._id}> View Bugs</a>
        
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
        
        this.onSort = this.onSort.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:4000/projects')
            .then(response => {
                this.setState({
                    projects: response.data});
                    console.log("Did Mount here" + JSON.stringify(response.data));
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

        const sorted = this.state.projects.sort((a,b) => {

            const isReversed = (this.state.sortType === 'asc') ? 1 : -1;

            return isReversed * a.projectName.localeCompare(b.projectName)
        });


        //Search query for project list items
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
                                            //date={currentProject.dateCreated.substring(0,10)}
                            />
                })}
                        </tbody>

                    </table>
            </div>
        )
    }
}

// Projects.propTypes = {
//     logoutUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired
//   };
//   const mapStateToProps = state => ({
//     auth: state.auth
//   });
// //   export default connect(
// //     mapStateToProps,
// //     { logoutUser }
// //   )(Projects);