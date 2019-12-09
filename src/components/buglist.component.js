import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Bug = props => (
    <tr>
        <td className={props.bug.completed ? 'completed' : ''}>{props.bug.description}</td>
        <td className={props.bug.completed ? 'completed' : ''}>{props.bug.assignee}</td>
        <td className={props.bug.completed ? 'completed' : ''}>{props.bug.priority}</td>
        <td>
            <Link to={"/edit/"+props.bug._id}>Edit </Link>
        </td>
    </tr>
)

export default class BugList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bugs: []
        };

    }
    componentDidMount() {
        axios.get('http://localhost:4000/bugs/')
            .then(response => {
                this.setState({
                    bugs: response.data});
            
            })
            .catch(function(error) {
                console.log(error)
            })

    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/bugs/')
        .then(response => {
            this.setState({
                bugs: response.data});
        
        })
        .catch(function(error) {
            console.log(error)
        })

}

    bugList() {
        return this.state.bugs.map(function(currentBug, i) {
            return <Bug bug={currentBug}
                        key={i} />;
        });
    }
    
    render() {
        return (
            <div>
                <h1> Bugs list</h1>
                <table className="table table-striped"
                    style={{marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Assignee</th>
                                <th>Priority</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.bugList()}
                        </tbody>

                    </table>
            </div>
        )
    }
}
