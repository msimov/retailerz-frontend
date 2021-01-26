import React from 'react';
import { Route, Switch } from 'react-router-dom';
import withProtectedRoute from '../hoc/withProtectedRoute.hoc';
import * as CONDITIONS from '../constants/conditions.constants';
import { InventoryList } from '../components/inventoryList.component';

const Inventory = ({match}) => {
    const {path} = match;
    return(
        <Switch>
            <Route path={`${path}`} component={
                withProtectedRoute([CONDITIONS.USER_HAS_DATA, CONDITIONS.USER_NOT_NULL])(InventoryList)
            }/>
        </Switch>
    )
}

export default Inventory;