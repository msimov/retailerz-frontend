import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";

import * as ROUTES from "../../constants/routes";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import { withAuthentication } from "../Session";

import Products from '../Products';
import Operations from "../Operations";
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
                <Route path={ROUTES.HOME} component={HomePage}/>
                <Route path={ROUTES.ACCOUNT} component={AccountPage}/>

                <Route path={ROUTES.OPERATIONS} component={Operations}/>
                <Route path={ROUTES.PRODUCTS} component={Products}/>
                <Route path={`/${ROUTES.USERS}`} component={Users}>

                </Route>
            </div>
        </Router>
    )
    
};

export default withAuthentication(App);