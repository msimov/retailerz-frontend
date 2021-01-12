import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { FirebaseContext } from "../context/firebase.context";
import OperationService from '../services/operation.service';
import ProductService from '../services/product.service';
import OperationTypeService from '../services/operationType.service';
import { FormSelect } from './formSelect.component';
import { FormTextField } from './formTextField.component';
import { FormButton } from './formButton.component';

const OperationAddEditForm = ({match}) => {

    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    const {userId, operationId} = match.params;
    const isAddMode = !operationId;
    const currentUser = firebase.getCurrentUser();

    const [products, setProducts] = useState([]);
    const [operationTypes, setOperationTypes] = useState([]);

    const { handleSubmit, reset, setValue, errors, formState, control} = useForm();

    const onSubmit = (data) => {
        return isAddMode
            ? createOperation(data)
            : updateOperation(data);
    }

    const createOperation = (data) => {
        currentUser.getIdToken().then(idToken => {
             OperationService.create(userId, data, idToken).then(res => {
                 history.push('.');
             });
        })
    }

    const updateOperation = (data) => {
        currentUser.getIdToken().then(idToken => {
            OperationService.updateById(userId, operationId, data, idToken).then(res => {
                history.push('..');
            })
        })
    }

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            ProductService.getAll(userId, idToken).then(res => {
                setProducts(res.map(({id, name}) => ({key: id, label: name})));
            })
        })
        OperationTypeService.getAll().then(res => {
            setOperationTypes(res.map(({id, type}) => ({key: id, label: type})));
        })

        if(!isAddMode) {
            currentUser.getIdToken().then(idToken => {
                OperationService.findById(userId, operationId, idToken).then(res => {
                    const fields = ['operationType', 'product', 'count'];
                    fields.forEach(field => setValue(field, res[field]));
                })
            })
        }
    }, [currentUser, userId, operationId, isAddMode, setValue]);

    return(
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Operation' : 'Edit Operation'}</h1>
            <div>
                <div>
                    <FormSelect 
                        name="operationType"
                        label="Operation Type"
                        options={operationTypes}
                        control={control}
                    />
                    <div>{errors.operationType?.message}</div>
                </div>
                <div>
                    <FormSelect
                        name="product" 
                        label="Product"
                        options={products}
                        control={control}
                    />
                    <div>{errors.product?.message}</div>
                </div>
                <div>
                    <FormTextField 
                        name="count"
                        label="Count"
                        control={control}
                    />
                    <div>{errors.count?.message}</div>
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

export {OperationAddEditForm}