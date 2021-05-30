import { Menu } from "semantic-ui-react";
import { RecommendedProductsList } from "../../components/RecommendedProduct";
import { ListLayout } from "../../layouts";

const RecommendedProducts = () => {
  return (
    <ListLayout
      menu={
        <Menu>
          <Menu.Item header>Recommended Products</Menu.Item>
        </Menu>
      }
      list={<RecommendedProductsList />}
    />
  );
};

export default RecommendedProducts;
