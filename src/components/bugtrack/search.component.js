import React, { Component } from 'react'
import axios from 'axios'
export default class Search extends Component {

    constructor( props ) {
		super( props );
		this.state = {
			query: '',
                        results: {},
                        loading: false,
                        message: '',
        };

        this.cancel = '';
        
        this.handleOnInputChange = this.handleOnInputChange.bind();

    }

    fetchSearchResults = (updatedPageNo = '', query ) => {
        const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
        // By default the limit of results is 20
        const searchUrl = `https://pixabay.com/api/?key=12413278-79b713c7e196c7a3defb5330e&q=${query}${pageNumber}`;
        if (this.cancel) {
            // Cancel the previous request before making a new request
            this.cancel.cancel();
        }
        // Create a new CancelToken
        this.cancel = axios.CancelToken.source();

        axios
            .get(searchUrl, {
                cancelToken: this.cancel.token,
            })
            .then((res) => {
                const resultNotFoundMsg = !res.data.hits.length
                    ? 'There are no more search results. Please try a new search.'
                    : '';
                this.setState({
                    results: res.data.hits,
                    message: resultNotFoundMsg,
                    loading: false,
                });
            })
            .catch((error) => {
                if (axios.isCancel(error) || error) {
                    this.setState({
                        loading: false,
                        message: 'Failed to fetch results.Please check network',
                    });
                }
            });
    };
    handleOnInputChange = (event) => {
        const query = event.target.value;
                this.setState({ query, loading: true, message: ''  } );
    };

	render() {
		return (
			<div className="container">
				{/*Heading*/}
			
				{/*Search Input*/}
				<label className="search-label" htmlFor="search-input">
                
					<input
						type="text"
						value=""
						id="search-input"
						placeholder="Search..."
                        onChange={this.handleOnInputChange}
					/>
					
				</label>
				
			</div>
			)
	}
}