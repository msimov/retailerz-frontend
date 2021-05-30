import { AddToCartForm } from "../../components/Cart";
import { CenteredLayout } from "../../layouts";

const AddToCart = ({ match }) => {
  return (
    <CenteredLayout>
      <AddToCartForm productId={match.params.productId} />
    </CenteredLayout>
  );
};

export default AddToCart;
