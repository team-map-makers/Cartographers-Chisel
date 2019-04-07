import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgotLink } from '../PasswordForgot';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../firebaseconstants/routes';

import "./SignIn.scss"

const SignInPage = () => (
    <div>
    <center>
        <h1>SignIn</h1>
        <SignInForm />
        <PasswordForgotLink />
        <SignUpLink />
        </center>
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {

    constructor(props) {
        super(props);
        
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase 
            .doSignInWithEmailAndPassword(email, password)
            .then (() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
        
        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <form onSumbit={this.onSubmit}>
                <input className="Email-Submit"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <h1></h1>
                <input className="Password-Submit"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <h1></h1>
                <div>
                <button disabled={isInvalid} type="submit">Sign In</button>
                </div>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignInForm = compose(withRouter, withFirebase,)(SignInFormBase);

export default SignInPage;

export { SignInForm };