import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FirebaseContext } from '../Firebase';
import OperationService from '../../services/operation.service';
import ProductService from '../../services/product.service';
import OperationTypeService from '../../services/operation-type.service';
import ReactSelect from 'react-select';




const AddEdit = ({match}) => {

    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    const {id} = match.params;
    const isAddMode = !id;
    const currentUser = firebase.getCurrentUser();

    const [products, setProducts] = useState([]);
    const [operationTypes, setOperationTypes] = useState([]);


    const validationSchema = Yup.object().shape({
        operationType: Yup.object()
            .nullable()
            .required("Operation Type is required"),
        product: Yup.object()
            .nullable()
            .required("Product is required"),
        count: Yup.number()
            .typeError("Count must be a number")
            .positive("Count must be greater than 0")
            .required("Count is required")
    });

    const { register, handleSubmit, reset, setValue, errors, formState, control} = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data) => {
        const fields = ['product', 'operationType'];
        fields.forEach(field => {
            data[field] = data[field].value;
        });
        return isAddMode
            ? createOperation(data)
            : updateOperation(id, data);
    }

    const createOperation = (data) => {
        currentUser.getIdToken().then(idToken => {
             OperationService.create(currentUser.uid, data, idToken).then(res => {
                 history.push('.');
             });
        })
    }

    const updateOperation = (operationId, data) => {
        currentUser.getIdToken().then(idToken => {
            OperationService.updateById(currentUser.uid, operationId, data, idToken).then(res => {
                history.push('..');
            })
        })
    }

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            ProductService.getAll(currentUser.uid, idToken).then(res => {
                setProducts(res.map(({id, name}) => ({value: id, label: name})));
            })
        })
        OperationTypeService.getAll().then(res => {
            setOperationTypes(res.map(({id, type}) => ({value: id, label: type})));
        })

        if(!isAddMode) {
            currentUser.getIdToken().then(idToken => {
                OperationService.findById(currentUser.uid, id, idToken).then(res => {
                    const fields = ['count'];
                    fields.forEach(field => setValue(field, res[field]));
                })
            })
        }
    }, [currentUser, id, isAddMode, setValue]);

    return(
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Operation' : 'Edit Operation'}</h1>
            <div>
                <div>
                    <label>Operation Type</label>
                    <Controller
                        as={ReactSelect}
                        defaultValue=""
                        options={operationTypes}
                        name="operationType"
                        control={control}
                    />
                    <div>{errors.operationType?.message}</div>
                </div>
                <div>
                    <label>Product</label>
                    <Controller
                        as={ReactSelect}
                        defaultValue=""
                        options={products}
                        name="product"
                        control={control}
                    />
                    <div>{errors.product?.message}</div>
                </div>
                <div>
                    <label>Count</label>
                    <input name="count" type="text" ref={register}/>
                    <div>{errors.count?.message}</div>
                </div>
            </div>
            <div>
                <button type="submit" disabled={formState.isSubmitting}>
                    {formState.isSubmitting && <span>Loading...</span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'}>Cancel</Link>
            </div>
        </form>
    )
}


//Todo: Add Conditions
export {AddEdit}