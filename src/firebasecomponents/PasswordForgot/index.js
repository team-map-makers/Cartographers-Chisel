import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../firebaseconstants/routes';

import './passwordforgot.scss'

const PasswordForgotPage = () => (
    <div className="Forgot-Password-Form">
    <center>
        <h1>Did you forget your password?</h1>
        <PasswordForgotForm />
        <h1></h1>
        </center>
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgotFormBase extends Component {
    constructor(props) { 
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });  
            });

        event.preventDefault();
    };
    
    onChange = event => {
        this.setState({ [event.target.name] : event.target.value });
    };

    render() {
        const { email, error } = this.state;
        const isInvalid = email === '';

        return (
            <form onSubmit={this.onSubmit}  >
                <input className="Forgot-Password-Fields"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <h1></h1>
                <div className="Forgot-Password-Button">
                <button disabled={isInvalid} type="submit">Reset My Password</button>
                </div>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const PasswordForgotLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGOT}>Forgot Password?</Link>
    </p>
);

export default PasswordForgotPage;

const PasswordForgotForm = withFirebase(PasswordForgotFormBase);

export { PasswordForgotForm, PasswordForgotLink };