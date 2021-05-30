import React from "react";
import { AddStoreProductForm } from "../../components/StoreProduct";
import { CenteredLayout } from "../../layouts";

const AddStoreProduct = ({ match }) => {
  return (
    <CenteredLayout>
      <AddStoreProductForm storeId={match.params.storeId} />;
    </CenteredLayout>
  );
};

export default AddStoreProduct;
