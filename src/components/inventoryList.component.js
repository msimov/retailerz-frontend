import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from "../context/firebase.context";
import OperationService from '../services/operation.service';
import OperationTypeService from '../services/operationType.service';

const InventoryList = ({match}) => {
    const firebase = useContext(FirebaseContext);
    
    const {userId} = match.params;
    const [inventory, setInventory] = useState(null);
    const currentUser = firebase.getCurrentUser();

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            OperationTypeService.getAll().then(res => {
                OperationService.getInventory(userId, idToken).then(res => {
                    console.log(res);
                    setInventory(res);
                })
            })
        })
    }, [currentUser, userId]);


    return(
        <div>
            <h1>Inventory</h1>
            {inventory && inventory.map((product, index) =>
                <div key={index}>
                    {product.productName}
                    {product.storeName}
                    {product.productCount}
                </div>
            )}
            {!inventory &&
                <div>Loading...</div>
            }
            {inventory && !inventory.length &&
                <div>No items in inventory.</div>
            }

        </div>
    );
}

export {InventoryList};