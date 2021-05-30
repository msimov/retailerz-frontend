import { Table } from "semantic-ui-react";

const InventoryProductTableRow = ({ inventoryProduct }) => {
  return (
    <Table.Row>
      <Table.Cell>{inventoryProduct.productName}</Table.Cell>
      <Table.Cell>{inventoryProduct.storeName}</Table.Cell>
      <Table.Cell>{inventoryProduct.productCount}</Table.Cell>
    </Table.Row>
  );
};

export default InventoryProductTableRow;
