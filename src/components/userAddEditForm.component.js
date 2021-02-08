import { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from "../context/firebase.context";
import UserService from "../services/user.service";
import UserTypeService from "../services/userType.service";
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const UserAddEditForm = ({match}) => {

    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    
    const currentUser = firebase.getCurrentUser();
    const {userId} = match.params;
    const isAddMode = !userId;
    
    const [formData, setFormData] = useState({
        userFirstName: '',
        userLastName: '',
        userUserTypeId: null
    });
    const [userTypes, setUserTypes] = useState([]); 
    

    const onSubmit = (event) => {
        event.preventDefault();

        return isAddMode
            ? createUser()
            : updateUser();
    }

    const onClick = () => {
        history.goBack();
    }

    const onInputChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const onSelectChange = (name, data) => {
        setFormData({...formData, [name]: data});
    }


    const createUser = () => {
        currentUser.getIdToken().then(idToken => {
            UserService.create(currentUser.uid, formData, idToken).then(res => {
                history.go(0)
            });
        })
    }

    const updateUser = () => {
        currentUser.getIdToken().then(idToken => {
            UserService.updateByUserId(currentUser.uid, formData, idToken).then(res => {
                history.go(0)
            })
        })
    }

    useEffect(() => {
        UserTypeService.getAll().then(res => {
            setUserTypes(res.map(({userTypeId, userTypeName}) => ({key: userTypeId, value: userTypeId, text: userTypeName})));
        });

        if(!isAddMode) {
            currentUser.getIdToken().then(idToken => {
                UserService.findByUserId(currentUser.uid, idToken).then(res => {
                    const fields = ['userFirstName', 'userLastName', 'userUserTypeId'];
                    let userInfo = null;
                    fields.forEach(field => {
                        userInfo = {...userInfo, [field]: res[field]}
                    });
                    setFormData(userInfo);
                })
            })
        }
    }, [currentUser, isAddMode]);

    return (
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                {isAddMode ? "Add Information" : "Edit Information"}
            </Header>
            <Form size='large' onSubmit={onSubmit}>
                <Segment stacked>
                    <Form.Input 
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='First Name'
                        name='userFirstName'
                        onChange={onInputChange}
                        value={formData.userFirstName}
                    />
                    <Form.Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='Last Name'
                        name='userLastName'
                        onChange={onInputChange}
                        value={formData.userLastName}
                    />
                    {isAddMode ? <Form.Select 
                        fluid
                        placeholder='Account Type'
                        name='userUserTypeId'
                        options={userTypes}
                        onChange={(e, data) => {onSelectChange('userUserTypeId', data.value)}}
                        value={formData.userUserTypeId}
                    />
                    : null}
                    {isAddMode 
                        ? <Button positive fluid>Add</Button>
                        : <Button.Group fluid>
                            <Button type='button' onClick={onClick}>Cancel</Button>
                            <Button.Or/>
                            <Button positive>Save</Button>
                        </Button.Group>
                    }
                </Segment>
            </Form>
        </Grid.Column>
    )
}

export { UserAddEditForm };