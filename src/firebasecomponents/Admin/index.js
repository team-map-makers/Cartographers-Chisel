import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { UserList, UserItem } from '../Users';
import * as ROLES from '../../firebaseconstants/roles';
import * as ROUTES from '../../firebaseconstants/routes';


const AdminPage = () => (
    <div>
        <h1>Admin</h1>
        <p>The Admin Page is accessible by every signed in admin user.</p>

        <Switch>
            <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
            <Route exact path={ROUTES.ADMIN} component={UserList} />
        </Switch>
    </div>
); 

const condition = authUser => 
    authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
    withEmailVerification, 
    withAuthorization(condition), 
    withFirebase,
    )(AdminPage);