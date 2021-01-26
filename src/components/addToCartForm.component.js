import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/firebase.context";
import OperationService from "../services/operation.service";
import OperationTypeService from "../services/operationType.service";
import StoreProductService from "../services/storeProduct.service";
import { FormButton } from "./formButton.component";
import { FormSelect } from "./formSelect.component";
import { FormTextField } from "./formTextField.component";



const AddToCartForm = (props) => {
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.getCurrentUser();
    const history = useHistory();
    const {product} = props;
    const {userId} = props;
    const [stores, setStores] = useState([]);
    const [addToCartOperation, setAddToCartOperation] = useState([]);


    const { control, handleSubmit, reset, errors, formState} = useForm();

    const onSubmit = (data) => {
        currentUser.getIdToken().then(idToken => {
            OperationService.create(currentUser.uid, {operationProductId: product.productId, operationCount: data.operationCount, operationOperationTypeId: addToCartOperation.operationTypeId, operationStoreId: data.operationStoreId}, idToken).then(res => {
                history.go(0)
            })
        })
    }

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            StoreProductService.getAllByProductId(product.productId, idToken).then(res => {
                setStores(res.map(({storeId, storeLocation}) => ({key: storeId, label: storeLocation})));
            })
        })
        
        OperationTypeService.getAll().then(res => {
            setAddToCartOperation(res.find(({operationTypeName}) => operationTypeName === "ADD_TO_CART"))
        })
       
    }, [currentUser, userId, product])

    return(
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
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
        </form>
    )
}

export {AddToCartForm};