import React, { useContext } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/firebase.context";
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

const ChangePasswordForm = () => {

    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);

    const onSubmit = (event) => {
        event.preventDefault();
        
        firebase
        .doPasswordUpdate(formData.password)
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
                Change your password
            </Header>
            <Form size='large' onSubmit={onSubmit}>
                <Segment stacked>
                    <Form.Input
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        name='password'
                        onChange={onChange}
                    />
                    <Form.Input
                        icon='lock'
                        iconPosition='left'
                        placeholder='Confirm Password'
                        type='password'
                        name='confirmPassword'
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

export {ChangePasswordForm};