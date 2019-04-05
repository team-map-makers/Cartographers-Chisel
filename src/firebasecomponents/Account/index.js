import React from 'react';
import { compose } from 'recompose';

import { AuthUserContext, withAuthorization, withEmailVerification,} from '../Session';
import { PasswordFogotForm } from '../PasswordForgot';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <h1>Account : {authUser.email}</h1>
                <PasswordForgotForm />
                <PasswordChangeForm />
            </div>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default compose(withEmailVerification, withAuthorization(condition))(AccountPage);