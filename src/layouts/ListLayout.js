import { Container, Grid } from "semantic-ui-react";
import { DefaultLayout } from ".";

const ListLayout = ({ menu, list }) => {
  return (
    <DefaultLayout>
      <Container>
        <Grid divided="vertically">
          <Grid.Row columns={1}>{menu}</Grid.Row>
          <Grid.Row columns={1}>{list}</Grid.Row>
        </Grid>
      </Container>
    </DefaultLayout>
  );
};

export default ListLayout;
