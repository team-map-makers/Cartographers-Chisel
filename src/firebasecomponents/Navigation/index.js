import React from 'react';
import { Link } from 'reac-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../firebaseconstants/routes';
import { AuthUserContext } from '../Session';

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser => 
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>
)

//const Navigation = ( { authUser }) => (
//    <div>{authUser ? <NavigationAuth /> :  <NavigationNonAuth />}</div>
//);

//const NavigationAuth = () => (
//    <div>
//        <ul>
//           <li><Link to={ROUTES.LANDING}>Landing</Link></li>
//            <li><Link to={ROUTES.HOME}>Home</Link></li>
//            <li><Link to={ROUTES.ACCOUNT}>Account</Link></li>
//            <li><SignOutButton /></li>
//        </ul>
//    </div>
//);

//const NavigationNonAuth = () => (
//    <div>
//        <ul>
//            <li><Link to={ROUTES.LANDING}>Landing</Link></li>
//            <li><Link to={ROUTES.SIGN_IN}>Sign In</Link></li>
//            <li><SignOutButton /></li>
//        </ul>
//   </div>
//);

//<li><Link to={ROUTES.ADMIN}>Admin</Link></li>

export default Navigation;