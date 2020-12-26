import React from "react";
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withProtectedRoute } from "../Session";
import * as ROUTES from '../../constants/routes';

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

const condition = authUser => !!authUser;

export default withProtectedRoute(condition, ROUTES.SIGN_IN)(AccountPage);