import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ChangePasswordForm } from '../components/changePasswordForm.component';
import { UserAddEditForm } from '../components/userAddEditForm.component';
import Stores from './stores.container';
import Products from './products.container';
import Operations from './operations.container';
import MeasureUnits from './measureUnits.container';
import Groups from './groups.container';
import { UserInfo } from '../components/userInfo.component';
import withProtectedRoute from '../hoc/withProtectedRoute.hoc';
import * as CONDITIONS from '../constants/conditions.constants';
import Cart from './cart.container';
import Inventory from './inventory.container';

const Users = ({match}) => {
    const {path} = match;
    return(
        <Switch>
            <Route exact path={`${path}/add`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_DATA_UNDEFINED])(UserAddEditForm)
            }/>
            <Route path={`${path}/:userId/edit`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(UserAddEditForm)
            } />
            <Route path={`${path}/:userId/change-password`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(ChangePasswordForm)
            } />
            <Route path={`${path}/:userId/stores`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(Stores)
            } />
            <Route path={`${path}/:userId/products`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(Products)
            } />
            <Route path={`${path}/:userId/operations`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(Operations)
            } />
            <Route path={`${path}/:userId/measure-units`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(MeasureUnits)
            } />
            <Route path={`${path}/:userId/groups`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(Groups)
            } />
            <Route path={`${path}/:userId/inventory`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(Inventory)
            } />
            <Route path={`${path}/:userId/cart`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(Cart)
            } />
            <Route path={`${path}/:userId`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(UserInfo)
            }/>
        </Switch>
    )
}

export default Users;