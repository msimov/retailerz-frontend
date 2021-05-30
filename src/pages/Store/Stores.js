import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { StoresList } from "../../components/Store";
import { ListLayout } from "../../layouts";

const Stores = () => {
  return (
    <ListLayout
      menu={
        <Menu>
          <Menu.Item header>Stores</Menu.Item>
          <Menu.Item as={Link} to={`/stores/add`}>
            Add New Store
          </Menu.Item>
        </Menu>
      }
      list={<StoresList />}
    />
  );
};

export default Stores;
