import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Menu, Table } from 'semantic-ui-react';
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
        <Container>
            <Grid divided="vertically">
                <Grid.Row columns={1}>
                    <Menu>
                        <Menu.Item header>Inventory</Menu.Item>
                        <Menu.Item 
                            as={Link}
                            to={`/operations/add`}
                        >
                            Manage Inventory
                        </Menu.Item>
                    </Menu>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Product</Table.HeaderCell>
                                <Table.HeaderCell>Store</Table.HeaderCell>
                                <Table.HeaderCell>Quantity</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {inventory && inventory.map((product, index) => {
                                return(
                                    <Table.Row key={index}>
                                        <Table.Cell>{product.productName}</Table.Cell>
                                        <Table.Cell>{product.storeName}</Table.Cell>
                                        <Table.Cell>{product.productCount}</Table.Cell>
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

export {InventoryList};