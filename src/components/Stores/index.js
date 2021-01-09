import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {List} from './List';
import {AddEdit} from './AddEdit';
import { withProtectedRoute } from '../Session';
import * as CONDITIONS from '../../constants/conditions';

const Stores = ({match}) => {
    const {path} = match;
    console.log(path)
    return(
        <Switch>
            <Route exact path={`${path}/add`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA, CONDITIONS.USER_TYPE_RETAILER])(AddEdit)
                }/>
            <Route path={`${path}/:storeId/edit`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA, CONDITIONS.USER_TYPE_RETAILER])(AddEdit)
            }/>
            <Route path={`${path}/`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA, CONDITIONS.USER_TYPE_RETAILER])(List)
            } />
        </Switch>
    )
}

export default Stores;