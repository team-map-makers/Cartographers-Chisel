import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Map from './uicomponents/Map/Map.js';
import ModeSelect from './uicomponents/ModeSelect/ModeSelect'
import Search from './uicomponents/Search/Search';

import Navigation from './firebasecomponents/Navigation';
import LandingPage from './firebasecomponents/Landing';
import SignUpPage from './firebasecomponents/SignUp';
import SignInPage from './firebasecomponents/SignIn';
import PasswordForgotPage from './firebasecomponents/PasswordForgot';
import HomePage from './firebasecomponents/Home';
import AccountPage from './firebasecomponents/Account';
import AdminPage from './firebasecomponents/Admin';

import * as ROUTES from './firebaseconstants/routes';

import { withAuthentication } from './firebasecomponents/Session';

//require('dotenv').config()

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { width: 100, height: 100, mode:"edit", };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.changeMode= this.changeMode.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  changeMode(newMode){
    this.setState({mode:newMode});
  }

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
            
                    </div>
                    <div className="mainContainer" >
                        <Map width={this.state.width} height={this.state.height} />
                        <Search></Search>
                        <ModeSelect mode={this.state.mode} changeMode={this.changeMode}/>
                    </div>
                </Router>
    );
  }
}

export default withAuthentication(App);
