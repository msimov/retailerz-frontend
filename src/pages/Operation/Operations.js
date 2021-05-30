import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { OperationsTable } from "../../components/Operation";
import { ListLayout } from "../../layouts";

const Operations = () => {
  return (
    <ListLayout
      menu={
        <Menu>
          <Menu.Item header>Operations</Menu.Item>
          <Menu.Item as={Link} to={`/operations/add`}>
            Add New Operation
          </Menu.Item>
        </Menu>
      }
      list={<OperationsTable />}
    />
  );
};

export default Operations;
