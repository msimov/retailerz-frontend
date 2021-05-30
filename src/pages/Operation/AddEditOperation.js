import React from "react";
import { AddEditOperationForm } from "../../components/Operation";
import { CenteredLayout } from "../../layouts";

const AddEditOperation = ({ match }) => {
  return (
    <CenteredLayout>
      <AddEditOperationForm operationId={match.params.operationId} />
    </CenteredLayout>
  );
};

export default AddEditOperation;
