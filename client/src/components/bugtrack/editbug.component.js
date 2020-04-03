import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditBug extends Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            members: '',
            priority: '',
            completed: false,
            date: '',
            users: []
        }

        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onChangeMembers = this.onChangeMembers.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onChangeCompleted = this.onChangeCompleted.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);        
        this.onSubmit = this.onSubmit.bind(this);

    }

    //GEt a single bug record
    componentDidMount() {
        axios.get('https://my-bugtracker-app.herokuapp.com/bugs/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    description: res.data.description,
                    members: res.data.members,
                    priority: res.data.priority,
                    completed: res.data.completed,
                    date: new Date(res.data.date)
                });
                console.log("State Bugs",res.data);
            }).then(axios.get('https://my-bugtracker-app.herokuapp.com/api/users/usersList')
                .then(response => {
                    this.setState({
                        users: response.data.map(user => user.name)   });
                    console.log("Users" + JSON.stringify(response.data))
                }))
            .catch(function(error) {
                console.log(error)
            })
}

    onChangeDesc(e) {
        this.setState({
            description: e.target.value 
        });
    }

    onChangeMembers(e) {
        console.log("Something clicked");
        this.setState({
            members: e.target.value
        })
    }

    onChangePriority(e) {
        this.setState({
            priority: e.target.value
        })
    }

    onChangeCompleted(e) {
        console.log("Completed checked")
        this.setState({
            completed: !this.state.completed
        })
    }

    onChangeDate(date) {
        console.log("Picker date here",date)
        this.setState({
            date: date
        });
    }

    onSubmit(e){
        e.preventDefault();

        const updatedBug = {
            description: this.state.description,
            members: this.state.members,
            priority: this.state.priority,
            completed: this.state.completed,
            date: this.state.date.toString()
        };

        axios.patch('https://my-bugtracker-app.herokuapp.com/bugs/'+this.props.match.params.id, updatedBug)
            .then(res => console.log(res.data),
            this.props.history.push("/projects"));
            
    }

    

    render() {

        console.log("Users state ", this.state.users);
        return (
            <div className="container">
                <h1>Update a bug</h1>
                
                <form onSubmit={this.onSubmit}> 
                    <div className="form-group">
                        <label>Description</label>
                            <input type="text"
                                    className="form-group"
                                    value={this.state.description}
                                    onChange={this.onChangeDesc} />
                    </div>

                    <div className="form-group">
                            <label>Deadline: </label>
                                <div>
                                    <DatePicker
                                        selected={this.state.date}
                                        dateFormat="dd/MM/yyyy"
                                        onChange={this.onChangeDate}

                                        
                                    />
                                </div>
                        </div>

                    <div className="form-group">
                        <div class="form-check form-check-inline">
                        <label class="form-check-label" for="High">
                            <input class="form-check-input" 
                                    type="radio" 
                                    value="High" 
                                    checked={this.state.priority==='High'}
                                    onChange={this.onChangePriority}
                                    id="High"
                                    />
                            <span>High</span></label>
                        </div>
                        <div class="form-check form-check-inline">
                        <label class="form-check-label" for="Medium">
                            <input class="form-check-input" 
                                    type="radio" 
                                    value="Medium"
                                    checked={this.state.priority==='Medium'}
                                    onChange={this.onChangePriority}
                                    id="Medium"/>
                            <span>Medium</span></label>
                        </div>

                        <div class="form-check form-check-inline">
                        <label class="form-check-label" for="Low">  
                            <input class="form-check-input" 
                                    type="radio" 
                                    value="Low"
                                    checked={this.state.priority==='Low'}
                                    onChange={this.onChangePriority}
                                    id="Low"/>
                            <span>Low</span></label>
                        </div>

                        </div>
                        <div className="form-group">
                            <label>Member: </label>
                            <input type="text"
                                    className="form-control"
                                    value={this.state.members}
                                    // onChange={this.onChangeMembers}
                                />
                        </div>
                        
                        <div className="form-group">
                        <label className="form-check-label" htmlFor="completedCheckbox">
                        Completed</label>
                            <input type="checkbox"
                                    className="col-xs-8"
                                    id="completedCheckbox"
                                    name="completedCheckbox"
                                    onChange={this.onChangeCompleted}
                                    checked={this.state.completed}
                                    value={this.state.completed}
                                    />
                            
                        </div>
                        <br />

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
                            <button type="submit" className="btn btn-primary"><i class="fa fa-paper-plane"></i>Submit</button>
                        </div>
                </form>
                </div>
           
        )
    }
}
