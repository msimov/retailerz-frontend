import React, { useState, useEffect, useContext } from "react";
import { Card } from "semantic-ui-react";
import { AuthUserContext } from "../../context";
import { MeasureUnitService } from "../../services";
import { ErrorMessage } from "../Error";
import MeasureUnitCard from "./MeasureUnitCard";

const MeasureUnitsList = () => {
  const { authUser } = useContext(AuthUserContext);
  const [measureUnits, setMeasureUnits] = useState(null);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    MeasureUnitService.getAllByUserId(authUser.uid, authUser.token)
      .then((res) => {
        setMeasureUnits(res);
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });
  }, [authUser]);

  const deleteMeasureUnit = (measureUnitId) => {
    setIsDeleting(true);
    MeasureUnitService.deleteByMeasureUnitId(measureUnitId, authUser.token)
      .then(() => {
        setIsDeleting(false);
        setMeasureUnits((measureUnits) =>
          measureUnits.filter(
            (measureUnit) => measureUnit.measureUnitId !== measureUnitId
          )
        );
      })
      .catch((err) => {
        setIsDeleting(false);
        if (typeof err.data === "string") {
          setDeleteError(err.data);
        } else {
          setDeleteError(err.data.message);
        }
      });
  };

  return error ? (
    <ErrorMessage message={error} />
  ) : (
    <Card.Group centered>
      {measureUnits &&
        measureUnits.map((measureUnit, index) => (
          <MeasureUnitCard
            key={index}
            measureUnit={measureUnit}
            deleteMeasureUnit={deleteMeasureUnit}
            error={deleteError}
            isDeleting={isDeleting}
          />
        ))}
    </Card.Group>
  );
};

export default MeasureUnitsList;
