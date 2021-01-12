import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatURL } from '../commons/url.common';
import OperationService from '../services/operation.service';
import { FirebaseContext } from "../context/firebase.context";

const OperationsList = ({match}) => {
    const firebase = useContext(FirebaseContext);
    
    const url = formatURL(match.url);
    const {userId} = match.params; 
    const [operations, setOperations] = useState(null);
    const currentUser = firebase.getCurrentUser();


    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            OperationService.getAll(userId, idToken).then(res => {
                setOperations(res);
            })
        })
    }, [currentUser, userId]);

    const deleteOperation = (operationId) => {
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
            <h1>Operations</h1>
            <Link to={`${url}/add`}>Add Operation</Link>
            {operations && operations.map(operation =>
                <div key={operation.id}>
                    <Link to={`${url}/${operation.id}`}>{operation.operation}</Link>
                    {operation.product}
                    {operation.count}
                    <Link to={`${url}/${operation.id}/edit`}>Edit</Link>
                    <button onClick={() => deleteOperation(operation.id)} disabled={operation.isDeleting}>Delete</button>
                </div>
            )}
            {!operations &&
                <div>Loading...</div>

            }
            {operations && !operations.length &&
                <div>No Operations To Display</div>
            }

        </div>
    );
}

export {OperationsList};