import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ChangePasswordForm } from '../components/changePasswordForm.component';
import { UserAddEditForm } from '../components/userAddEditForm.component';
import { UserInfo } from '../components/userInfo.component';
import withProtectedRoute from '../hoc/withProtectedRoute.hoc';
import * as CONDITIONS from '../constants/conditions.constants';

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
            <Route path={`${path}/:userId`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(UserInfo)
            }/>
        </Switch>
    )
}

export default Users;