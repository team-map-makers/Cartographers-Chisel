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
import { withAuthentication } from '../Session';

const App = () => (
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
);

export default withAuthentication(App);