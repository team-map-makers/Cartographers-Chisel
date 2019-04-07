import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Navigation from './firebasecomponents/Navigation';
import LandingPage from './firebasecomponents/Landing';
import SignUpPage from './firebasecomponents/SignUp';
import SignInPage from './firebasecomponents/SignIn';
import PasswordForgotPage from './firebasecomponents/PasswordForgot';
import HomePage from './firebasecomponents/Home';
import AccountPage from './firebasecomponents/Account';
import AdminPage from './firebasecomponents/Admin';
import MapPage from './firebasecomponents/Mappage'

import * as ROUTES from './firebaseconstants/routes';

import { withAuthentication } from './firebasecomponents/Session';

require('dotenv').config();

//require('dotenv').config()

class App extends Component {

  

  render() {
    return (
                <Router>
                    <div>
                        <Navigation />

                        <hr />

                        <Route exact path={ROUTES.LANDING} component={LandingPage} />
                        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                        <Route path={ROUTES.PASSWORD_FORGOT} component={PasswordForgotPage} />
                        <Route path={ROUTES.HOME} component={HomePage} />
                        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                        <Route path={ROUTES.ADMIN} component={AdminPage} />
                        <Route path={ROUTES.MAPPAGE} component={MapPage} />
            
                    </div>
                    
                </Router>
    );
  }
}

export default withAuthentication(App);
