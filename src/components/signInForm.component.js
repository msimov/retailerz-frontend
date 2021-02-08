import { useState } from "react";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/firebase.context";
import { FormButton } from "./formButton.component";
import { FormTextField } from "./formTextField.component";
import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Divider } from 'semantic-ui-react'
import { GoogleSignInForm } from "./googleSignInForm.component";

const SignInForm = () => {

    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    const { control, handleSubmit, formState} = useForm();
    const [error, setError] = useState(null);
    const [pressedButton, setPressedButton] = useState(null)

    const onSubmit = (data) => {
        if(pressedButton === 1) {
            signInWithEmailAndPassword(data.email, data.password)
        } else if(pressedButton === 2) {
            signInWithGoogle()
        }
    }

    const signInWithEmailAndPassword = (email, password) => {
        firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                history.go(0)
            })
            .catch((error) => {
                setError(error);
            });
    }

    const signInWithGoogle = () => {
        firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                history.go(0)
            })
            .catch((error) => {
                setError(error);
            });
    }

    return(
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                Log-in to your account
            </Header>
            <Form size='large' onSubmit={handleSubmit(onSubmit)}>
                <Segment stacked>
                    <Controller 
                        as={
                            <Form.Input 
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                            />
                        }
                        name="email"
                        control={control}
                        defaultValue=""
                    />
                    <Controller 
                        as={
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                            />
                        }
                        name="password"
                        control={control}
                        defaultValue=""
                    />
                    <Button.Group fluid>
                        <Button 
                            color='teal' 
                            size='large'
                            type='submit'
                            onClick={() => setPressedButton(1)}
                            disabled={formState.isSubmitting}
                        >
                            Sign In
                        </Button>
                        <Button
                            color='google plus' 
                            size='large'
                            onClick={() => setPressedButton(2)}
                        >
                            <Icon name='google'/> Sign In With Google
                        </Button>
                    </Button.Group>
                    <Divider horizontal>Or</Divider>
                    <Link to="/sign-up">Sign Up</Link>
                </Segment>
            </Form>
            <Message>
                <Link to="/">Reset your password</Link>
            </Message>
            { error && <Message error>{ error.message }</Message> }
        </Grid.Column>
    );
}

export {SignInForm};