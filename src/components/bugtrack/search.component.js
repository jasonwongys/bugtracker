import React, { Component } from 'react'
import axios from 'axios';
export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            results: {},
            loading: false,
            message: ''
        }
    }

    getSearchResults = ( query ) => {
        const searchURL
    }

    onChangeSearch(e) {

        const query = e.target.value;
        this.setState({
            state: {query: query, loading: true, message: ''}
        })
    }

    render() {

        const { query } = this.state;
        return (
            <div className="container">
                <label className="search-label" htmlFor="search-input">

                    <input
                        type="text"
                        value={query}
                        placeholder="search"
                        onChange={this.onChangeSearch}

                    />

                </label>
            </div>
        )
    }
}
