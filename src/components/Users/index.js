import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {List} from './List.js';
import {AddEdit} from './AddEdit';
import { withProtectedRoute } from '../Session';
import * as CONDITIONS from '../../constants/conditions';

const Users = ({match}) => {
    const {path} = match;

    return(
        <Switch>
            <Route exact path={`${path}/add`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_DATA_UNDEFINED])(AddEdit)
            }/>
            <Route path={`${path}/:userId/edit`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA, CONDITIONS.USER_TYPE_RETAILER])(AddEdit)
            } />
            <Route path={`${path}/:userId`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA, CONDITIONS.USER_TYPE_RETAILER])(List)
            }/>
        </Switch>
    )
}

export default Users;