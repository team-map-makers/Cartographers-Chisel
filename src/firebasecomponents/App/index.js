import React from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgotPage from '../PasswordForgot';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../firebaseconstants/routes';
import { withFirebase } from '../Firebase';

import { withAuthentication } from '../Session';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
        };
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(
            authUser => {
                authUser
                ? this.setState({ authUser })
                : this.setState({ authUser: null });
            },
        );
    }

    componentWillUnmount() {
        this.listener();
    }

    render() {
        return (
            <AuthUserContext.Provider value={this.state.authUser}>
                <Router>
                    <div>
                        <Navigation />

                        <hr />

                        <Route exact path={ROUTES.LANDING} components={LandingPage} />
                        <Route path={ROUTES.SIGN_UP} components={SignUpPage} />
                        <Route path={ROUTES.SIGN_IN} components={SignInPage} />
                        <Route path={ROUTES.PASSWORD_FORGOT} components={PasswordForgotPage} />
                        <Route path={ROUTES.HOME} components={HomePage} />
                        <Route path={ROUTES.ACCOUNT} components={AccountPage} />
                        <Route path={ROUTES.ADMIN} components={AdminPage} />
            
                    </div>
                </Router>
            </AuthUserContext.Provider>
        );
    } 
}

export default withAuthentication(App);