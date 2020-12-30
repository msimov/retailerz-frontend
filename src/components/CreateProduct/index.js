import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { withProtectedRoute } from "../Session";
import * as CONDITIONS from '../../constants/conditions';
import { UserInfoForm } from "../UserInfo";
import * as ROUTES from "../../constants/routes";
import { FirebaseContext } from "../Firebase";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateProductPage = () => (
    <div>
        <h1>Create Product</h1>
        <CreateProductForm/>
    </div>
)


const CreateProductForm = () => {

    const history = useHistory();
    const firebase = useContext(FirebaseContext);

    const [name, setName] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [code, setCode] = useState(0); //Get the latest value from DB and set it.
    const [barcode, setBarcode] = useState('')
    const [selectedMeasureUnit, setSelectedMeasureUnit] = useState(null);
    const [selectedTaxGroup, setSelectedTaxGroup] = useState(null);
    const [retailPrice, setRetailPrice] = useState(0.00);
    const [deliveryPrice, setDeliveryPrice] = useState(0.00);
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [selectedProductStore, setSelectedProductStore] = useState(null);
    const [error, setError] = useState(null);

    const [groups, setGroups] = useState([]); 
    const [stores, setStores] = useState([]);
    const [measureUnits, setMeasureUnits] = useState([]);
    const [taxGroups, setTaxGroups] = useState([]);
    

    useEffect(() => {
        const currentUser = firebase.getCurrentUser();
        //TO-DO: add catch(error => {} ) to each request
        currentUser.getIdToken().then(idToken => {

            axios.get(`http://localhost:3001/users/${currentUser.uid}/groups`).then(res => {
                setGroups(res.data.map(({id, name}) => ({value: id, label: name})))
            })
            axios.get(`http://localhost:3001/users/${currentUser.uid}/stores`).then(res => {
                setStores(res.data.map(({id, location}) => ({value: id, label: location})))
            })
            axios.get(`http://localhost:3001/users/${currentUser.uid}/measure-units`).then(res => {
                setMeasureUnits(res.data.map(({id, unit}) => ({value: id, label: unit})))
            })
        })
        axios.get(`http://localhost:3001/tax-groups`).then(res => {
            setTaxGroups(res.data.map(({id, percentage}) => ({value: id, label: percentage})))
        })
    }, [firebase])

    const resetState = () => {
        setName('');
        setSelectedGroup(null);
        setCode(0);
        setBarcode('');
        setSelectedMeasureUnit(null);
        setSelectedTaxGroup(null);
        setRetailPrice(0.00);
        setDeliveryPrice(0.00);
        setExpiryDate(new Date());
        setSelectedProductStore(null);
        setError(null);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const currentUser = firebase.getCurrentUser();

        currentUser.getIdToken().then(idToken => {
            axios.post(
                `http://localhost:3001/users/${currentUser.uid}/products`, 
                {
                    name, group: selectedGroup.value, code, barcode, measureUnit: selectedMeasureUnit.value,
                    taxGroup: selectedTaxGroup.value, retailPrice, deliveryPrice, expiryDate, store: selectedProductStore.value
                },
                {headers: {Authorization: `Bearer ${idToken}`}}
            ).then(res => {
                resetState();
                history.push(ROUTES.HOME);
            }).catch(error => {
                if(error.response !== undefined) {
                    setError(error.response.data);  
                } else {
                    setError(error);
                }
            })
        })
    }

    const isInvalid = 
        name === '' ||
        selectedGroup === null ||
        code === '' ||
        barcode === '' ||
        selectedMeasureUnit === null ||
        selectedTaxGroup === null ||
        retailPrice === '' ||
        deliveryPrice === '' ||
        expiryDate === null ||
        selectedProductStore === null;

    return(
        <form onSubmit={ onSubmit }>
            <input
                value={ name }
                onChange={ e => setName(e.target.value) }
                type="text"
                placeholder="Product Name"
            />
            <Select 
                value={selectedGroup}
                onChange={(selectedGroup)  => setSelectedGroup(selectedGroup)}
                options={groups}
            />
            <input
                value={ code }
                onChange={ e => setCode(e.target.value) }
                type="number"
                placeholder="Product Code"
                min="0"
                step="1"
            />
            <input
                value={ barcode }
                onChange={ e => setBarcode(e.target.value) }
                type="text"
                placeholder="Product Barcode"
            />
            <Select 
                value={selectedMeasureUnit}
                onChange={(selectedMeasureUnit)  => setSelectedMeasureUnit(selectedMeasureUnit)}
                options={measureUnits}
            />
            <Select 
                value={selectedTaxGroup}
                onChange={(selectedTaxGroup)  => setSelectedTaxGroup(selectedTaxGroup)}
                options={taxGroups}
            />
            <input
                value={ retailPrice }
                onChange={ e => setRetailPrice(e.target.value) }
                type="number"
                placeholder="Product Retail Price"
                min="0"
                step="0.01"
            />
            <input
                value={ deliveryPrice }
                onChange={ e => setDeliveryPrice(e.target.value) }
                type="number"
                placeholder="Product Delivery Price"
                min="0"
                step="0.01"
            />
            <DatePicker
                selected={expiryDate}
                onChange={(selectedDate) => {setExpiryDate(selectedDate)}}
                placeholderText="Expiry Date"
            />
            <Select 
                value={selectedProductStore}
                onChange={(selectedProductStore)  => setSelectedProductStore(selectedProductStore)}
                options={stores}
            />
            <button disabled={ isInvalid } type="submit">
                Create Product
            </button>

            {error && <p>{ error.message }</p>}
        </form>
    );
    
}

export default withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA, CONDITIONS.USER_TYPE_RETAILER])(CreateProductPage)

export {UserInfoForm};