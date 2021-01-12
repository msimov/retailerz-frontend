import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MeasureUnitAddEditForm } from '../components/measureUnitAddEditForm.component';
import { MeasureUnitsList } from '../components/measureUnitsList.component';
import withProtectedRoute from '../hoc/withProtectedRoute.hoc';
import * as CONDITIONS from '../constants/conditions.constants';

const MeasureUnits = ({match}) => {
    const {path} = match;
    return(
        <Switch>
            <Route exact path={`${path}/add`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(MeasureUnitAddEditForm)
            }/>
            
            <Route path={`${path}/:measureUnitId/edit`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(MeasureUnitAddEditForm)
            } />

            <Route path={`${path}`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(MeasureUnitsList)
            }/>
        </Switch>
    )
}

export default MeasureUnits;