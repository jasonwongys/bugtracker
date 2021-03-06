import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
//import BugList from '../bugtrack/buglist.component'

const Bug = props => (
    <tr>
        <td className={props.bug.completed ? 'completed' : ''}>{props.bug.description}</td>
        <td className={props.bug.completed ? 'completed' : ''}>{(props.date).substring(0,10)}</td>
        <td className={props.bug.completed ? 'completed' : ''}>{props.bug.members}</td>
        <td className={props.bug.completed ? 'completed' : ''}>{props.bug.priority}</td>
        
        <td>
            <Link to={"/edit/"+props.bug._id} className="btn btn-success" >Edit </Link> | <Link className="btn btn-danger" onClick={() => { props.deleteBug(props.bug._id) }}> delete</Link> 
        </td>
    </tr>
)

export default class ViewProjectBugs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bugsList: [],
            data: []
        }

        this.deleteBug = this.deleteBug.bind(this);
    }

    componentDidMount() {
        axios.get('https://my-bugtracker-app.herokuapp.com/projects/bugs/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    bugsList: response.data});
                    console.log("Did Mount here" + JSON.stringify(response.data));
            
            }).then(axios.get('https://my-bugtracker-app.herokuapp.com/bugs/')
                .then(response => {
                        this.setState({
                            data: response.data});
                            console.log("Data Mount here" + JSON.stringify(response.data));
                    
                    }))
                    .catch(function(error) {
                        console.log(error)
                    })
    }

    deleteBug(id) {
        axios.delete('https://my-bugtracker-app.herokuapp.com/bugs/'+id) 
            .then(response => {console.log(response.data)});

        this.setState({
            data: this.state.data.filter(el => el._id !== id)
        })
    }

    render() {
        
        //console.log("Buglist ID",this.state.bugsList._id);
        let filtered = this.state.data.filter((i) => {
            if(i.projects === this.state.bugsList._id) {
                return i;
            };

        })

        let bugDescription = filtered.map((currentBug) => {
            return <Bug key={currentBug.id} 
                        bug={currentBug}
                        deleteBug={this.deleteBug}
                        date={currentBug.date}
            />});
    
        console.log("result ",this.state.data);
        
        

        console.log("Bugs date here",this.state.bugsList);
        
        return (
            <div className="container">
                <h3>Project Name: {this.state.bugsList.projectName}</h3>

                <table className="table"
                    style={{marginTop: 20 }}>
                        <thead>buglist
                            <tr>
                        
                                <th>Description</th>
                                <th>Deadline</th>
                                <th>Members</th>
                                <th>Priority</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>{bugDescription}</tbody>
                {/* <BugList bugs={this.state.bugsList.bugs}/> */}
                </table>
            </div>  
        )
    }
}
