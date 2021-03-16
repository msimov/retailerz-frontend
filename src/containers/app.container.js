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
import Groups from "./groups.container";
import MeasureUnits from "./measureUnits.container";
import Operations from "./operations.container";
import Products from "./products.container";
import Stores from "./stores.container";
import Cart from "./cart.container";
import Inventory from "./inventory.container";
import { Grid } from "semantic-ui-react";

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
                <Route path={`/groups`} component={
                    withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(Groups)
                } />
                <Route path={`/measure-units`} component={
                    withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(MeasureUnits)
                } />
                <Route path={`/operations`} component={
                    withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(Operations)
                } />
                <Route path={`/products`} component={
                    withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(Products)
                } />
                <Route path={`/stores`} component={
                    withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(Stores)
                } />
                <Route path={`/cart`} component={
                    withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(Cart)
                } />
                <Route path={`/inventory`} component={
                    withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(Inventory)
                } />
            </div>
        </Router>
    )
    
};

export default withAuthentication(App);