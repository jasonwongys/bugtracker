import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import axios from "axios";
class Register extends Component {
    constructor() {
        super();
        this.state = {
        name: "",
        email: "",
        password: "",
        password2: "",
        errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
            }
        }

        
    onChange = e => {
        this.setState({ 
            [e.target.id]: e.target.value
        });
    };
    onSubmit = e => {
        e.preventDefault();


    const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
        };

    
        axios.post('http://localhost:4000/api/users/register',newUser)
            .then(response => console.log(response.data),
            this.props.registerUser(newUser, this.props.history));

        this.setState({
            name: '',
            email: '',
            password: ''
        })

    
    };

    render() {
        const { errors } = this.state;
            return (
                <div className="container-fluid">
                        <Link to="/login">
                            <i class="fas fa-backspace"></i> Back to Login
                        </Link>
                        <div className="form-group" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                            <b>Register</b> below
                        </h4>
                        <p className="grey-text text-darken-1">
                            Already have an account? <Link to="/login">Log in</Link>
                        </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    className={classnames("", {
                                    invalid: errors.name
                                })}
                                />
                            
                            <span className="red-text">{errors.name}</span>
                        </div>
                        <div className="form-group ">
                        <label htmlFor="email">Email</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                type="email"
                                className={classnames("", {
                                    invalid: errors.email
                            })}
                            />
                            
                            <span className="red-text">{errors.email}</span>
                        </div>
                        <div className="form-group">
                        <label htmlFor="password">Password</label>
                            <input
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password"
                            type="password"
                            className={classnames("", {
                                invalid: errors.password
                            })}
                            />
                            
                            <span className="red-text">{errors.password}</span>
                        </div>
                        <div className="form-group">
                        <label htmlFor="password2">Confirm Password</label>
                            <input
                            onChange={this.onChange}
                            value={this.state.password2}
                            error={errors.password2}
                            id="password2"
                            type="password"
                            className={classnames("", {
                                invalid: errors.password2
                            })}
                            />
                            
                            <span className="red-text">{errors.password2}</span>
                        </div>
                        <div className="form-group" style={{ paddingLeft: "11.250px" }}>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                            type="submit"
                            className="btn btn-primary"
                            >Sign up </button>
                            
                        </div>
                        </form>
                    </div>
        
                
                );
            }
        }

Register.propTypes = {
        registerUser: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
        auth: state.auth,
        errors: state.errors
});



export default connect(
        mapStateToProps,
        { registerUser }
)(withRouter(Register));
