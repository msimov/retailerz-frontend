import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import MeasureUnitService from '../services/measureUnit.service';
import { FirebaseContext } from "../context/firebase.context";
import { Button, Card, Container, Grid, Menu } from 'semantic-ui-react';

const MeasureUnitsList = () => {
    const firebase = useContext(FirebaseContext);
    
    const [measureUnits, setMeasureUnits] = useState(null);
    const currentUser = firebase.getCurrentUser();

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            MeasureUnitService.getAllByUserId(currentUser.uid, idToken).then(res => {
                setMeasureUnits(res);
            })
        })
    }, [currentUser]);

    const deleteMeasureUnit = (measureUnitId) => {
        setMeasureUnits(measureUnits.map(measureUnit => {
            if(measureUnit.measureUnitId === measureUnitId) {
                measureUnit.isDeleting = true;
            }
            return measureUnit;
        }));
        currentUser.getIdToken().then(idToken => {
            MeasureUnitService.deleteByMeasureUnitId(measureUnitId, idToken).then(() => {
                setMeasureUnits(measureUnits => measureUnits.filter(measureUnit => measureUnit.measureUnitId !== measureUnitId));
            });
        })
    }

    return(
        <Container>
            <Grid divided="vertically">
                <Grid.Row columns={1}>
                    <Menu>
                        <Menu.Item header>Measure Units</Menu.Item>
                        <Menu.Item 
                            as={Link} 
                            to={`/users/${currentUser.uid}/measure-units/add`}
                        >
                            Add New Measure Unit
                        </Menu.Item>
                    </Menu>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Card.Group centered>
                        {measureUnits && measureUnits.map(measureUnit => (
                            <Card key={measureUnit.measureUnitId}>
                                <Card.Content>
                                    <Card.Header>{measureUnit.measureUnitName}</Card.Header>
                                </Card.Content>
                                <Menu className='ui bottom attached' widths='2'>
                                    <Menu.Item
                                        as={Link}
                                        to={`/users/${currentUser.uid}/measure-units/${measureUnit.measureUnitId}/edit`}
                                    >
                                        Edit
                                    </Menu.Item>
                                    <Menu.Item 
                                        as={Button}
                                        onClick={() => deleteMeasureUnit(measureUnit.measureUnitId)} disabled={measureUnit.isDeleting}
                                    >
                                        Delete
                                    </Menu.Item>
                                </Menu>
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Row>
            </Grid>
        </Container>
    );
}

export {MeasureUnitsList};