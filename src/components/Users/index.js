import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Operations from '../Operations';
import Products from '../Products';
import Stores from '../Stores';
import MeasureUnits from '../MeasureUnits';
import {AddEdit} from './AddEdit';
import { Info } from './Info';
import Groups from '../Groups';

const Users = ({match}) => {
    const {path} = match;
    return(
        <Switch>
            <Route exact path={`${path}/add`} component={AddEdit}/>
            <Route path={`${path}/:userId/edit`} component={AddEdit} />
            <Route path={`${path}/:userId/stores`} component={Stores} />
            <Route path={`${path}/:userId/products`} component={Products} />
            <Route path={`${path}/:userId/operations`} component={Operations} />
            <Route path={`${path}/:userId/measure-units`} component={MeasureUnits} />
            <Route path={`${path}/:userId/groups`} component={Groups} />
            <Route path={`${path}/:userId`} component={Info}/>
        </Switch>
    )
}

export default Users;