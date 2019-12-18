import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditBug extends Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            assignee: '',
            priority: '',
            completed: false,
            date: new Date()
        }

        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onChangeAssignee = this.onChangeAssignee.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onChangeCompleted = this.onChangeCompleted.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);        
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {
        axios.get('http://localhost:4000/bugs/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    description: res.data.description,
                    assignee: res.data.assignee,
                    priority: res.data.priority,
                    completed: res.data.completed,
                    date: new Date(res.data.date)
                })

            })
            .catch(function(error) {
                console.log(error)
            })
    }

    onChangeDesc(e) {
        this.setState({
            description: e.target.value 
        });
    }

    onChangeAssignee(e) {
        this.setState({
            assignee: e.target.value
        })
    }

    onChangePriority(e) {
        this.setState({
            priority: e.target.value
        })
    }

    onChangeCompleted(e) {
        this.setState({
            completed: !this.state.completed
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e){
        e.preventDefault();

        const updatedBug = {
            description: this.state.description,
            assignee: this.state.assignee,
            priority: this.state.priority,
            completed: this.state.completed,
            date: this.state.date
        };

        axios.post('http://localhost:4000/bugs/update/'+this.props.match.params.id, updatedBug)
            .then(res => console.log(res.data));

        
        this.props.history.push('/');
        
    }



    render() {
        return (
            <div>
                <h1>Update a bug </h1>
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
                        <label className="form-check-label" htmlFor="completedCheckbox">
                                Completed
                            </label>
                            <input type="checkbox"
                                    className="form-check-input"
                                    id="completedCheckbox"
                                    name="completedCheckbox"
                                    onChange={this.onChangeCompleted}
                                    checked={this.state.completed}
                                    value={this.state.completed}
                                    /> 
                            
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Save" className="btn btn-primary" />
                        </div>
                </form>
            </div>
        )
    }
}