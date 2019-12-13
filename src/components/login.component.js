import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './login.component.css';
import {
  setInStorage,
  getFromStorage,
  } from '../config/utils/storage'

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoading: true,
        token: '',
        signUpError: '',
        signInError: '',
        signInEmail: '',
        signInPassword: '',
        signUpEmail: '',
        signUpPassword: '',
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.logout = this.logout.bind(this);
}

componentDidMount() {
    const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
        const { token } = obj;
        // Verify token
        fetch('/api/account/verify?token=' + token)
            .then(res => res.json())
            .then(json => {
            if (json.success) {
                this.setState({
                token,
                isLoading: false
                });
            } else {
                this.setState({
                isLoading: false,
                });
            }
        });
} else {
    this.setState({
        isLoading: false
    });
}
}

onTextboxChangeSignInEmail(event) {
    this.setState({
        signInEmail: event.target.value
    });
}

onTextboxChangeSignInPassword(event) {
    this.setState({
        signInEmail: event.target.value
    });
}

onTextboxChangeSignUpEmail(event) {
    this.setState({
        signInEmail: event.target.value
    });
}

onTextboxChangeSignUpPassword(event) {
    this.setState({
        signInPassword: event.target.value
    });
}

onSignUp() {
    const { signUpEmail,signUpPassword } = this.state;
    this.setState({
        isLoading: true,
    });
      // Post request to backend
    fetch('/api/account/signup', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            email: signUpEmail,
            password: signUpPassword,
            }),
        }).then(res => res.json())
            .then(json => {
            console.log('json', json);
            if (json.success) {
                this.setState({
                signUpError: json.message,
                isLoading: false,
                signUpEmail: '',
                signUpPassword: '',
                });
            } else {
                this.setState({
                signUpError: json.message,
                isLoading: false,
                });
            }
            });
    }

    onSignIn() {
            // Grab state
            const {
            signInEmail,
            signInPassword,
            } = this.state;
            this.setState({
            isLoading: true,
            });
            // Post request to backend
            fetch('/api/account/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword,
            }),
            }).then(res => res.json())
            .then(json => {
                console.log('json', json);
                if (json.success) {
                setInStorage('the_main_app', { token: json.token });
                this.setState({
                    signInError: json.message,
                    isLoading: false,
                    signInPassword: '',
                    signInEmail: '',
                    token: json.token
                });
                } else {
                this.setState({
                    signInError: json.message,
                    isLoading: false
                });
                }
            });
        }

        logout() {
            this.setState({
                isLoading: true,
                });
                const obj = getFromStorage('the_main_app');
                if (obj && obj.token) {
                const { token } = obj;
                // Verify token
                fetch('/api/account/logout?token=' + token)
                    .then(res => res.json())
                    .then(json => {
                    if (json.success) {
                        this.setState({
                        token: '',
                        isLoading: false
                        });
                    } else {
                        this.setState({
                        isLoading: false,
                        });
                    }
                    });
                } else {
                this.setState({
                    isLoading: false,
                });
                }
            }

render() {
        const {
        isLoading,
        token,
        signInError,
        signInEmail,
        signInPassword,
        signUpEmail,
        signUpPassword,
        signUpError
        } = this.state;
        
        if (isLoading) {
        return (<div><p>Loading...</p></div>);
        }
        if (!token) {
        return (
            <div>
            <div>
                {
                (signInError) ? (
                    <p>{signInError}</p>
                ) : (null)
                }
                <p>Sign In</p>
                <input
                    type="email"
                    placeholder="Email"
                    value={signInEmail}
                    onChange={this.onTextboxChangeSignInEmail}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={signInPassword}
                    onChange={this.onTextboxChangeSignInPassword}
                />
                <br />
                <button>Sign In</button>
            </div>
            <br />
            <br />
            <div>
                {
                (signUpError) ? (
                    <p>{signUpError}</p>
                ) : (null)
                }
                <p>Sign Up</p>
                <input
                    type="email"
                    placeholder="Email"
                    value={signUpEmail}
                    onChange={this.onTextboxChangeSignUpEmail}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={signUpPassword}
                    onChange={this.onTextboxChangeSignUpPassword}
                />
                <br />
                <button onClick={this.onSignUp}>Sign Up</button>
                <button onClick={this.onSignIn}>Sign In</button>
            </div>
        </div>
        );
              }
            return (
                <div className="container-fluid">
                <div className="row no-gutter">
                    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                <div className="col-md-8 col-lg-6">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                <h3 className="login-heading mb-4">Welcome back!</h3>
                <form action="">
                    <div className="form-label-group">
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
                    <label for="inputEmail">Email address</label>
                    </div>

                    <div className="form-label-group">
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                    <label for="inputPassword">Password</label>
                    </div>

                    <div className="custom-control custom-checkbox mb-3">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" for="customCheck1">Remember password</label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Sign in</button>
                    <div className="text-center">
                    <a className="small" href="#">Forgot password?</a></div>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
            )
    }
}
