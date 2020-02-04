import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import Navbar from "../layout/Navbar";
import App from "../../App";
import './login.css';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
        
          this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
    if (nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
    const userData = {
        email: this.state.email,
        password: this.state.password
        };
    console.log("User data: ",userData)
    this.props.loginUser(userData);

    };
    render() {
        const { errors } = this.state;
        console.log("this props: ", JSON.stringify(this.props.history));
    return (
        <div className="container-fluid">
            <div className="row no-gutter">
                <div className="d-none d-md-flex col-md-4 col-lg-12 bg-image">
                <div className="col-md-8 col-lg-8">
                <div className="login d-flex align-items-center py-5">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-9 col-lg-8 mx-auto">
                        <h3 className="login-heading mb-4 display-4 text-white" id="welcomeMsg">Welcome to Bug Tracker</h3>
                        <h4><b>Login</b> below</h4>
                        
                    
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-label-group">
                    
                        <input
                            placeholder="Email"
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id="email"
                            type="email"
                            className={classnames("", {
                                invalid: errors.email || errors.emailnotfound
                            })}
                        />
                        <label htmlFor="email">Email</label>
                            <span className="red-text">
                                {errors.email}
                                {errors.emailnotfound}
                            </span>
                    </div>
                    <div className="form-label-group">
                    
                        <input
                            placeholder="Password "
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password"
                            type="password"
                            className={classnames("", {
                                invalid: errors.password || errors.passwordincorrect
                            })}
                        />
                        <label htmlFor="password">Password</label>
                        <span className="red-text">
                            {errors.password}
                            {errors.passwordincorrect}
                        </span>
                    </div>

                    <div className="custom-control custom-checkbox mb-3">
                        <input type="checkbox" class="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label text-white" for="customCheck1">Remember password</label>
                    </div>
                <div className="col s4" style={{ paddingLeft: "11.250px" }}>
                    <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold"
                            type="submit">Login</button>
                </div>
                <div className="text-center">
                    <a className="small" href="#">Forgot password?</a>
                    <p className="grey-text text-darken-1">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </div>
                </form>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
        </div>
            
            </div>
        );
    }
    }
    Login.propTypes = {
        loginUser: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired
    };
    const mapStateToProps = state => ({
        auth: state.auth,
        errors: state.errors
    });

    export default connect(
    mapStateToProps,
    { loginUser }
    )(Login);