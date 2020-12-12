import React from "react";
import PassowrdChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from "../Session";

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (            
            <div>
                <h1>Account: { authUser.email }</h1>
                <PassowrdChangeForm/>
            </div>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);