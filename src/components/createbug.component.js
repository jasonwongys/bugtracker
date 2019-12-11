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
            assignee: '',
            priority: '',
            completed: false,
            
            
        }
        
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onChangeAssignee = this.onChangeAssignee.bind(this);
        
        this.onSubmitForm = this.onSubmitForm.bind(this);
        
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

    onChangeAssignee(e) {
        this.setState({
            assignee: e.target.value
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
        console.log(`assignee: ${this.state.assignee}`);

        const newBug = {
            description: this.state.description,
            date: this.state.date,
            assignee: this.state.assignee,
            completed: this.state.completed,
            priority: this.state.priority
            
        }

        axios.post('http://localhost:4000/bugs/create', newBug)
            .then(res => console.log(res.data));

        this.setState({
            description: '',
            date: new Date(),
            completed: false,
            priority: '',
            
            assignee: ''
        });

        //window.location ='/';

    }

    render() {
        return (
            <div>
                <h1>Create a Bug</h1>
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

                        
                        <div className="form-group">
                        <div class="form-check form-check-inline">
                            
                            <input class="form-check-input" 
                                    type="radio" 
                                    value="High" 
                                    checked={this.state.priority==='High'}
                                    onChange={this.onChangePriority}
                                    id="high"
                                    />
                            <label class="form-check-label" for="High">High</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" 
                                    type="radio" 
                                    value="Medium"
                                    checked={this.state.priority==='Medium'}
                                    onChange={this.onChangePriority}
                                    id="Medium"/>
                            <label class="form-check-label" for="Medium">Medium</label>
                        </div>

                        <div class="form-check form-check-inline">
                            <input class="form-check-input" 
                                    type="radio" 
                                    value="Low"
                                    checked={this.state.priority==='Low'}
                                    onChange={this.onChangePriority}
                                    id="Low"/>
                            <label class="form-check-label" for="Low">Low</label>
                        </div>



                        
                        
                        <div className="form-group">
                            <label>Assignee: </label>
                            <input type="text"
                                    className="form-control"
                                    value={this.state.assignee}
                                    onChange={this.onChangeAssignee}
                                />
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
