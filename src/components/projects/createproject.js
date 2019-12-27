import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
export default class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectName: '',
            description: '',
            members: '',
            dateCreated: new Date(),
            users: []

        }
        
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDateCreated = this.onChangeDateCreated.bind(this);
        this.onChangeProjectName = this.onChangeProjectName.bind(this);
        this.onChangeMembers = this.onChangeMembers.bind(this);
        
        this.onSubmitForm = this.onSubmitForm.bind(this);
        
    }


    componentDidMount() {
        axios.get('http://localhost:4000/api/users/usersList')
            .then(response => {
                this.setState({
                    users: response.data.map(user => user.name)});
                    console.log("Did Mount here" + JSON.stringify(response.data))
            })
            .catch(function(error) {
                console.log("error " + error)
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
        console.log(`Users: ${this.state.members}`);

        const newProject = {
            description: this.state.description,
            dateCreated: this.state.dateCreated.toString(),
            members: this.state.members,
            projectName: this.state.projectName
            
        }


        //Create a new project
        axios.post('http://localhost:4000/projects/createProj', newProject)
            .then(res => console.log(res.data),
            this.props.history.push("/projects"));

        this.setState({
            description: '',
            dateCreated: new Date(),
            projectName: '',
            members: ''
        });
    }

    render() {

        return (
            <div className="container">
                <h3>Create a Project</h3>
                <div style={{margin: 100}}>
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
                        <label>Assign Member: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            
                            onChange={this.onChangeMembers}>
                            <option value="" selected disabled hidden>Choose here</option>
                                {this.state.users.map(function(user) {
                                    return <option key={user}
                                        value={user}>{user}</option>;
                                        
                                })}
                            </select>
                    </div>
                        <div className="form-group">
                            <input type="submit" value="Create Project" className="btn btn-primary" />
                        </div>
                        
                    </form>
                    
                </div>
            </div>
        )
    }
}
