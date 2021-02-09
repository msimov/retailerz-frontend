import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withAuthentication } from "../hoc/withAuthentication.hoc";
import withProtectedRoute from "../hoc/withProtectedRoute.hoc";
import Home from "./home.container";
import Landing from "./landing.container";
import SignIn from "./signIn.container";
import SignUp from "./signUp.container";
import Users from "./users.container";
import * as CONDITIONS from "../constants/conditions.constants";
import Search from "./search.container";
import { Navbar } from "../components/navbar.component";
import ResetPassword from "./resetPassword.container";

const App = () => {

    return(
        <Router>
            <div>
                <Navbar />

                <Route exact path={'/'} component={
                    withProtectedRoute([CONDITIONS.USER_NULL])(Landing)
                }/>
                <Route path={'/sign-up'} component={
                    withProtectedRoute([CONDITIONS.USER_NULL])(SignUp)
                }/>
                <Route path={'/sign-in'} component={
                    withProtectedRoute([CONDITIONS.USER_NULL])(SignIn)
                }/>
                <Route path={'/reset-password'} component={
                    withProtectedRoute([CONDITIONS.USER_NULL])(ResetPassword)
                }/>
                <Route path={`/home`} component={
                    withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(Home)
                }/>
                <Route path={'/search'} component={
                    withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(Search)
                }/>
                <Route path={`/users`} component={
                    withProtectedRoute([CONDITIONS.USER_NOT_NULL])(Users)
                }/>
            </div>
        </Router>
    )
    
};

export default withAuthentication(App);