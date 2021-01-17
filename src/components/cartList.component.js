import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatURL } from '../commons/url.common';
import { FirebaseContext } from "../context/firebase.context";
import OperationService from '../services/operation.service';
import OperationTypeService from '../services/operationType.service';

const CartList = ({match}) => {
    const firebase = useContext(FirebaseContext);
    const url = formatURL(match.url);
    
    const {userId} = match.params;
    const [operations, setOperations] = useState(null);
    const currentUser = firebase.getCurrentUser();

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            OperationTypeService.getAll().then(res => {
                const addToCartOperation = res.find(({type}) => type === "ADD_TO_CART")
                console.log(addToCartOperation.id)
                OperationService.getAllByOperationType(userId, addToCartOperation.id, idToken).then(res => {
                    setOperations(res);
                })
            })
        })
    }, [currentUser, userId]);

    const removeFromCart = (operationId) => {
        setOperations(operations.map(operation => {
            if(operation.id === operationId) {
                operation.isDeleting = true;
            }
            return operation;
        }));
        currentUser.getIdToken().then(idToken => {
            OperationService.deleteById(userId, operationId, idToken).then(() => {
                setOperations(operations => operations.filter(operation => operation.id !== operationId));
            });
        })
    }

    return(
        <div>
            <h1>Cart</h1>
            {operations && operations.map(operation =>
                <div key={operation.id}>
                    {operation.id}
                    {operation.product}
                    {operation.count}
                    {operation.operationType}
                    {operation.store}
                    <button onClick={() => removeFromCart(operation.id)} disabled={operation.isDeleting}>Remove From Cart</button>
                </div>
            )}
            {!operations &&
                <div>Loading...</div>
            }
            {operations && !operations.length &&
                <div>Cart Is Empty</div>
            }

        </div>
    );
}

export {CartList};