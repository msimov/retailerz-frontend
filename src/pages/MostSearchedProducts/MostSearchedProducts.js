import { Menu } from "semantic-ui-react";
import { MostSearchedProductsList } from "../../components/MostSearchedProduct";
import { ListLayout } from "../../layouts";

const MostSearchedProducts = () => {
  return (
    <ListLayout
      menu={
        <Menu>
          <Menu.Item header>Most Searched Products</Menu.Item>
        </Menu>
      }
      list={<MostSearchedProductsList />}
    />
  );
};

export default MostSearchedProducts;
