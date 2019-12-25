import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Users = props => (
    <tr>
    <td>{props.user.name}</td>
        <td >{props.user.email}</td>
        <td >{props.user.role}</td>
        <td >{props.user.date}</td>
        
        <td>
        <Link to={"/api/users/"+props.user._id} >Edit </Link> | <a href="#" onClick={() => { props.deleteUser(props.user._id) }}> Delete</a>
        </td>
        
    </tr>
)

export default class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            query: ''
        }

        this.searchQuery = this.searchQuery.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/users/usersList')
            .then(response => {
                this.setState({
                    users: response.data});
                    console.log("Did Mount here" + response.data)
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

    render() {

        console.log("Users " + JSON.stringify(this.state.users));

        let findQuery = this.state.users.filter(
            i => i.name.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1);
            
        return (
            <div className="container">
            <h3> Users </h3>
            <input
                onChange={this.searchQuery}
                type="text"
                placeholder="Search users..."
            />
            <table className="table table-striped"
                style={{marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>User Name</th>   
                            <th>Email</th>
                            <th>Role</th>
                            <th>Account Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {findQuery.map((currentUser) =>{
                            return <Users user={currentUser}
                                        //deleteProject={this.deleleProject}
                                        key={currentUser._id}
                                        date={currentUser.date.substring(0,10)}
                        />
            })}
                    </tbody>

                </table>
        </div>
        )
    }
}
