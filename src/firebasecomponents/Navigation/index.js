import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../firebaseconstants/routes';
import * as ROLES from '../../firebaseconstants/roles';


const Navigation = () => (
        <AuthUserContext.Consumer>
            {authUser => 
                authUser ? (<NavigationAuth authUser={authUser} />) : (<NavigationNonAuth />)
            }
        </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
    <div>
        <ul>
           <li><Link to={ROUTES.LANDING}>Landing</Link></li>
            <li><Link to={ROUTES.HOME}>Home</Link></li>
            <li><Link to={ROUTES.ACCOUNT}>Account</Link></li>

            {authUser.roles.includes(ROLES.ADMIN) && (
            <li><Link to={ROUTES.ADMIN}>Admin</Link></li>)}
            
            <li><SignOutButton /></li>
        </ul>
    </div>
);

const NavigationNonAuth = () => (
    <div>
        <ul>
            <li><Link to={ROUTES.LANDING}>Landing</Link></li>
            <li><Link to={ROUTES.SIGN_IN}>Sign In</Link></li>
            <li><SignOutButton /></li>
        </ul>
   </div>
);

export default Navigation;