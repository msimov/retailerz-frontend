import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import StoreService from '../../services/store.service';
import { FirebaseContext } from '../Firebase';
import ProductService from '../../services/product.service';
import GroupService from '../../services/group.service';
import MeasureUnitService from '../../services/measure-unit.service';
import TaxGroupService from '../../services/tax-group.service';
import ReactSelect from 'react-select';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
const AddEdit = ({match}) => {

    const history = useHistory();
    const firebase = useContext(FirebaseContext);

    const {id} = match.params;
    const isAddMode = !id;
    const currentUser = firebase.getCurrentUser();

    const [groups, setGroups] = useState([]); 
    const [stores, setStores] = useState([]);
    const [measureUnits, setMeasureUnits] = useState([]);
    const [taxGroups, setTaxGroups] = useState([]);
    
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        group: Yup.object()
            .nullable()
            .required('Group is required'),
        code: Yup.string()
            .matches(/^(?<=\s|^)\d+(?=\s|$)/, "Only numbers are allowed")
            .required("Code is required"),
        barcode: Yup.string()
            .matches(/^\d+$/, 'Only digits are allowed'),
        measureUnit: Yup.object()
            .nullable()
            .required("Measure Unit is required"),
        taxGroup: Yup.object()
            .nullable()
            .required("Tax Group is required"),
        retailPrice: Yup.number()
            .typeError("Retail Price should be a number")
            .required("Retail Price is required"),
        deliveryPrice: Yup.string()
            .typeError("Delivery Price should be a number")
            .required("Delivery Price is required"),
        store: Yup.object()
            .nullable()
            .required("Product Store is required"),
    });

    const { register, handleSubmit, reset, setValue, errors, formState, control} = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data) => {
        const fields = ['group', 'measureUnit', 'taxGroup', 'store'];
        fields.forEach(field => {
            data[field] = data[field].value;
        });
        return isAddMode
            ? createProduct(data)
            : updateProduct(id, data);
    }

    const createProduct = (data) => {
        currentUser.getIdToken().then(idToken => {
            ProductService.create(currentUser.uid, data, idToken).then(res => {
                history.push('.');
            })
        })
    }

    const updateProduct = (productId, data) => {
        currentUser.getIdToken().then(idToken => {
            ProductService.updateById(currentUser.uid, productId, data).then(res => {
                history.push('..');
            })
        })
    }

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            GroupService.getAll(currentUser.uid, idToken).then(res => {
                setGroups(res.map(({id, name}) => ({value: id, label: name})));
            });

            StoreService.getAll(currentUser.uid, idToken).then(res => {
                setStores(res.map(({id, location}) => ({value: id, label: location})));
            });
            
            MeasureUnitService.getAll(currentUser.uid, idToken).then(res => {
                setMeasureUnits(res.map(({id, unit}) => ({value: id, label: unit})));
            });

            if(!isAddMode) {
                ProductService.findById(currentUser.uid, id, idToken).then(res => {
                    const fields = ['name', 'description', 'group', 'code', 'barcode', 'measureUnit', 'taxGroup', 'retailPrice', 'deliveryPrice', 'expiryDate', 'store']
                    fields.forEach(field => setValue(field, res[field]));
                })
            }
        })
        TaxGroupService.getAll().then(res => {
            setTaxGroups(res.map(({id, percentage}) => ({value: id, label: percentage + "%"})));
        });

    }, [currentUser, id, isAddMode, setValue])

    return(
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Product' : 'Edit Product'}</h1>
            <div>
                <div>
                    <label>Name</label>
                    <input name="name" type="text" ref={register}/>
                    <div>{errors.name?.message}</div>
                </div>
                <div>
                    <label>Description</label>
                    <input name="description" type="text" ref={register}/>
                    <div>{errors.description?.message}</div>
                </div>
                <div>
                    <label>Group</label>
                    <Controller
                        as={ReactSelect}
                        defaultValue=""
                        options={groups}
                        name="group"
                        control={control}
                    />
                    <div>{errors.group?.message}</div>
                </div>
                <div>
                    <label>Code</label>
                    <input name="code" type="text" ref={register}/>
                    <div>{errors.code?.message}</div>
                </div>
                <div>
                    <label>Barcode</label>
                    <input name="barcode" type="text" ref={register}/>
                    <div>{errors.barcode?.message}</div>
                </div>
                <div>
                    <label>Measure Unit</label>
                    <Controller
                        as={ReactSelect}
                        defaultValue=""
                        options={measureUnits}
                        name="measureUnit"
                        control={control}
                    />
                    <div>{errors.measureUnit?.message}</div>
                </div>
                <div>
                    <label>Tax Group</label>
                    <Controller
                        as={ReactSelect}
                        defaultValue=""
                        options={taxGroups}
                        name="taxGroup"
                        control={control}
                    />
                    <div>{errors.taxGroup?.message}</div>
                </div>
                <div>
                    <label>Retail Price</label>
                    <input name="retailPrice" type="number" step="0.01" ref={register}/>
                    <div>{errors.retailPrice?.message}</div>
                </div>
                <div>
                    <label>Delivery Price</label>
                    <input name="deliveryPrice" type="number" step="0.01" ref={register}/>
                    <div>{errors.deliveryPrice?.message}</div>
                </div>
                <div>
                    <label>Expiry Date</label>
                    <Controller
                        name="expiryDate"
                        control={control}
                        defaultValue=""
                        render={({onChange, value}) => (
                            <ReactDatePicker 
                                selected={value}
                                onChange={onChange}
                            />
                        )}
                    />
                    <div>{errors.expiryDate?.message}</div>
                </div>
                <div>
                    <label>Store</label>
                    <Controller
                        as={ReactSelect}
                        defaultValue=""
                        options={stores}
                        name="store"
                        control={control}
                    />
                    <div>{errors.store?.message}</div>
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
    );
    
}

export {AddEdit};