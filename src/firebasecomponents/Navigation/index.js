import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../firebaseconstants/routes';
import * as ROLES from '../../firebaseconstants/roles';

import './Navigation.scss';


const Navigation = () => (
        <AuthUserContext.Consumer>
            {authUser => 
                authUser ? (<NavigationAuth authUser={authUser} />) : (<NavigationNonAuth />)
            }
        </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
    <nav>
        <ul className="Links-Order">
            <li><Link to={ROUTES.LANDING}>Landing</Link></li>
            <li><Link to={ROUTES.HOME}>Home</Link></li>
            <li><Link to={ROUTES.ACCOUNT}>Account</Link></li>
            <li><Link to={ROUTES.MAPPAGE}>Map</Link></li>
            {!!authUser.roles[ROLES.ADMIN] && (
            <li><Link to={ROUTES.ADMIN}>Admin</Link></li>)}

            <li><SignOutButton /></li>
            
        </ul>
    </nav>
);

const NavigationNonAuth = () => (
    <nav>
       <ul className="Links-Order">
       <li><Link to={ROUTES.LANDING}>Landing</Link></li>
       <li><Link to={ROUTES.SIGN_IN}>Sign In</Link></li>
       <li><SignOutButton /></li>
        </ul>
   </nav>
);

export default Navigation;