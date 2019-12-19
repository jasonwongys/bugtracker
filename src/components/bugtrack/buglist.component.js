import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


const Bug = props => (
    <tr>
        <td className={props.bug.completed ? 'completed' : ''}>{props.bug.description}</td>
        <td className={props.bug.completed ? 'completed' : ''}>{props.date}</td>
        <td className={props.bug.completed ? 'completed' : ''}>{props.bug.assignee}</td>
        <td className={props.bug.completed ? 'completed' : ''}>{props.bug.priority}</td>
        
        <td>
            <Link to={"/edit/"+props.bug._id} >Edit </Link> | <a href="#" onClick={() => { props.deleteBug(props.bug._id) }}> delete</a> 
        </td>

        
    </tr>
)
export default class BugList extends Component {
    constructor(props) {
        super(props);

        this.deleteBug = this.deleteBug.bind(this);

        this.state = {
            bugs: []
        };

        

    }
    componentDidMount() {
        axios.get('http://localhost:4000/bugs/buglist')
            .then(response => {
                this.setState({
                    bugs: response.data});
            
            })
            .catch(function(error) {
                console.log(error)
            })

    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/bugs/buglist')
        .then(response => {
            this.setState({
                bugs: response.data});
        })
        .catch(function(error) {
            console.log(error)

        })

}

    deleteBug(id) {
        axios.delete('http://localhost:4000/bugs/'+id) 
            .then(response => {console.log(response.data)});

        this.setState({
            bugs: this.state.bugs.filter(el => el._id !== id)
        })
    }

    bugList() {
        return this.state.bugs.map((currentBug) =>{

            return <Bug bug={currentBug}
                        deleteBug={this.deleteBug}
                        key={currentBug._id}
                        date={currentBug.date.substring(0,10)} />;
        });
    }
    
    render() {
        return (
            <div className="container">
                <h3> Bugs list</h3>
                <table className="table table-striped"
                    style={{marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Deadline</th>
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
