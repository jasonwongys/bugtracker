import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateBug extends Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            date: new Date(),
            members: '',
            priority: '',
            completed: false,
            projectName: '',
            projects: [],
            users: []
            
        }
        
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onChangeMembers = this.onChangeMembers.bind(this);
        this.onChangeProjectName = this.onChangeProjectName.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/users/usersList')
            .then(response => {
                this.setState({
                    users: response.data.map(user => user.name)});
                    console.log("Users Mount here" + JSON.stringify(response.data))
            }).then(axios.get('http://localhost:4000/projects')
            .then(response => {
                this.setState({
                    projects: response.data.map(project => project.projectName)});
                    console.log("Projects Mount here" + JSON.stringify(response.data));
            }))
            .catch(function(error) {
                console.log("error " + error)
            })

    }


    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }


    onChangePriority(e) {
        this.setState({
            priority: e.target.value
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

    onChangeDate(date) {

        this.setState({
            date: date
        });
    }

    onSubmitForm(e) {
        e.preventDefault();

        console.log("form submitted");
        console.log(`description: ${this.state.description}`);
        console.log(`date: ${this.state.date}`);
        console.log(`completed: ${this.state.completed}`);
        console.log(`Priority: ${this.state.priority}`);
        console.log(`assignee: ${this.state.members}`);
        console.log(`Project Name: ${this.state.projectName}`);

        const newBug = {
            description: this.state.description,
            date: this.state.date.toString(),
            completed: this.state.completed,
            priority: this.state.priority,
            projectName: this.state.projects,
            members: this.state.members
            
        }

        axios.post('http://localhost:4000/projects/bugs/'+this.state.projects._id, newBug)
            .then(res => console.log(res.data),
                    this.props.history.push("/"));

        this.setState({
            description: '',
            date: new Date(),
            completed: false,
            priority: '',
            projects: [],
            users: [],
            members: '',
            projectName: ''
            
        });
        
        

    }

    render() {
        return (
            <div className="container">
                <h3>Create a Bug</h3>
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
                            <label>Deadline: </label>
                                <div>
                                    <DatePicker
                                        selected={this.state.date}
                                        
                                        onChange={this.onChangeDate}
                                    />
                                </div>
                        </div>

                        <br />
                        <div className="form-group">

                        <label>Prioirity: </label>
                        <div className="form-check form-check-inline">
                            <label className="form-check-label" for="High">
                                <input className="form-check-input"
                                    type="radio" 
                                    value="High" 
                                    checked={this.state.priority==='High'}
                                    onChange={this.onChangePriority}
                                    id="High"/>
                                <span>High</span> </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <label className="form-check-label" for="Medium">
                                <input className="form-check-input" 
                                    type="radio" 
                                    value="Medium"
                                    checked={this.state.priority==='Medium'}
                                    onChange={this.onChangePriority}
                                    id="Medium"/>
                            <span>Medium</span></label>
                        </div>

                        <div className="form-check form-check-inline">
                        <label className="form-check-label" for="Low">
                            <input className="form-check-input" 
                                    type="radio" 
                                    value="Low"
                                    checked={this.state.priority==='Low'}
                                    onChange={this.onChangePriority}
                                    id="Low"/>
                            <span>Low</span></label>
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
                        <label>Project Name </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            
                            onChange={this.onChangeProjectName}>
                            <option value="" selected disabled hidden>Choose here</option>
                                {this.state.projects.map(function(project) {
                                    return <option key={project}
                                        value={project}>{project}</option>;
                                        
                                })}
                            </select>
                    </div>

                        <div className="form-group">
                            <input type="submit" value="Create Bug" className="btn btn-primary" />
                        </div>
                        </div>
                    </form>
                    
                </div>
            </div>
        )
    }
}
