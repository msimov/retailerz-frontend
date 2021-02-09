import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from "../context/firebase.context";
import MeasureUnitService from '../services/measureUnit.service';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const MeasureUnitAddEditForm = ({match}) => {
    
    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    const currentUser = firebase.getCurrentUser();
    const {measureUnitId} = match.params;
    const isAddMode = !measureUnitId;

    const [formData, setFormData] = useState({
        measureUnitName: ''
    });

    const onSubmit = (event) => {
        event.preventDefault();
        
        return isAddMode
            ? createMeasureUnit()
            : updateMeasureUnit();
    }

    const createMeasureUnit = () => {
        currentUser.getIdToken().then(idToken => {
             MeasureUnitService.create(currentUser.uid, formData, idToken).then(res => {
                history.go(0)
             });    
        })
    }

    const updateMeasureUnit = () => {
        currentUser.getIdToken().then(idToken => {
            MeasureUnitService.updateByMeasureUnitId(measureUnitId, formData, idToken).then(res => {
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
                MeasureUnitService.findByMeasureUnitId(measureUnitId, idToken).then(res => {
                    const fields = ['measureUnitName'];
                    let measureUnit = null;
                    fields.forEach(field => {
                        measureUnit = {...measureUnit, [field]: res[field]}
                    });
                    setFormData(measureUnit)
                    
                })
            })
        }
    }, [currentUser, measureUnitId, isAddMode]);

    return(
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                {isAddMode ? "Add measure unit" : "Edit measure unit"}
            </Header>
            <Form size='large' onSubmit={onSubmit}>
                <Segment stacked>
                    <Form.Input 
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='Name'
                        name='measureUnitName'
                        onChange={onChange}
                        value={formData.measureUnitName}
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

export {MeasureUnitAddEditForm};