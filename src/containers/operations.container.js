import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { OperationAddEditForm } from '../components/operationAddEditForm.component';
import { OperationsList } from '../components/operationsList.component';
import withProtectedRoute from '../hoc/withProtectedRoute.hoc';
import * as CONDITIONS from '../constants/conditions.constants';

const Operations = ({match}) => {
    const {path} = match;

    return(
        <Switch>
            <Route exact path={`${path}/add`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(OperationAddEditForm)
            }/>
            
            <Route path={`${path}/:operationId/edit`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(OperationAddEditForm)
            } />

            <Route path={`${path}`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(OperationsList)
            }/>
        </Switch>
    )
}

export default Operations;