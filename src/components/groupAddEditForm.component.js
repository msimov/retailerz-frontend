import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from "../context/firebase.context";
import GroupService from '../services/group.service';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const GroupAddEditForm = ({match}) => {
    
    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    const currentUser = firebase.getCurrentUser();
    const {groupId} = match.params;
    const isAddMode = !groupId;

    const [formData, setFormData] = useState({
        groupName: ''
    });

    const onSubmit = (event) => {
        event.preventDefault();
        
        return isAddMode
            ? createGroup()
            : updateGroup();
    }

    const createGroup = () => {

        currentUser.getIdToken().then(idToken => {
             GroupService.create(currentUser.uid, formData, idToken).then(res => {
                history.go(0)
             });    
        })
    }

    const updateGroup = (data) => {
        currentUser.getIdToken().then(idToken => {
            GroupService.updateByGroupId(groupId, formData, idToken).then(res => {
                history.go(0)
            })
        })
    }

    const onClick = () => {
        history.goBack();
    }

    const onChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }
    
    useEffect(() => {
        if(!isAddMode) {
            currentUser.getIdToken().then(idToken => {
                GroupService.findByGroupId(groupId, idToken).then(res => {
                    const fields = ['groupName'];
                    let group = null;
                    fields.forEach(field => {
                        group = {...group, [field]: res[field]}
                    });
                    setFormData(group)
                })
            })
        }
    }, [currentUser, groupId, isAddMode]);

    return(
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                {isAddMode ? "Add group" : "Edit group"}
            </Header>
            <Form size='large' onSubmit={onSubmit}>
                <Segment stacked>
                    <Form.Input 
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='Name'
                        name='groupName'
                        onChange={onChange}
                        value={formData.groupName}
                    />
                    <Button.Group fluid>
                        <Button type='button' onClick={onClick}>Cancel</Button>
                        <Button.Or/>
                        {
                            isAddMode
                            ? <Button positive>Add</Button>
                            : <Button positive>Save</Button>
                        }
                    </Button.Group>
                </Segment>
            </Form>
        </Grid.Column>
    )
    
}

export {GroupAddEditForm};