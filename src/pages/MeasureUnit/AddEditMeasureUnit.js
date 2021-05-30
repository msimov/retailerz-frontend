import React from "react";
import { AddEditMeasureUnitForm } from "../../components/MeasureUnit";
import { CenteredLayout } from "../../layouts";

const AddEditMeasureUnit = ({ match }) => {
  return (
    <CenteredLayout>
      <AddEditMeasureUnitForm measureUnitId={match.params.measureUnitId} />
    </CenteredLayout>
  );
};

export default AddEditMeasureUnit;
