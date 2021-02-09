import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from "../context/firebase.context";
import OperationService from '../services/operation.service';
import ProductService from '../services/product.service';
import OperationTypeService from '../services/operationType.service';
import StoreService from '../services/store.service';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const OperationAddEditForm = ({match}) => {

    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    const {operationId} = match.params;
    const isAddMode = !operationId;
    const currentUser = firebase.getCurrentUser();

    const [formData, setFormData] = useState({
        operationOperationTypeId: null,
        operationStoreId: null,
        operationProductId: null,
        operationCount: ''
    });
    const [products, setProducts] = useState([]);
    const [stores, setStores] = useState([])
    const [operationTypes, setOperationTypes] = useState([]);


    const onSubmit = (event) => {
        event.preventDefault();
        
        return isAddMode
            ? createOperation()
            : updateOperation();
    }

    const createOperation = () => {
        currentUser.getIdToken().then(idToken => {
             OperationService.create(currentUser.uid, formData, idToken).then(res => {
                history.go(0)
             });
        })
    }

    const updateOperation = (data) => {
        currentUser.getIdToken().then(idToken => {
            OperationService.updateByOperationId(operationId, formData, idToken).then(res => {
                history.go(0)
            })
        })
    }

    const onClick = () => {
        history.goBack();
    }

    const onChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const onSelect = (event, {name, value}) => {
        setFormData({...formData, [name]: value});
    }

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            ProductService.getAllByUserId(currentUser.uid, idToken).then(res => {
                setProducts(res.map(({productId, productName}) => ({key: productId, value: productId, text: productName})));
            })
            StoreService.getAllByUserId(currentUser.uid, idToken).then(res => {
                setStores(res.map(({storeId, storeLocation}) => ({key: storeId, value: storeId, text: storeLocation})));
            })
        })
        OperationTypeService.getAll().then(res => {
            setOperationTypes(res.map(({operationTypeId, operationTypeName}) => ({key: operationTypeId, value: operationTypeId, text: operationTypeName})));
        })

        if(!isAddMode) {
            currentUser.getIdToken().then(idToken => {
                OperationService.findByOperationId(operationId, idToken).then(res => {
                    const fields = ['operationOperationTypeId', 'operationStoreId', 'operationProductId', 'operationCount'];
                    let operation = null;
                    fields.forEach(field => {
                        operation = {...operation, [field]: res[field]}
                    });
                    setFormData(operation)
                })
            })
        }
    }, [currentUser, operationId, isAddMode]);

    return(
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                {isAddMode ? "Add operation" : "Edit operation"}
            </Header>
            <Form size='large' onSubmit={onSubmit}>
                <Segment stacked>
                    <Form.Select 
                        fluid
                        placeholder='Operation Type'
                        name='operationOperationTypeId'
                        options={operationTypes}
                        onChange={onSelect}
                        value={formData.operationOperationTypeId}
                    />
                    <Form.Select 
                        fluid
                        placeholder='Store'
                        name='operationStoreId'
                        options={stores}
                        onChange={onSelect}
                        value={formData.operationStoreId}
                    />
                    <Form.Select 
                        fluid
                        placeholder='Product'
                        name='operationProductId'
                        options={products}
                        onChange={onSelect}
                        value={formData.operationProductId}
                    />
                    <Form.Input 
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='Count'
                        name='operationCount'
                        onChange={onChange}
                        value={formData.operationCount}
                    />
                    <Button.Group fluid>
                        <Button type='button' onClick={onClick}>Cancel</Button>
                        <Button.Or/>
                        {
                            isAddMode
                            ? <Button positive>Add</Button>
                            : <Button positive>Save</Button>
                        }
                    </Button.Group>
                </Segment>
            </Form>
        </Grid.Column>
    )
}

export {OperationAddEditForm}