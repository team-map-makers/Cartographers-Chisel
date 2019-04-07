import React from 'react';
import { compose } from 'recompose';

import { AuthUserContext, withAuthorization, withEmailVerification,} from '../Session';
import { PasswordForgotForm } from '../PasswordForgot/index';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <center>
                    <h1>Account : {authUser.email}</h1>
                    <PasswordForgotForm />
                    <PasswordChangeForm />
                </center>
            </div>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default compose(withEmailVerification, withAuthorization(condition))(AccountPage);