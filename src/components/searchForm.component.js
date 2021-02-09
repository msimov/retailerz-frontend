import { useContext, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { Form, Grid, Input } from "semantic-ui-react";
import { FirebaseContext } from "../context/firebase.context";



const SearchForm = ({setProducts}) => {
    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    
    const [formData, setFormData] = useState({
        search: ''
    })

    const onSubmit = (event) => {
        event.preventDefault();
        history.push('/search?text=' + formData.search)
    }

    const onChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        });
    }

    return(
        <Form onSubmit={onSubmit}>
            <Form.Input 
                icon='search'
                placeholder='Search...'
                name='search'
                onChange={onChange}
            />
        </Form>
    )
}

export {SearchForm};