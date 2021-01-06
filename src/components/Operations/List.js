import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import OperationService from '../../services/operation.service';
import { FirebaseContext } from '../Firebase';

const List = ({match}) => {
    const firebase = useContext(FirebaseContext);
    
    const {path} = match;
    const [operations, setOperations] = useState(null);
    const currentUser = firebase.getCurrentUser();


    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            OperationService.getAll(currentUser.uid, idToken).then(res => {
                setOperations(res);
            })
        })
    }, [currentUser]);

    const deleteOperation = (operationId) => {
        setOperations(operations.map(operation => {
            if(operation.id === operationId) {
                operation.isDeleting = true;
            }
            return operation;
        }));
        currentUser.getIdToken().then(idToken => {
            OperationService.deleteById(currentUser.uid, operationId, idToken).then(() => {
                setOperations(operations => operations.filter(operation => operation.id !== operationId));
            });
        })
    }

    return(
        <div>
            <h1>Operations</h1>
            <Link to={`${path}/add`}>Add Operation</Link>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Product</th>
                        <th>Count</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {operations && operations.map(operation =>
                        <tr key={operation.id}>
                            <td>{operation.operation}</td>
                            <td>{operation.product}</td>
                            <td>{operation.count}</td>
                            <td>
                                <Link to={`${path}/edit/${operation.id}`}>Edit</Link>
                                <button onClick={() => deleteOperation(operation.id)} disabled={operation.isDeleting}>
                                    {operation.isDeleting 
                                        ? <span>Loading...</span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!operations &&
                        <tr>
                            <td>
                                <div>Loading...</div>
                            </td>
                        </tr>
                    }
                    {operations && !operations.length &&
                        <tr>
                            <td>
                                <div>No Operations To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export {List};