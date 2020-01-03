import React, { Component } from 'react'
import axios from 'axios'

export default class ViewProjectBugs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bugsList: []

        }
    }

    async componentDidMount() {
        axios.get('http://localhost:4000/projects/bugs/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    bugsList: response.data});
                    console.log("Did Mount here" + JSON.stringify(response.data));
            
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    getDerivedStateFromProps() {
        
    }
    

    // componentDidMount() {
    //     axios.get('http://localhost:4000/bugs/')
    //         .then(response => {
    //             this.setState({
    //                 bugsList: response.data});
    //                 console.log("Did Mount here" + JSON.stringify(response.data));
            
    //         })
    //         .catch(function(error) {
    //             console.log(error)
    //         })
    // }

    render() {
        return (
            <div>
                <h3>{this.state.bugsList.projectName}</h3>
                
            </div>  
        )
    }
}
