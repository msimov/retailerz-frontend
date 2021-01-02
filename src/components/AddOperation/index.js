import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { FirebaseContext } from "../Firebase";
import Select from 'react-select';

const AddOperationPage = () => (
    <div>
        <h1>Add Operation</h1>
        <AddOperationForm/>
    </div>
)


const AddOperationForm = () => {

    const history = useHistory();
    const firebase = useContext(FirebaseContext);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedOperation, setSelectedOperation] = useState(null);
    const [count, setCount] = useState(0);
    const [error, setError] = useState(null);

    const [products, setProducts] = useState([]);
    const [operations, setOperations] = useState([]);

    useEffect(() => {
        const currentUser = firebase.getCurrentUser();
        currentUser.getIdToken().then(idToken => {
            axios.get(`http://localhost:3001/users/${currentUser.uid}/products`).then(res => {
                setProducts(res.data.map(({id, name}) => ({value: id, label: name})))
            })
        })
        axios.get(`http://localhost:3001/operation-types`).then(res => {
            setOperations(res.data.map(({id, type}) => ({value: id, label: type})))
        })
    }, [firebase])

    const resetState = () => {
        setSelectedProduct(null);
        setCount(0);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const currentUser = firebase.getCurrentUser();

        currentUser.getIdToken().then(idToken => {
            axios.post(
                `http://localhost:3001/users/${currentUser.uid}/operations`, 
                {product: selectedProduct.value, operation: selectedOperation.value, count},
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
            });
        })
    }

    const isInvalid = 
        selectedProduct === null ||
        selectedOperation === null ||
        count === 0;

    return(
        <form onSubmit={ onSubmit }>
            <Select 
                value={selectedProduct}
                onChange={(selectedProduct)  => setSelectedProduct(selectedProduct)}
                options={products}
            />
            <Select 
                value={selectedOperation}
                onChange={(selectedOperation)  => setSelectedOperation(selectedOperation)}
                options={operations}
            />
            <input
                value={ count }
                onChange={ e => setCount(e.target.value) }
                type="number"
                placeholder="Product Code"
                step="1"
                min="0"
            />
            <button disabled={ isInvalid } type="submit">
                Add Operation
            </button>

            {error && <p>{ error.message }</p>}
        </form>
    );
}

export default AddOperationPage;
export {AddOperationForm}