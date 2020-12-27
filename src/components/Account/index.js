import React from "react";
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withProtectedRoute } from "../Session";
import * as CONDITIONS from '../../constants/conditions';

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (            
            <div>
                <h1>Account: { authUser.email }</h1>
                <PasswordChangeForm/>
            </div>
        )}
    </AuthUserContext.Consumer>
);


export default withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(AccountPage);