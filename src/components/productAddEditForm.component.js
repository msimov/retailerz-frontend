import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from "../context/firebase.context";
import ProductService from '../services/product.service';
import GroupService from '../services/group.service';
import MeasureUnitService from '../services/measureUnit.service';
import TaxGroupService from '../services/taxGroup.service';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const ProductAddEditForm = ({match}) => {

    const history = useHistory();
    const firebase = useContext(FirebaseContext);

    const {productId} = match.params;
    const isAddMode = !productId;
    const currentUser = firebase.getCurrentUser();

    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        productGroupId: null,
        productBarcode: '',
        productMeasureUnitId: null,
        productTaxGroupId: null,
        productRetailPrice: '',
        productDeliveryPrice: ''
    });
    const [groups, setGroups] = useState([]); 
    const [measureUnits, setMeasureUnits] = useState([]);
    const [taxGroups, setTaxGroups] = useState([]);

    const onSubmit = (event) => {
        event.preventDefault();
        
        return isAddMode
            ? createProduct()
            : updateProduct();
    }

    const createProduct = () => {
        currentUser.getIdToken().then(idToken => {
            ProductService.create(currentUser.uid, formData, idToken).then(res => {
                history.go(0)
            })
        })
    }

    const updateProduct = (data) => {
        currentUser.getIdToken().then(idToken => {
            ProductService.updateByProductId(productId, formData).then(res => {
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
            GroupService.getAllByUserId(currentUser.uid, idToken).then(res => {
                setGroups(res.map(({groupId, groupName}) => ({
                    key: groupId,
                    value: groupId,
                    text: groupName
                })));
            });
            
            MeasureUnitService.getAllByUserId(currentUser.uid, idToken).then(res => {
                setMeasureUnits(res.map(({measureUnitId, measureUnitName}) => ({key: measureUnitId, value: measureUnitId, text: measureUnitName})));
            });

if(!isAddMode) {
    ProductService.findByProductId(productId, idToken).then(res => {
        const fields = ['productName', 'productDescription', 'productGroupId', 'productBarcode', 'productMeasureUnitId', 'productTaxGroupId', 'productRetailPrice', 'productDeliveryPrice']
        let product = null; 
        fields.forEach(field => {
            product = {...product, [field]: res[field]}
        });
        setFormData(product)
    })
}
        })
        TaxGroupService.getAll().then(res => {
            setTaxGroups(res.map(({taxGroupId, taxGroupPercentage}) => ({key: taxGroupId, value: taxGroupId, text: taxGroupPercentage + "%"})));
        });

    }, [currentUser, productId, isAddMode])

    return(
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                {isAddMode ? "Add product" : "Edit product"}
            </Header>
            <Form size='large' onSubmit={onSubmit}>
                <Segment stacked>
                    <Form.Input 
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='Name'
                        name='productName'
                        onChange={onChange}
                        value={formData.productName}
                    />
                    <Form.Input 
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='Description'
                        name='productDescription'
                        onChange={onChange}
                        value={formData.productDescription}
                    />
                    <Form.Select 
                        fluid
                        placeholder='Group'
                        name='productGroupId'
                        options={groups}
                        onChange={onSelect}
                        value={formData.productGroupId}
                    />
                    <Form.Input 
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='Barcode'
                        name='productBarcode'
                        onChange={onChange}
                        value={formData.productBarcode}
                    />
                    <Form.Select 
                        fluid
                        placeholder='Measure Unit'
                        name='productMeasureUnitId'
                        options={measureUnits}
                        onChange={onSelect}
                        value={formData.productMeasureUnitId}
                    />
                    <Form.Select 
                        fluid
                        placeholder='Tax Group'
                        name='productTaxGroupId'
                        options={taxGroups}
                        onChange={onSelect}
                        value={formData.productTaxGroupId}
                    />
                    <Form.Input 
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='Retail Price'
                        name='productRetailPrice'
                        onChange={onChange}
                        value={formData.productRetailPrice}
                    />
                    <Form.Input 
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='Delivery Price'
                        name='productDeliveryPrice'
                        onChange={onChange}
                        value={formData.productDeliveryPrice}
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
    );
    
}

export {ProductAddEditForm};