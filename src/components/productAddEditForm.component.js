import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { FirebaseContext } from "../context/firebase.context";
import ProductService from '../services/product.service';
import GroupService from '../services/group.service';
import MeasureUnitService from '../services/measureUnit.service';
import TaxGroupService from '../services/taxGroup.service';

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
                history.go(0)
            })
        })
    }

    const updateProduct = (data) => {
        currentUser.getIdToken().then(idToken => {
            ProductService.updateByProductId(productId, data).then(res => {
                history.go(0)
            })
        })
    }

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            GroupService.getAllByUserId(userId, idToken).then(res => {
                setGroups(res.map(({groupId, groupName}) => ({key: groupId, label: groupName})));
            });
            
            MeasureUnitService.getAllByUserId(userId, idToken).then(res => {
                setMeasureUnits(res.map(({measureUnitId, measureUnitName}) => ({key: measureUnitId, label: measureUnitName})));
            });

            if(!isAddMode) {
                ProductService.findByProductId(productId, idToken).then(res => {
                    const fields = ['productName', 'productDescription', 'productGroupId', 'productCode', 'productBarcode', 'productMeasureUnitId', 'productTaxGroupId', 'productRetailPrice', 'productDeliveryPrice']
                    fields.forEach(field => setValue(field, res[field]));
                })
            }
        })
        TaxGroupService.getAll().then(res => {
            setTaxGroups(res.map(({taxGroupId, taxGroupPercentage}) => ({key: taxGroupId, label: taxGroupPercentage + "%"})));
        });

    }, [currentUser, userId, productId, isAddMode, setValue])

    return(
        <div></div>
        /* <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Product' : 'Edit Product'}</h1>
            <div>
                <div>
                    <FormTextField 
                        name="productName"
                        label="Name"
                        control={control}
                    />
                    <div>{errors.name?.message}</div>
                </div>
                <div>
                    <FormTextField 
                        name="productDescription"
                        label="Description"
                        control={control}
                    />
                    <div>{errors.description?.message}</div>
                </div>
                <div>
                    <FormSelect
                        name="productGroupId"
                        label="Group"
                        options={groups}
                        control={control}
                    />
                    <div>{errors.group?.message}</div>
                </div>
                <div>
                    <FormTextField 
                        name="productCode"
                        label="Code"
                        control={control}
                    />
                    <div>{errors.code?.message}</div>
                </div>
                <div>
                    <FormTextField 
                        name="productBarcode"
                        label="Barcode"
                        control={control}
                    />
                    <div>{errors.barcode?.message}</div>
                </div>
                <div>
                    <FormSelect 
                        name="productMeasureUnitId"
                        label="Measure Unit"
                        options={measureUnits}
                        control={control}
                    />
                    <div>{errors.measureUnit?.message}</div>
                </div>
                <div>
                    <FormSelect 
                        name="productTaxGroupId"
                        label="Tax Group"
                        options={taxGroups}
                        control={control}
                    />
                    <div>{errors.taxGroup?.message}</div>
                </div>
                <div>
                    <FormTextField 
                        name="productRetailPrice"
                        label="Retail Price"
                        type="number"
                        step="0.01"
                        control={control}
                    />
                    <div>{errors.retailPrice?.message}</div>
                </div>
                <div>
                    <FormTextField 
                        name="productDeliveryPrice"
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
        </form> */
    );
    
}

export {ProductAddEditForm};