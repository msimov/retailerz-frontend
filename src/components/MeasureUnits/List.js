import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatURL } from '../../commons/url.common';
import MeasureUnitService from '../../services/measure-unit.service';
import { FirebaseContext } from '../Firebase';

const List = ({match}) => {
    const firebase = useContext(FirebaseContext);
    const url = formatURL(match.url);
    
    const {userId} = match.params;
    const [measureUnits, setMeasureUnits] = useState(null);
    const currentUser = firebase.getCurrentUser();

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            MeasureUnitService.getAll(userId, idToken).then(res => {
                setMeasureUnits(res);
            })
        })
    }, [currentUser, userId]);

    const deleteMeasureUnit = (measureUnitId) => {
        setMeasureUnits(measureUnits.map(measureUnit => {
            if(measureUnit.id === measureUnitId) {
                measureUnit.isDeleting = true;
            }
            return measureUnit;
        }));
        currentUser.getIdToken().then(idToken => {
            MeasureUnitService.deleteById(userId, measureUnitId, idToken).then(() => {
                setMeasureUnits(measureUnits => measureUnits.filter(measureUnit => measureUnit.id !== measureUnitId));
            });
        })
    }

    return(
        <div>
            <h1>Measure Units</h1>
            <Link to={`${url}/add`}>Add Measure Unit</Link>
          
            {measureUnits && measureUnits.map(measureUnit =>
                <div key={measureUnit.id}>
                    {measureUnit.unit}
                    <Link to={`${url}/${measureUnit.id}/edit`}>Edit</Link>
                    <button onClick={() => deleteMeasureUnit(measureUnit.id)} disabled={measureUnit.isDeleting}>Delete</button>
                </div>
            )}
            {!measureUnits &&
                <div>Loading...</div>
            }
            {measureUnits && !measureUnits.length &&
                <div>No Measure Units To Display</div>
            }

        </div>
    );
}

export {List};