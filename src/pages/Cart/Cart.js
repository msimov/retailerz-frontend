import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { CartTable } from "../../components/Cart";
import { ListLayout } from "../../layouts";

const Cart = () => {
  return (
    <ListLayout
      menu={
        <Menu>
          <Menu.Item header>My Cart</Menu.Item>
          <Menu.Item as={Link} to={`/fastest-route`}>
            Generate Fastest Route
          </Menu.Item>
        </Menu>
      }
      list={<CartTable />}
    />
  );
};

export default Cart;
