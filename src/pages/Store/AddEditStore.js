import React from "react";
import { AddEditStoreForm } from "../../components/Store";
import { CenteredLayout } from "../../layouts";

const AddEditStore = ({ match }) => {
  return (
    <CenteredLayout>
      <AddEditStoreForm storeId={match.params.storeId} />
    </CenteredLayout>
  );
};

export default AddEditStore;
