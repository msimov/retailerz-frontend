import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { InventoryTable } from "../../components/Inventory";
import { ListLayout } from "../../layouts";

const Inventory = () => {
  return (
    <ListLayout
      menu={
        <Menu>
          <Menu.Item header>Inventory</Menu.Item>
          <Menu.Item as={Link} to={`/operations/add`}>
            Manage Inventory
          </Menu.Item>
        </Menu>
      }
      list={<InventoryTable />}
    />
  );
};

export default Inventory;
