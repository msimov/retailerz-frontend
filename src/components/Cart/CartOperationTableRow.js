import { Button, Menu, Table } from "semantic-ui-react";
import { ErrorMessage } from "../Error";

const CartOperationTableRow = ({
  cartOperation,
  removeFromCart,
  isDeleting,
  error,
}) => {
  return (
    <Table.Row>
      <Table.Cell>{cartOperation.productName}</Table.Cell>
      <Table.Cell>{cartOperation.storeName}</Table.Cell>
      <Table.Cell>
        {cartOperation.operationCount} {cartOperation.measureUnitName}
      </Table.Cell>
      <Table.Cell>
        {cartOperation.operationCount * cartOperation.productRetailPrice} USD
      </Table.Cell>
      <Table.Cell>
        <Menu className="ui bottom attached" widths="1">
          {error ? (
            <Menu.Item>
              <ErrorMessage message={error} />
            </Menu.Item>
          ) : (
            <Menu.Item
              as={Button}
              onClick={() => removeFromCart(cartOperation.operationId)}
              disabled={isDeleting}
            >
              Remove
            </Menu.Item>
          )}
        </Menu>
      </Table.Cell>
    </Table.Row>
  );
};

export default CartOperationTableRow;
