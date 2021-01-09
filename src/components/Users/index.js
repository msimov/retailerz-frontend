import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {Info} from './Info.js';
import {AddEdit} from './AddEdit';
import { withProtectedRoute } from '../Session';
import * as CONDITIONS from '../../constants/conditions';
import * as ROUTES from '../../constants/routes';
import Stores from '../Stores/index.js';

const Users = ({match}) => {
    const {url, path} = match;
    console.log(url)
    return(
        <Switch>
            <Route exact path={`${path}/add`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_DATA_UNDEFINED])(AddEdit)
            }/>
            <Route path={`${path}/:userId/edit`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA, CONDITIONS.USER_TYPE_RETAILER])(AddEdit)
            } />

            <Route path={`${path}/:userId/${ROUTES.STORES}`} component={Stores}/>

            <Route path={`${path}/:userId`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA, CONDITIONS.USER_TYPE_RETAILER])(Info)
            }/>


        </Switch>
    )
}

export default Users;