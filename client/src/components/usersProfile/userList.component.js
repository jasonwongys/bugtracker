import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Users = props => (
    <tr>
    <td>{props.user.name}</td>
        <td >{props.user.email}</td>
        <td >{props.user.role}</td>
        <td >{(props.user.date).substring(0,10)}</td>
        
        <td>
        <Link to={"/api/users/"+props.user._id} className="btn btn-success" >Edit </Link>  <button className="btn btn-danger" onClick={() => { props.deleteUser(props.user._id) }}> Delete</button>
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
        this.deleteUser = this.deleteUser.bind(this);
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

    deleteUser(id) {
        axios.delete('http://localhost:4000/users/'+id) 
            .then(response => {console.log(response.data)});

        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        })
    }

    render() {

        console.log("Users " + JSON.stringify(this.state.users));

        let findQuery = this.state.users.filter(
            i => i.name.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1);
            
        return (
            <div className="container-fluid">
            <ol className="breadcrumb mb-3">
                <li className="breadcrumb-item active"><strong>Users</strong></li>
            </ol>
            
            <input
                className="form-control mr-sm-2"
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
                            <th>Assigned Bugs</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {findQuery.map((currentUser) =>{
                            return <Users user={currentUser}
                                        deleteUser={this.deleleUser}
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
