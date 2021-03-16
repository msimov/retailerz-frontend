import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import GroupService from '../services/group.service';
import { FirebaseContext } from "../context/firebase.context";
import { Button, Card, Container, Grid, Menu } from 'semantic-ui-react';

const GroupsList = () => {
    const firebase = useContext(FirebaseContext);
    const [groups, setGroups] = useState(null);
    const currentUser = firebase.getCurrentUser();

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            GroupService.getAllByUserId(currentUser.uid, idToken).then(res => {
                setGroups(res);
            })
        })
    }, [currentUser]);

    const deleteGroup = (groupId) => {
        setGroups(groups.map(group => {
            if(group.groupId === groupId) {
                group.isDeleting = true;
            }
            return group;
        }));
        currentUser.getIdToken().then(idToken => {
            GroupService.deleteByGroupId(groupId, idToken).then(() => {
                setGroups(groups => groups.filter(group => group.groupId !== groupId));
            });
        })
    }

    return(
        <Container>
            <Grid divided="vertically">
                <Grid.Row columns={1}>
                    <Menu>
                        <Menu.Item header>Groups</Menu.Item>
                        <Menu.Item
                            as={Link} 
                            to={`/groups/add`}
                        >
                            Add New Group
                        </Menu.Item>
                    </Menu>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Card.Group centered>
                        {groups && groups.map(group => (
                            <Card key={group.groupId}>
                                <Card.Content>
                                    <Card.Header>{group.groupName}</Card.Header>
                                </Card.Content>
                                <Menu className='ui bottom attached' widths='2'>
                                    <Menu.Item
                                        as={Link}
                                        to={`/groups/${group.groupId}/edit`}
                                    >
                                        Edit
                                    </Menu.Item>
                                    <Menu.Item 
                                        as={Button}
                                        onClick={() => deleteGroup(group.groupId)} disabled={group.isDeleting}
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

export {GroupsList};