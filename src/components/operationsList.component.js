import React, { useState, useEffect, useContext } from 'react';
import OperationService from '../services/operation.service';
import { FirebaseContext } from "../context/firebase.context";
import { Button, Menu, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const OperationsList = ({match}) => {
    const firebase = useContext(FirebaseContext);
    
    const [operations, setOperations] = useState(null);
    const currentUser = firebase.getCurrentUser();


    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            OperationService.getAllByUserId(currentUser.uid, idToken).then(res => {
                setOperations(res);
            })
        })
    }, [currentUser]);

    const deleteOperation = (operationId) => {
        setOperations(operations.map(operation => {
            if(operation.operationId === operationId) {
                operation.isDeleting = true;
            }
            return operation;
        }));
        currentUser.getIdToken().then(idToken => {
            OperationService.deleteByOperationId(operationId, idToken).then(() => {
                setOperations(operations => operations.filter(operation => operation.operationId !== operationId));
            });
        })
    }

    return(

        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Store</Table.HeaderCell>
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {operations && operations.map(operation => {
                    console.log(operation)
                    return(
                        <Table.Row key={operation.operationId}>
                            <Table.Cell>{operation.operationTypeName}</Table.Cell>
                            <Table.Cell>{operation.storeName}</Table.Cell>
                            <Table.Cell>{operation.productName}</Table.Cell>
                            <Table.Cell>{operation.operationCount} {operation.measureUnitName}</Table.Cell>
                            <Table.Cell>{operation.operationCount * operation.productRetailPrice} USD</Table.Cell>
                            <Table.Cell>
                            <Menu className='ui bottom attached' widths='2'>
                                <Menu.Item
                                    as={Link}
                                    to={`/users/${operation.operationUserId}/operations/${operation.operationId}/edit`}
                                >
                                    Edit
                                </Menu.Item>
                                <Menu.Item 
                                    as={Button}
                                    onClick={() => deleteOperation(operation.operationId)} disabled={operation.isDeleting}
                                >
                                    Delete
                                </Menu.Item>
                            </Menu>
                            </Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>

        /*         <div>
            <h1>Operations</h1>
            <Link to={`${url}/add`}>Add Operation</Link>
            {operations && operations.map(operation =>
                <div key={operation.operationId}>
                    <Link to={`${url}/${operation.operationId}`}>{operation.operationId}</Link>
                    {operation.operationStoreId}
                    {operation.operationProductId}
                    {operation.operationCount}
                    <Link to={`${url}/${operation.operationId}/edit`}>Edit</Link>
                    <button onClick={() => deleteOperation(operation.operationId)} disabled={operation.isDeleting}>Delete</button>
                </div>
            )}
            {!operations &&
                <div>Loading...</div>

            }
            {operations && !operations.length &&
                <div>No Operations To Display</div>
            }

        </div> */
    );
}

export {OperationsList};