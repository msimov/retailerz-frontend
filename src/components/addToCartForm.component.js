import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FirebaseContext } from "../context/firebase.context";
import OperationService from "../services/operation.service";
import OperationTypeService from "../services/operationType.service";
import StoreService from "../services/store.service";
import { FormButton } from "./formButton.component";
import { FormSelect } from "./formSelect.component";
import { FormTextField } from "./formTextField.component";



const AddToCartForm = (props) => {
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.getCurrentUser();
    const {product} = props;
    const {userId} = props;
    const [stores, setStores] = useState([]);
    const [addToCardOperation, setAddToCartOperation] = useState([]);


    const { control, handleSubmit, reset, errors, formState} = useForm();

    const onSubmit = (data) => {
        console.log(product)
        console.log(data);
        currentUser.getIdToken().then(idToken => {
            OperationService.create(product.user, {product: product.id, count: data.count, operationType: addToCardOperation.id, store: data.store}, idToken)
        })
    }

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            StoreService.getAll(userId, idToken).then(res => {
                setStores(res.map(({id, location}) => ({key: id, label: location})));
            })
        })
        
            OperationTypeService.getAll().then(res => {
            setAddToCartOperation(res.find(({type}) => type === "ADD_TO_CART"))
        })
       
    }, [currentUser, userId])

    return(
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <div>
                <div>
                    <FormTextField 
                        name="count"
                        label="Count"
                        control={control}
                    />
                    <div>{errors.name?.message}</div>
                </div>
            </div>
            <div>
                <FormSelect 
                    name="store"
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