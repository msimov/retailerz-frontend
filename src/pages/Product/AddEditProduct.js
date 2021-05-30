import React from "react";
import { AddEditProductForm } from "../../components/Product";
import { CenteredLayout } from "../../layouts";

const AddEditProduct = ({ match }) => {
  return (
    <CenteredLayout>
      <AddEditProductForm productId={match.params.productId} />
    </CenteredLayout>
  );
};

export default AddEditProduct;
