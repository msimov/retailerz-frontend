import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { FirebaseContext } from "../context/firebase.context";
import ProductService from '../services/product.service';
import GroupService from '../services/group.service';
import MeasureUnitService from '../services/measureUnit.service';
import TaxGroupService from '../services/taxGroup.service';
import { FormTextField } from './formTextField.component';
import { FormSelect } from './formSelect.component';
import { FormButton } from './formButton.component';

const ProductAddEditForm = ({match}) => {

    const history = useHistory();
    const firebase = useContext(FirebaseContext);

    const {userId, productId} = match.params;
    const isAddMode = !productId;
    const currentUser = firebase.getCurrentUser();

    const [groups, setGroups] = useState([]); 
    const [measureUnits, setMeasureUnits] = useState([]);
    const [taxGroups, setTaxGroups] = useState([]);

    const { handleSubmit, reset, setValue, errors, formState, control} = useForm();

    const onSubmit = (data) => {
        return isAddMode
            ? createProduct(data)
            : updateProduct(data);
    }

    const createProduct = (data) => {
        currentUser.getIdToken().then(idToken => {
            ProductService.create(userId, data, idToken).then(res => {
                history.push('.');
            })
        })
    }

    const updateProduct = (data) => {
        currentUser.getIdToken().then(idToken => {
            ProductService.updateById(userId, productId, data).then(res => {
                history.push('..');
            })
        })
    }

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            GroupService.getAll(userId, idToken).then(res => {
                setGroups(res.map(({id, name}) => ({key: id, label: name})));
            });
            
            MeasureUnitService.getAll(userId, idToken).then(res => {
                setMeasureUnits(res.map(({id, unit}) => ({key: id, label: unit})));
            });

            if(!isAddMode) {
                ProductService.findById(userId, productId, idToken).then(res => {
                    const fields = ['name', 'description', 'group', 'code', 'barcode', 'measureUnit', 'taxGroup', 'retailPrice', 'deliveryPrice']
                    fields.forEach(field => setValue(field, res[field]));
                })
            }
        })
        TaxGroupService.getAll().then(res => {
            setTaxGroups(res.map(({id, percentage}) => ({key: id, label: percentage + "%"})));
        });

    }, [currentUser, userId, productId, isAddMode, setValue])

    return(
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Product' : 'Edit Product'}</h1>
            <div>
                <div>
                    <FormTextField 
                        name="name"
                        label="Name"
                        control={control}
                    />
                    <div>{errors.name?.message}</div>
                </div>
                <div>
                    <FormTextField 
                        name="description"
                        label="Description"
                        control={control}
                    />
                    <div>{errors.description?.message}</div>
                </div>
                <div>
                    <FormSelect
                        name="group"
                        label="Group"
                        options={groups}
                        control={control}
                    />
                    <div>{errors.group?.message}</div>
                </div>
                <div>
                    <FormTextField 
                        name="code"
                        label="Code"
                        control={control}
                    />
                    <div>{errors.code?.message}</div>
                </div>
                <div>
                    <FormTextField 
                        name="barcode"
                        label="Barcode"
                        control={control}
                    />
                    <div>{errors.barcode?.message}</div>
                </div>
                <div>
                    <FormSelect 
                        name="measureUnit"
                        label="Measure Unit"
                        options={measureUnits}
                        control={control}
                    />
                    <div>{errors.measureUnit?.message}</div>
                </div>
                <div>
                    <FormSelect 
                        name="taxGroup"
                        label="Tax Group"
                        options={taxGroups}
                        control={control}
                    />
                    <div>{errors.taxGroup?.message}</div>
                </div>
                <div>
                    <FormTextField 
                        name="retailPrice"
                        label="Retail Price"
                        type="number"
                        step="0.01"
                        control={control}
                    />
                    <div>{errors.retailPrice?.message}</div>
                </div>
                <div>
                    <FormTextField 
                        name="deliveryPrice"
                        label="Delivery Price"
                        type="number"
                        step="0.01"
                        control={control}

                    />
                    <div>{errors.deliveryPrice?.message}</div>
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
    );
    
}

export {ProductAddEditForm};