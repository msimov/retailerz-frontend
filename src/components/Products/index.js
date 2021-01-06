import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {List} from './List';
import {AddEdit} from './AddEdit';
import { withProtectedRoute } from '../Session';
import * as CONDITIONS from '../../constants/conditions';

const Products = ({match}) => {
    const {path} = match;

    return(
        <Switch>
            <Route exact path={path} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA, CONDITIONS.USER_TYPE_RETAILER])(List)
                }/>
            <Route path={`${path}/add`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA, CONDITIONS.USER_TYPE_RETAILER])(AddEdit)
            }/>
            <Route path={`${path}/edit/:id`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA, CONDITIONS.USER_TYPE_RETAILER])(AddEdit)
            } />
        </Switch>
    )
}

export default Products;