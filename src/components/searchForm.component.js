import { useContext, useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { FirebaseContext } from "../context/firebase.context";
import OperationService from "../services/operation.service";
import OperationTypeService from "../services/operationType.service";
import ProductService from "../services/product.service";
import { FormButton } from "./formButton.component";
import { FormTextField } from "./formTextField.component";



const SearchForm = (props) => {
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.getCurrentUser();
    const {setProducts} = props
    const [searchedProductOperation, setSearchedProductOperation] = useState(null);

    const { control, handleSubmit, reset, errors, formState} = useForm();

    const onSubmit = (data) => {
        currentUser.getIdToken().then(idToken => {
            ProductService.findByKeyword(data.search, idToken).then(res => {
                const {productId} = res[0];
                if(productId) {
                    OperationService.create(
                        currentUser.uid, 
                        {
                            operationProductId: productId,
                            operationOperationTypeId: searchedProductOperation.operationTypeId
                        },
                        idToken
                    )
                }
                
                setProducts(res)
            })

        })
    }

    useEffect(() => {
        OperationTypeService.getAll().then(res => {
            setSearchedProductOperation(res.find(({operationTypeName}) => operationTypeName === "SEARCHED_PRODUCT"))
        })
    }, [])

    return(
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <div>
                <div>
                    <FormTextField 
                        name="search"
                        label="Search"
                        control={control}
                    />
                    <div>{errors.name?.message}</div>
                </div>
            </div>
            <div>
                <FormButton 
                    label="Search"
                    type="submit"
                    disabled={formState.isSubmitting}
                />
            </div>
        </form>
    )
}

export {SearchForm};