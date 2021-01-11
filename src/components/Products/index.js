import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {AddEdit} from './AddEdit';
import { List } from './List.js';
import { Info } from './Info';

const Products = ({match}) => {
    const {path} = match;

    return(
        <Switch>
            <Route exact path={`${path}/add`} component={AddEdit}/>

            <Route path={`${path}/:productId/edit`} component={AddEdit} />

            <Route path={`${path}/:productId`} component={Info}/>

            <Route path={`${path}`} component={List}/>
        </Switch>
    )
}

export default Products;