import React from "react";
import { Grid } from "semantic-ui-react";
import DefaultLayout from "./DefaultLayout";

const CenteredLayout = ({ children }) => {
  return (
    <DefaultLayout>
      <Grid textAlign="center" verticalAlign="middle">
        {children}
      </Grid>
    </DefaultLayout>
  );
};

export default CenteredLayout;
