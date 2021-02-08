import { useState } from "react";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/firebase.context";
import { Button, Form, Grid, Header, Message, Segment, Divider } from 'semantic-ui-react'
import { SignInWithGoogleButton } from "./signInWithGoogleButton.component";


const SignUpForm = () => {

    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);

    const onSubmit = (event) => {
        event.preventDefault();

        firebase
            .doCreateUserWithEmailAndPassword(formData.email, formData.password)
            .then((authUser) => {
                history.go(0)
            })
            .catch(error => {
                setError(error);
            });

    }

    const onChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    return(
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                Create account
            </Header>
            <Form size='large' onSubmit={onSubmit}>
                <Segment stacked>
                    <Form.Input 
                        fluid
                        icon='mail'
                        iconPosition='left'
                        placeholder='E-mail address'
                        name='email'
                        onChange={onChange}
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        name='password'
                        onChange={onChange}
                    />
                    <Form.Input
                        fluid
                        icon='repeat'
                        iconPosition='left'
                        placeholder='Confirm Password'
                        type='password'
                        name='confirmPassword'
                        onChange={onChange}
                    />
                    <Button.Group fluid>
                        <Button
                            color='teal' 
                            size='large'
                        >
                            Sign Up
                        </Button>
                        <SignInWithGoogleButton setError={setError}/>
                    </Button.Group>
                    <Divider horizontal>Or</Divider>
                    <Link to="/sign-in">Sign In</Link>
                </Segment>
            </Form>
            { error && <Message error>{ error.message }</Message> }
        </Grid.Column>
    );
}

export {SignUpForm};