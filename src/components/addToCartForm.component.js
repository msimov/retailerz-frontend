import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/firebase.context";
import OperationService from "../services/operation.service";
import OperationTypeService from "../services/operationType.service";
import StoreProductService from "../services/storeProduct.service";
import { Form, Button } from "semantic-ui-react";


const AddToCartForm = (props) => {
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.getCurrentUser();
    const history = useHistory();

    const {product} = props;

    const [formData, setFormData] = useState({
        operationCount: '',
        operationStoreId: null
    })
    const [stores, setStores] = useState([]);
    const [addToCartOperation, setAddToCartOperation] = useState([]);

    const onSubmit = (data) => {
        currentUser.getIdToken().then(idToken => {
            OperationService.create(
                currentUser.uid,
                {
                    ...formData,
                    operationProductId: product.productId,
                    operationOperationTypeId: addToCartOperation.operationTypeId
                }, 
                idToken
            ).then(res => {
                history.go(0)
            })
        })
    }

    const onChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        });
    }

    const onSelect = (event, {name, value}) => {
        setFormData({...formData, [name]: value});
    }

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            StoreProductService.getAllByProductId(product.productId, idToken).then(res => {
                setStores(res.map(({storeId, storeLocation}) => ({key: storeId, value: storeId, text: storeLocation})));
            })
        })
        
        OperationTypeService.getAll().then(res => {
            setAddToCartOperation(res.find(({operationTypeName}) => operationTypeName === "ADD_TO_CART"))
        })
       
    }, [currentUser, product])

    return(
        <Form onSubmit={onSubmit}>
            <Form.Input 
                icon='user'
                placeholder='Count'
                name='operationCount'
                type='number'
                onChange={onChange}
            />
            <Form.Select 
                fluid
                placeholder='Store'
                name='operationStoreId'
                options={stores}
                onChange={onSelect}
            />
            <Button positive>Add</Button>
        </Form>
/*         <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <div>
                <div>
                    <FormTextField 
                        name="operationCount"
                        label="Count"
                        control={control}
                    />
                    <div>{errors.name?.message}</div>
                </div>
            </div>
            <div>
                <FormSelect 
                    name="operationStoreId"
                    label="Store"
                    options={stores}
                    control={control}
                />
                <div>{errors.store?.message}</div>
            </div>
            <div>
                <FormButton 
                    label="Add To Cart"
                    type="submit"
                    disabled={formState.isSubmitting}
                />
            </div>
        </form> */
        
    )
}

export {AddToCartForm};