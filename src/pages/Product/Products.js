import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { ProductsList } from "../../components/Product";
import { ListLayout } from "../../layouts";

const Products = () => {
  return (
    <ListLayout
      menu={
        <Menu>
          <Menu.Item header>Products</Menu.Item>
          <Menu.Item as={Link} to={`/products/add`}>
            Add New Product
          </Menu.Item>
        </Menu>
      }
      list={<ProductsList />}
    />
  );
};

export default Products;
