import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/firebase.context";
import ProductService from "../services/product.service";
import StoreProductService from "../services/storeProduct.service";
import { FormButton } from "./formButton.component";
import { FormSelect } from "./formSelect.component";



const StoreProductAddForm = ({match}) => {
    const history = useHistory();
    const firebase = useContext(FirebaseContext);

    const {userId, storeId} = match.params;
    const currentUser = firebase.getCurrentUser();

    const [products, setProducts] = useState([]);

    const { handleSubmit, reset, errors, formState, control} = useForm();

    const onSubmit = (data) => {

        currentUser.getIdToken().then(idToken => {
            StoreProductService.create(storeId, data, idToken).then(res => {
                history.push('.');
            })
        })
    }

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            ProductService.getAllByUserId(userId, idToken).then(res => {
                setProducts(res.map(({productId, productName}) => ({key: productId, label: productName})));
            })
        })
    }, [currentUser, userId]);

    return(
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{'Add Product To Store'}</h1>
            <div>
                <div>
                    <FormSelect 
                        name="storeProductProductId"
                        label="Product"
                        options={products}
                        control={control}
                    />
                    <div>{errors.location?.message}</div>
                </div>
            </div>
            <div>
                <FormButton 
                    label="Save"
                    type="submit"
                    disabled={formState.isSubmitting}
                />
            </div>
        </form>
    )
}

export {StoreProductAddForm};