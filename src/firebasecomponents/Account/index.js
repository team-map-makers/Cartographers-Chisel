import React from 'react';

import { PasswordFogotForm } from '../PasswordForgot';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => (
    <div>
        <h1>Account</h1>
        <PasswordForgotForm />
        <PasswordChangeForm />
    </div>
);

export default AccountPage;