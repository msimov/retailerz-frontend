import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatURL } from '../commons/url.common';
import GroupService from '../services/group.service';
import { FirebaseContext } from "../context/firebase.context";

const GroupsList = ({match}) => {
    const firebase = useContext(FirebaseContext);
    const url = formatURL(match.url);
    
    const {userId} = match.params;
    const [groups, setGroups] = useState(null);
    const currentUser = firebase.getCurrentUser();

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            GroupService.getAllByUserId(userId, idToken).then(res => {
                setGroups(res);
            })
        })
    }, [currentUser, userId]);

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
        <div>
            <h1>Groups</h1>
            <Link to={`${url}/add`}>Add Groups</Link>
          
            {groups && groups.map(group =>
                <div key={group.groupId}>
                    {group.groupName}
                    <Link to={`${url}/${group.groupId}/edit`}>Edit</Link>
                    <button onClick={() => deleteGroup(group.groupId)} disabled={group.isDeleting}>Delete</button>
                </div>
            )}
            {!groups &&
                <div>Loading...</div>
            }
            {groups && !groups.length &&
                <div>No Groups To Display</div>
            }

        </div>
    );
}

export {GroupsList};