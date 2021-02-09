import { useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/firebase.context";
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

const ResetPasswordForm = () => {

    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    const [formData, setFormData] = useState({
        email: ''
    });
    const [error, setError] = useState(null);

    const onSubmit = (event) => {
        
        event.preventDefault();

        firebase
            .doPasswordReset(formData.email)
            .then(() => {
                history.go(0)
            })
            .catch((error) => {
                setError(error);
            });
    }

    const onClick = () => {
        history.goBack();
    }

    const onChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    return(
        <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
            Reset your password
        </Header>
        <Form size='large' onSubmit={onSubmit}>
            <Segment stacked>
                <Form.Input 
                    fluid
                    icon='mail'
                    iconPosition='left'
                    placeholder='E-mail address'
                    name="email"
                    onChange={onChange}
                />
                <Button.Group fluid>
                    <Button type='button' onClick={onClick}>Cancel</Button>
                    <Button.Or/>
                    <Button positive>Reset password</Button>
                </Button.Group>
            </Segment>
        </Form>
        { error && <Message error>{ error.message }</Message> }
    </Grid.Column>
    );
}

export {ResetPasswordForm}