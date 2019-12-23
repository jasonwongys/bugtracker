import React, { Component, Link } from 'react'
import axios from 'axios';
//import jwt from 'jsonwebtokens'

const Project = props => (
    <tr>
    <td className={props.project.completed ? 'completed' : ''}>{props.project.projectName}</td>
        <td className={props.project.completed ? 'completed' : ''}>{props.project.description}</td>
        <td className={props.project.completed ? 'completed' : ''}>{props.project.members}</td>
        <td className={props.project.completed ? 'completed' : ''}>{props.date}</td>
        {/*
        <td>
        <Link to={"/edit/"+props.project._id} >Edit </Link> | 
                <a href="#" onClick={() => { props.deleteBug(props.project._id) }}> delete</a>
        </td> */}
        
        
    </tr>
)
export default class Projects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            query: ''
        };

        this.searchQuery = this.searchQuery.bind(this);
        //this.deleteBug = this.deleteBug.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:4000/projects/projectsList')
            .then(response => {
                this.setState({
                    projects: response.data});
                    console.log("Did Mount here" + response.data)
            })
            .catch(function(error) {
                console.log(error)
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

    // deleteBug(id) {
    //     axios.delete('http://localhost:4000/bugs/'+id) 
    //         .then(response => {console.log(response.data)});

    //     this.setState({
    //         bugs: this.state.bugs.filter(el => el._id !== id)
    //     })
    // }

    projectList() {
        return this.state.projects.map((currentProject) =>{

            return <Project project={currentProject}
                        //deleteBug={this.deleteBug}
                        key={currentProject._id}
                        date={currentProject.dateCreated.substring(0,10)}
                        />
        });
    }
    
    render() {

        let findQuery = this.state.projects.filter(i => i.description.toLowerCase().indexOf(this.state.query) !== -1);

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
                                <th>Project Name</th>   
                                <th>Description</th>
                                <th>Members</th>
                                <th>Date Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {findQuery.map((currentProject) =>{
                                return <Project project={currentProject}
                                            //deleteBug={this.deleteBug}
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

