import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {GroupAddEditForm} from '../components/groupAddEditForm.component';
import {GroupsList} from '../components/groupsList.component';
import withProtectedRoute from '../hoc/withProtectedRoute.hoc';
import * as CONDITIONS from '../constants/conditions.constants';

const Groups = ({match}) => {
    const {path} = match;
    return(
        <Switch>
            <Route exact path={`${path}/add`} component={
                withProtectedRoute([CONDITIONS.USER_HAS_DATA, CONDITIONS.USER_NOT_NULL])(GroupAddEditForm)
            }/>
            
            <Route path={`${path}/:groupId/edit`} component={
                withProtectedRoute([CONDITIONS.USER_HAS_DATA, CONDITIONS.USER_NOT_NULL])(GroupAddEditForm)
            } />

            <Route path={`${path}`} component={
                withProtectedRoute([CONDITIONS.USER_HAS_DATA, CONDITIONS.USER_NOT_NULL])(GroupsList)
            }/>
        </Switch>
    )
}

export default Groups;