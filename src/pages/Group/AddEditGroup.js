import React from "react";
import { AddEditGroupForm } from "../../components/Group";
import { CenteredLayout } from "../../layouts";

const AddEditGroup = ({ match }) => {
  return (
    <CenteredLayout>
      <AddEditGroupForm groupId={match.params.groupId} />
    </CenteredLayout>
  );
};

export default AddEditGroup;
