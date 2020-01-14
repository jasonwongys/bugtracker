import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectName: '',
            description: '',
            members: '',
            dateCreated:'',
            users: []

        }
        
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDateCreated = this.onChangeDateCreated.bind(this);
        this.onChangeProjectName = this.onChangeProjectName.bind(this);
        this.onChangeMembers = this.onChangeMembers.bind(this);
        
        this.onSubmitForm = this.onSubmitForm.bind(this);
        
    }
// Get a single project record
    componentDidMount() {

        axios.get('http://localhost:4000/projects/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    projectName: res.data.projectName,
                    description: res.data.description,
                    members: res.data.members,
                    dateCreated: new Date(res.data.dateCreated) });
                }).then(axios.get('http://localhost:4000/api/users/usersList')
                    .then(response => {
                        this.setState({
                            users: response.data.map(user => user.name)   });
                        console.log("Users" + JSON.stringify(response.data))
                }))

            .catch(function(error) {
                console.log("Error " + error)
            })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }


    onChangeProjectName(e) {
        this.setState({
            projectName: e.target.value
        });
    }

    onChangeMembers(e) {
        this.setState({
            members: e.target.value
        });
    }

    onChangeDateCreated(date) {
        console.log("Date passed from picker here", date);
        this.setState({
            dateCreated: date
        });
    }

    onSubmitForm(e) {
        e.preventDefault();

        console.log("form submitted");
        console.log(`description: ${this.state.projectName}`);
        console.log(`date: ${this.state.dateCreated}`);
        console.log(`Priority: ${this.state.description}`);
        console.log(`members: ${this.state.members}`);

        const updatedProject = {
            projectName: this.state.projectName,
            description: this.state.description,
            members: this.state.members,
            dateCreated: this.state.dateCreated.toString()
            
        }


        //Update a new project
        axios.patch('http://localhost:4000/projects/'+this.props.match.params.id,updatedProject)
            .then(res => console.log(res.data),
            this.props.history.push("/projects"));
        

    }

    render() {
        return (
            <div className="container">
                <h3>Update a Project</h3>
                <div style={{marginTop: 20}}>
                    <form onSubmit={this.onSubmitForm}>
                        <div className="form-group">
                            <label>Description: </label>
                            <input type="text"
                                    className="form-control"
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                />
                        </div>

                        <div className="form-group">
                            <label>Date Created: </label>
                                <div>
                                    <DatePicker
                                        selected={this.state.dateCreated}
                                        
                                        onChange={this.onChangeDateCreated}
                                    />
                                </div>
                        </div>

                        <br />
                        <div className="form-group">
                            <label>Project Name: </label>
                            <input type="text"
                                    className="form-control"
                                    value={this.state.projectName}
                                    onChange={this.onChangeProjectName}
                                />
                        </div>
                        
                        <br />

                        <div className="form-group">
                            <label>Member: </label>
                            <input type="text"
                                    className="form-control"
                                    value={this.state.members}
                                    onChange={this.onChangeMembers}
                                />
                        </div>

                        <div className="form-group">
                        <label>Assign Member: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            
                            onChange={this.onChangeMembers}>
                            <option value={this.state.members} selected disabled hidden>Choose here</option>
                                {this.state.users.map(function(user) {
                                    return <option key={user.id}
                                        value={user}>{user}</option>;
                                        
                                })}
                            </select>
                    </div>

            
                        <div className="form-group">
                            <input type="submit" value="Update Project" className="btn btn-primary" />
                        </div>
                        
                    </form>
                    
                </div>
            </div>
        )
    }
}
