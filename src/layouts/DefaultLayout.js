import { Container } from "semantic-ui-react";
import { Navbar } from "../components/Navbar";

const DefaultLayout = ({ children }) => {
  return (
    <Container fluid>
      <Navbar />
      {children}
    </Container>
  );
};

export default DefaultLayout;
