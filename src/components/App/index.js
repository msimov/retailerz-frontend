import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";

import * as ROUTES from "../../constants/routes";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import { withAuthentication } from "../Session";
import Users from "../Users";

const App = () => {


    return(
        <Router>
            <div>
                <Navigation />
                <hr/>
                <Route exact path={ROUTES.LANDING} component={LandingPage}/>
                <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
                <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>

                <Route path={`/home`} component={HomePage}/>
                <Route path={`/users`} component={Users}/>
            </div>
        </Router>
    )
    
};

export default withAuthentication(App);