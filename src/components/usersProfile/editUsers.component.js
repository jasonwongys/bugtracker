import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            role: '',
            date: new Date()

        }
        
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        
        this.onSubmitForm = this.onSubmitForm.bind(this);
        
    }
// Get a single project record
    componentDidMount() {

        axios.get('http://localhost:4000/api/users/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    email: res.data.email,
                    role: res.data.role,
                    date: new Date(res.data.date)
                })
                console.log("retrieved info: " +res.data)
            })
            .catch(function(error) {
                console.log("Error " + error)
            })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }


    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeRole(e) {
        this.setState({
            role: e.target.value
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
        console.log(`name: ${this.state.name}`);
        console.log(`date: ${this.state.date}`);
        console.log(`email: ${this.state.email}`);
        console.log(`role: ${this.state.role}`);

        const updatedUser = {
            name: this.state.name,
            email: this.state.email,
            role: this.state.role,
            date: this.state.date

        }


        //Update a new project
        axios.post('http://localhost:4000/api/users/editUsers/'+this.props.match.params.id,updatedUser)
            .then(res => console.log(res.data),
            this.props.history.push("/api/users/usersList"));
            
    

    }

    render() {
        return (
            <div className="container">
                <h3>Update a User</h3>
                <div style={{marginTop: 20}}>
                    <form onSubmit={this.onSubmitForm}>
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text"
                                    className="form-control"
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                />
                        </div>

                        <div className="form-group">
                            <label>Date Created: </label>
                                <div>
                                    <DatePicker
                                        selected={this.state.date}
                                        
                                        onChange={this.onChangeDate}
                                    />
                                </div>
                        </div>

                        <br />
                        <div className="form-group">
                            <label>Role: </label>
                            <input type="text"
                                    className="form-control"
                                    value={this.state.role}
                                    onChange={this.onChangeRole}
                                />
                        </div>
                        
                        <br />

                        <div className="form-group">
                            <label>Email: </label>
                            <input type="text"
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                />
                        </div>

            
                        <div className="form-group">
                            <input type="submit" value="Update User" className="btn btn-primary" />
                        </div>
                        
                    </form>
                    
                </div>
            </div>
        )
    }
}