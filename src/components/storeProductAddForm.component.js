import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/firebase.context";
import ProductService from "../services/product.service";
import StoreProductService from "../services/storeProduct.service";
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const StoreProductAddForm = ({match}) => {
    const history = useHistory();
    const firebase = useContext(FirebaseContext);

    const {userId, storeId} = match.params;
    const currentUser = firebase.getCurrentUser();

    const [formData, setFormData] = useState({
        storeProductProductId: null
    });
    const [products, setProducts] = useState([]);

    const onSubmit = (event) => {
        event.preventDefault();

        currentUser.getIdToken().then(idToken => {
            StoreProductService.create(storeId, formData, idToken).then(res => {
                history.go(0)
            })
        })
    }

    const onClick = () => {
        history.goBack();
    }

    const onSelect = (event, {name, value}) => {
        setFormData({...formData, [name]: value});
    }

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            ProductService.getAllByUserId(currentUser.uid, idToken).then(res => {
                setProducts(res.map(({productId, productName}) => ({key: productId, value: productId, text: productName})));
            })
        })
    }, [currentUser, userId]);

    return(
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                Add product to store
            </Header>
            <Form size='large' onSubmit={onSubmit}>
                <Segment stacked>
                    <Form.Select 
                        fluid
                        placeholder='Product'
                        name='userUserTypeId'
                        options={products}
                        onChange={onSelect}
                        value={formData.userUserTypeId}
                    />
                    <Button.Group fluid>
                        <Button type='button' onClick={onClick}>Cancel</Button>
                        <Button.Or/>
                        <Button positive>Add</Button>
                    </Button.Group>
                </Segment>
            </Form>
        </Grid.Column>
    )
}

export {StoreProductAddForm};