import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';

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
import { withFirebase } from './firebasecomponents/Firebase';

import { withAuthentication } from './firebasecomponents/Session';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { width: 100, height: 100, mode:"edit", authUser: null, };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.changeMode= this.changeMode.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
          authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      },
    );
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    this.listener();
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  changeMode(newMode){
    this.setState({mode:newMode});
  }

  render() {
    return (
      //<AuthUserContext.Provider value={this.state.authUser}>
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
                    <div className="mainContainer" >
                        <Map width={this.state.width} height={this.state.height} />
                        <Search></Search>
                        <ModeSelect mode={this.state.mode} changeMode={this.changeMode}/>
                    </div>
                </Router>
       // </AuthUserContext.Provider>
    );
  }
}

export default withAuthentication(App);
