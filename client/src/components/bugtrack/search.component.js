import React, { Component } from 'react'
import Bugs from "./buglist.component"
export default class Search extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            
        }
        this.searchQuery = this.searchQuery.bind(this);
    }


    searchQuery(e) {
        this.setState({
            query: e.target.value
            
        })
    }

    render() {
        let findQuery = this.props.data.filter(
            i => {
                return i.description.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1}
        );

        console.log("The data return @ Search " + JSON.stringify(this.props.data));
        console.log("The found return " + JSON.stringify(findQuery));
    
        return (
            <div>
                <input
                    onChange={this.searchQuery}
                    type="text"
                    placeholder="Search..."
                />

                {/* {findQuery.map((i)=> {
                    return <li key={i._id}>{i}</li>

                })}  */}

            </div>
        )
    }
}

// get input value in search bar
// add search value into search route
// get return search values from search route
// display return values 