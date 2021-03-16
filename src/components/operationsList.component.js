import React, { useState, useEffect, useContext } from 'react';
import OperationService from '../services/operation.service';
import { FirebaseContext } from "../context/firebase.context";
import { Button, Container, Grid, Menu, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const OperationsList = () => {
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
        <Container>
            <Grid divided="vertically">
                <Grid.Row columns={1}>
                    <Menu>
                        <Menu.Item header>Operations</Menu.Item>
                        <Menu.Item 
                            as={Link} 
                            to={`/operations/add`}
                        >
                            Add New Operation
                        </Menu.Item>
                    </Menu>
                </Grid.Row>
                <Grid.Row columns={1}>
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
                                                to={`/operations/${operation.operationId}/edit`}
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
                </Grid.Row>
            </Grid>
        </Container>
    );
}

export {OperationsList};